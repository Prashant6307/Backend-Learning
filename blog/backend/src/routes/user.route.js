const express = require('express');
const userRouter = express.Router()
const {userAuth} = require("../middleware/auth");
const BlogModel = require('../models/blog');

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

userRouter.get("/profile/blogs", userAuth, async(req, res)=>{

    try{

        const blogs = await BlogModel.find({author: req.user._id}).populate("author", "firstName photoUrl")

        if(!blogs){
            throw new Error ("Can not fetch profile")
        }
        
        res.status(200).json({
            data: blogs
        })

    }catch(err){

        res.status(400).json({
            message: err.message
        })

    }

})

module.exports = userRouter