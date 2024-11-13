import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "role",
    initialState: {
        value: []
    },
    reducers: {
        RoleListReducer: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { RoleListReducer } = Slice.actions
export default Slice.reducer