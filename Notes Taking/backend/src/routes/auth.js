const express = require('express');
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const validator = require("validator");
const { userAuth } = require("../middlewares/auth")

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignupData(req)
        const { firstName, emailId, password } = req.body

        const passwordHash = await bcrypt.hash(password, 10)

        const userData = new UserModel({
            firstName,
            emailId,
            password: passwordHash
        })

        const savedUser = await userData.save()

        const token = await savedUser.getJWT()

        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: true, })
        res.status(201).json({
            message: "User data saved successfully",
            data: {
                _id: savedUser._id,
                firstName: savedUser.firstName,
                emailId: savedUser.emailId
            }
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body

        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid credentials")
        }

        const user = await UserModel.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await user.validatePassword(password)

        if (!isPasswordValid) {
            throw new Error("Invalid Credentials")
        }

        const token = await user.getJWT()

        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: true, })
        res.status(201).json({
            message: "Login successful",
            data: {
                _id: user._id,
                firstName: user.firstName,
                emailId: user.emailId
            }
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }


})

authRouter.post("/logout", (req, res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })
    res.send("Logout successful")
})

module.exports = authRouter