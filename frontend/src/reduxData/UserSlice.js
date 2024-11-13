import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
    value: localData || {
        uid: undefined,
        name: undefined,
        email: undefined,
        phone: undefined,
        role: undefined,
        token: undefined,
        islogin: false
    }
}
const Slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userReducer: (state, action) => {
            state.value = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        }
    }
})

export const { userReducer } = Slice.actions
export default Slice.reducer