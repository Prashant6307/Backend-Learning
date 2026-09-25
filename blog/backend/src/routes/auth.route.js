const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require("../models/user")
const jwt = require("jsonwebtoken")
const { validateSignupData } = require('../utils/validation')
const validator = require('validator');

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {

    try {
        const { firstName, emailId, password } = req.body

        if (!firstName || !emailId || !password) {
            throw new Error("All fields are required")
        }

        validateSignupData(req)

        const passwordHash = await bcrypt.hash(password, 10)

        const userData = new UserModel({
            firstName, emailId, password: passwordHash
        })

        const savedUser = await userData.save()

        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)

        res.cookie("token", token, { expiresIn: "7d", httpOnly: true })

        res.status(201).json({
            message: "Signup successful",
            data: {
                _id: savedUser._id,
                firstName: savedUser.firstName,
                emailId: savedUser.emailId
            }
        })
    } catch (err) {
        console.log(err.message)
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
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error("Invalid credentials")
        }

        res.status(200).json({
            message: "Login Successful",
            data: {
                _id: user._id,
                firstName: user.firstName,
                emailId: user.emailId
            }
        })
    } catch (err) {
        console.log(err.message)

        res.status(400).json({
            message: err.message
        })

    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expiresIn: new Date(Date.now())
    })
    res.send("Logout successful")
})

module.exports = authRouter