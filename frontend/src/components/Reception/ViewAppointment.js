import React, {   useEffect, useState } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppointmentUpdateReducer } from "../../reduxData/AppointmentSlice";

export default function ViewAppointment() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const refresh = location.state?.refresh || false;

  const viewAppointment = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(
        urls.View_Appointment,
        logindata.token
      );

      if (response.status === 200) {
        const appointmentList = response.data.data.apointlist;
        setAppointments(appointmentList);
        setFilteredAppointments(appointmentList); // Initialize with full list
        console.log("appointment lsit",appointmentList)

      } else {
        throw new Error("Failed to view appointments");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch appointments");
      setAppointments([]);
      setFilteredAppointments([]);
    }
  };

  useEffect(() => {
    if (logindata.token && (refresh || appointments.length === 0)) {
      viewAppointment();
    }
  }, [logindata.token, refresh]); // Ensure 'refresh' is included in the dependency array
  
  

  // const deleteAppointment = async (id) => {
  //   const confrm = window.confirm("Are You Sure You Want to delete this staff");
  //   if (confrm) {
  //     try {
  //       const URL = urls.DELETE_STAFF + "/" + id;

  //       const response = await Apiservice.DelApiCall(URL, logindata.token);
  //       console.log(response);
  //       await staff();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //   }
  // };

  const upd = (ob) => {
    dispatch(AppointmentUpdateReducer(ob));
    navigate("/Reception/UpdateAppointment");
  };



  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (appointment) =>
          appointment.patient?.name.toLowerCase().includes(query) ||
          appointment.patient?.email.toLowerCase().includes(query) ||
          appointment.patient?.phone.toLowerCase().includes(query)
      );
      setFilteredAppointments(filtered);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Appointment List</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {/* <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by patient name, email, or phone"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div> */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr. No</th>
              {/* <th>Name</th> */}
              <th>Appointment Date & Time</th>
              <th>Appointment Status</th>
              <th>Symptoms</th>
              <th>Allergy</th>
              {/* <th>Doctor's Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Patient Blood Group</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredAppointments) &&
            filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment.visit_id}>
                  <td>{index + 1}</td>
                  {/* <td>{appointment.patient?.name || ""}</td> */}
                  <td>{appointment.appointment_date_time || ""}</td>
                  <td>{appointment.appointment_status || ""}</td>
                  <td>{appointment.symptoms || ""}</td>
                  <td>{appointment.allergy || ""}</td>
                  {/* <td>{appointment.doctor?.user?.name || ""}</td>
                  <td>{appointment.patient?.email || ""}</td>
                  <td>{appointment.patient?.phone || ""}</td>
                  <td>{appointment.patient?.gender || ""}</td>
                  <td>{appointment.patient?.blood_group || ""}</td> */}
                  <td>
                    <button className="btn btn-sm btn-primary "  onClick={() => upd(appointment)}>Update</button>
                    {/* <button className="btn btn-sm btn-danger"  onClick={() => deleteAppointment(appointment.visit_id)}>Delete</button> */}

                   
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
