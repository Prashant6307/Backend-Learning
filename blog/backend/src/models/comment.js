const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    replies:{
        type: [

        ]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
}, { timestamps: true })

const CommentModel = new mongoose.model("Comment", commentSchema)

module.exports = CommentModel