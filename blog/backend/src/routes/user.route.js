const express = require('express');
const userRouter = express.Router()
const {userAuth} = require("../middleware/auth")

userRouter.get("/profile", userAuth, async(req, res)=>{

    try{
        res.status(200).json({
            data: req.user
        })

    }catch(err){

        res.status(400).json({
            message: err.message
        })

    }

})

module.exports = userRouter