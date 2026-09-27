import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addLoggedInUserInfo: (state, action) => action.payload,
        removeLoggedInUserInfo: () => null

    }
})

export const { addLoggedInUserInfo, removeLoggedInUserInfo } = userSlice.actions

export default userSlice.reducer