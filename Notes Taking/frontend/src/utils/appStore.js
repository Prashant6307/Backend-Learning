import {configureStore} from "@reduxjs/toolkit"
import allUserNotesReducer from "./allNotesSlice"

const appStore = configureStore({ 
    reducer:{
        allUserNotes: allUserNotesReducer
    }
})

export default appStore