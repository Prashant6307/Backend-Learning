import {configureStore} from "@reduxjs/toolkit"
import searchReducer from "./searchSlice"
import blogReducer from "./blogSlice"

const appStore = configureStore({
    reducer:{
        search: searchReducer,
        blogs: blogReducer
    }
})

export default appStore