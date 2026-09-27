import {configureStore} from "@reduxjs/toolkit"
import searchReducer from "./searchSlice"
import blogReducer from "./blogSlice"
import useReducer from "./userSlice"

const appStore = configureStore({
    reducer:{
        search: searchReducer,
        blogs: blogReducer,
        user: useReducer
    }
})

export default appStore