const express = require("express")
const userAuth = require("../middlewares/auth")
const NotesModel = require("../models/notes")


const notesRouter = express.Router()

// save the note
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

// get all notes
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

// update title and description
notesRouter.patch("/notes/:id", userAuth, async (req, res) => {
    try {
        const { title, description } = req.body
        const notes = await NotesModel.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id
        },
            {
                title,
                description,
            },
            {
                new: true
            })

        if (!notes) {
            throw new Error("Note not found")
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

// update note status
notesRouter.patch("/notes/status/:id", userAuth, async (req, res) => {
    try {
        const { status } = req.body;

        const note = await NotesModel.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            {
                status
            },
            {
                new: true
            }
        );

        if (!note) {
            throw new Error("Note not found");
        }

        res.status(200).json({
            message: "Note status updated successfully",
            data: note
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// delete a note
notesRouter.delete("/notes/:id", userAuth, async (req, res) => {
    try {
        const notes = await NotesModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })

        if (!notes) {
            throw new Error("Note not found")
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



module.exports = notesRouter