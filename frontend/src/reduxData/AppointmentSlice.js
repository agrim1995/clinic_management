import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "Appointment",
    initialState: {
        value: undefined
    },
    reducers: {
        AppointmentUpdateReducer: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { AppointmentUpdateReducer } = Slice.actions
export default Slice.reducer