const express = require("express")
const userAuth = require("../middlewares/auth")
const NotesModel = require("../models/notes")


const notesRouter = express.Router()

notesRouter.post("/notes", userAuth, async (req, res) => {

    try {
        const { title, description } = req.body

        const note = new NotesModel({
            title,
            description,
            userId: req.user._id
        })

        const savedNote = await note.save()

        res.status(201).json({
            message: "Note saved  successfully",
            data: savedNote
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

notesRouter.get("/notes", userAuth, async (req, res) => {
    try {
        const notes = await NotesModel.find({
            userId: req.user._id
        })
        res.status(200).json({
            message: "Notes fetched successfully",
            data: notes
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

notesRouter.patch("/notes/:id", userAuth, async (req, res) => {
    try {
        const notes = await NotesModel.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id
        },
            {
                title,
                description
            },
            {
                new: true
            })

        if(!notes){
            throw new Error ("Note not found")
        }

        res.status(200).json({
            message: "Note updated successfully",
            data: notes
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

notesRouter.delete("/notes/:id", userAuth, async (req, res) => {
    try {
        const notes = await NotesModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })

        if(!notes){
            throw new Error ("Note not found")
        }

        res.status(200).json({
            message: "Note deleted successfully",
            data: notes
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

notesRouter.patch("/notes/:id", userAuth, async (req, res) => {
    try {
        const notes = await NotesModel.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id
        },
            {
                title,
                description
            },
            {
                new: true
            })

        res.status(200).json({
            message: "Note fetched successfully",
            data: notes
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = notesRouter