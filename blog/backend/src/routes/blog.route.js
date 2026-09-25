const express = require('express')
const BlogModel = require("../models/blog")
const { userAuth } = require("../middleware/auth")

const blogRouter = express.Router()

// create blog
blogRouter.post("/blog", userAuth, async (req, res) => {
    try {
        const { title, content, category } = req.body

        const blog = new BlogModel({
            title,
            content,
            category,
            author: req.user._id
        })

        const savedBlog = await blog.save()

        res.status(201).json({
            message: "Blog created successfully",
            data: savedBlog
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// get all blogs
blogRouter.get("/blogs", async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate("author", "firstName emailId photoUrl")

        res.status(200).json({
            data: blogs
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// search blog
blogRouter.get("/blog/:id", async (req, res) => {

    try {
        const id = req.params.id
        const blog = await BlogModel.findById(id)

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        res.status(200).json({
            data: blog
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update blog
blogRouter.patch("/blog/:id", userAuth, async (req, res) => {
    try {
        const id = req.params.id

        const { title, content, category } = req.body

        const blog = await BlogModel.findById(id)

        if (!blog) {
            return res.status(400).json({
                message: "Blog not found"
            })
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                message: "You can not edit this blog"
            })
        }

        blog.title = title || blog.title,
            blog.content = content || blog.content,
            blog.category = category || blog.category

        const updatedBlog = await blog.save()

        res.status(200).json({
            message: "Blog updated successfully",
            data: updatedBlog
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// delete blog
blogRouter.delete("/blog/:id", userAuth, async (req, res)=>{

    try {
        const id = req.params.id

        const blog = await BlogModel.findById(id)

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }


        // check if logged in user owns the blog
        if (blog.author.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "You cannot delete this blog"
            })

        }

        await BlogModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "Blog deleted successfully"
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = blogRouter