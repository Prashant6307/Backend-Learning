const express = require('express')
const CommentModel = require("../models/comment")
const { userAuth } = require('../middleware/auth')
const { findById, findByIdAndDelete, findByIdAndUpdate } = require('../models/user')
const { deleteModel } = require('mongoose')

const commentRouter = express.Router()

// get all comments
commentRouter.get("/comments/:id", async (req, res) => {
    try {
        const blogId = req.params.id
        const allComments = await CommentModel.find({ blogId }).populate("author", "firstName photoUrl")

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
        const { text, blogId, } = req.body

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

// delete a comment
commentRouter.delete("/comment/:id", userAuth, async (req, res) => {
    try {
        const commentId = req.params.id
        const comment = await CommentModel.findById(commentId)

        if (!comment) {
            throw new Error("Comment not found")
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            throw new Error("You can not delete this comment");

        }

        await CommentModel.findByIdAndDelete(commentId)

        res.status(201).json({
            message: "Comment deleted"
        })
    } catch (err) {
        res.status(400).json({
            message: "Error: " + err.message
        })
    }
})

// edit the comment
commentRouter.patch("/comment/:id", userAuth, async (req, res) => {
    try {
        const commentId = req.params.id

        const { text } = req.body

        const editComment = await CommentModel.findById(commentId)

        if (!editComment) {
            throw new Error("Comment not found")
        }

        if (editComment.author.toString() !== req.user._id.toString()) {
            throw new Error("Cannot Edit this comment")
        }

        if (!text.trim()) {
            throw new Error("Comment cannot be empty")
        }

        editComment.text = text.trim()

        await editComment.save()

        res.status(200).json({
            message: "Comment edited",
            data: editComment
        })
    } catch (err) {
        res.status(400).json({
            message: "Cannot Edit this comment Error: " + err.message
        })
    }
})

module.exports = commentRouter