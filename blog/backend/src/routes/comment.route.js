const express = require('express')
const CommentModel = require("../models/comment")
const { userAuth } = require('../middleware/auth')

const commentRouter = express.Router()

// get all comments
commentRouter.get("/comments/:id", async (req, res) => {
    try {
        const blogId = req.params.id
        const allComments = await CommentModel.find({blogId}).populate("author", "firstName photoUrl")

        res.status(201).json({
            message: "Comments fetched successfully",
            data: allComments
        })
    } catch (err) {
        
        res.status(400).json({
            message: "Can not fetch comments " + err.message
        })
    }
})

// post comment
commentRouter.post("/comment", userAuth, async (req, res) => {
    try {
        const { text, blogId,  } = req.body

        if (!text || !blogId) {
            throw new Error("Text and blogId are required")
        }

        const comment = new CommentModel({
            text,
            blogId,
            author: req.user._id
        })

        const savedComment = await comment.save()

        res.status(201).json({
            message: "Comment posted",
            data: savedComment
        })
    } catch (err) {
        res.status(400).json({
            message: "Error: " + err.message
        })
    }
})

module.exports = commentRouter