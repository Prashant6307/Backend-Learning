const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:  {
        type: String,
    },
    content:  {
        type: String,
    },
    author:  {
        type: String,
    },
    category:  {
        type: String,
    },
    likes:  {
        type: Number,
    },
},{timestamps: true})

const BlogModel = new mongoose.model("Blog", blogSchema)

module.exports = BlogModel