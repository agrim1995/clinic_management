import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import StaffUpdateReducer from "./StaffSlice";
import  RoleReducer  from "./RoleSlice";
import AppointmentUpdate  from "./AppointmentSlice";
const Store = configureStore({
    reducer: {
        userInfo: userReducer,
        staffInfo: StaffUpdateReducer,
        roleInfo: RoleReducer,
        appointData:AppointmentUpdate
    }
})

export default Store