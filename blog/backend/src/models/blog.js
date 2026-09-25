const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: String,
        default: "General"
    },
    likes: {
        type: Number,
    },
}, { timestamps: true })

const BlogModel = new mongoose.model("Blog", blogSchema)

module.exports = BlogModel