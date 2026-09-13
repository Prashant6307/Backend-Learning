import { createSlice } from "@reduxjs/toolkit";

const allNotesSlice = createSlice({
    name: "allUserNotes",
    initialState: [],
    reducers: {
        addNotes: (state, action) => action.payload,
        removeNote: (state, action) => {
            return state.filter(note => note._id !== action.payload);
        },
        updateNoteStatus: (state, action) => {
            const note = state.find(
                note => note._id === action.payload.id
            );

            if (note) {
                note.status = action.payload.status;
            }
        },
        updateNote: (state, action) => {
            const note = state.find(
                note => note._id === action.payload.id
            );

            if (note) {
                note.title = action.payload.title;
                note.description = action.payload.description;
            }
        }
    }
})

export const { addNotes, removeNote, updateNoteStatus, updateNote } = allNotesSlice.actions

export default allNotesSlice.reducer