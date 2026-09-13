import { createSlice } from "@reduxjs/toolkit";

const allNotesSlice = createSlice({
    name: "allUserNotes",
    initialState:[],
    reducers:{
        addNotes: (state, action)=> action.payload
    }
})

export const {addNotes} = allNotesSlice.actions

export default allNotesSlice.reducer