const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }
}, { timestamps: true })

const CommentModel = new mongoose.model("Comment", commentSchema)

module.exports = CommentModel