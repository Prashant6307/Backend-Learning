import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        addBlog: (state, action) => action.payload
    }
})

export const { addBlog } = blogSlice.actions

export default blogSlice.reducer