import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        addSearch: (state, action) => action.payload,

        removeSearch: () => ""
    }
})

export const { addSearch, removeSearch } = searchSlice.actions

export default searchSlice.reducer