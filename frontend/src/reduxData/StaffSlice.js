import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "staff",
    initialState: {
        value: undefined
    },
    reducers: {
        StaffUpdateReducer: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { StaffUpdateReducer } = Slice.actions
export default Slice.reducer