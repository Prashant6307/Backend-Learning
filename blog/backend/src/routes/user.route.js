const express = require('express');
const userRouter = express.Router()
const {userAuth} = require("../middleware/auth");
const BlogModel = require('../models/blog');
const UserModel = require('../models/user');

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

userRouter.patch("/profile/edit", userAuth, async(req, res)=>{
    try {
        const { firstName, profileBio, photoUrl} = req.body

        const user = await UserModel.findById(req.user._id)

        if(!user){
            throw new Error ("User not found")
        }

        user.firstName = firstName || user.firstName
        user.profileBio = profileBio || user.profileBio
        user.photoUrl = photoUrl || user.photoUrl

        await user.save()

        res.status(200).json({
            message: "Profile edited successfully",
            data: user
        })
    } catch (err) {
        res.status(400).json({
            message: "Error: " + err.message
        })
    }
})

module.exports = userRouter