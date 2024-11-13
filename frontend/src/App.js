import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddStaff from "./components/admin/AddStaff";
import StaffList from "./components/admin/StaffList";
import EditStaff from "./components/admin/EditStaff";
import AddDoctor from "./components/admin/AddDoctor";
import DoctorList from "./components/admin/DoctorList";
import MakeUser from "./components/admin/MakeUser";
import AddPatient from "./components/Reception/AddPatient";
import Users from "./components/admin/UserList";
import ViewAppointment from "./components/Reception/ViewAppointment";
import ClinicDetails from "./components/admin/ClinicDetails";
import AddPrescription from "./components/Reception/AddPrescription";
import SearchAppointment from "./components/Reception/SearchAppointment";
import ViewPatient from "./components/Reception/ViewPatient";
import UpdateAppointment from "./components/Reception/UpdateAppointment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin */}
        <Route path="/admin" element={<Home />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="addStaff" element={<AddStaff />}></Route>
          <Route path="staffList" element={<StaffList />}></Route>
          <Route path="editStaff" element={<EditStaff />}></Route>
          <Route path="addDoctor" element={<AddDoctor />}></Route>
          <Route path="doctorlist" element={<DoctorList />}></Route>
          <Route path="/admin/makeUser" element={<MakeUser />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="viewAppointment" element={<ViewAppointment />}></Route>
          <Route path="ClinicDetail" element={<ClinicDetails />}></Route>
        </Route>

        {/* reception */}
        <Route path="/reception" element={<Home />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="addPatient" element={<AddPatient />}></Route>
          <Route path="viewAppointment" element={<ViewAppointment />}></Route>
          <Route path="UpdateAppointment" element={<UpdateAppointment/>}></Route>
         <Route path="viewpatient" element={<ViewPatient/>}></Route>
          <Route path="searchAppointment" element={<SearchAppointment />}></Route>
          <Route path="AddPrescription" element={<AddPrescription />}></Route>
        </Route>

        {/* nurse */}
        <Route path="/nurse" element={<Home />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="addPatient" element={<AddPatient />}></Route>
        </Route>

        {/* accountant */}
        <Route path="/accountant" element={<Home />}>
          <Route index element={<Dashboard />}></Route>
        </Route>

        {/* doctor */}
        <Route path="/doctor" element={<Home />}>
          <Route index element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
