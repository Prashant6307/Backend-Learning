import {configureStore} from "@reduxjs/toolkit"
import allUserNotesReducer from "./allNotesSlice"
import searchReducer from "./searchSlice"

const appStore = configureStore({ 
    reducer:{
        allUserNotes: allUserNotesReducer,
        search: searchReducer
    }
})

export default appStore