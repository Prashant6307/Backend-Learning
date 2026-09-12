
const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
},
    {
        timestamps: true
    })

const NotesModel = mongoose.model("Notes", notesSchema)

module.exports = NotesModel