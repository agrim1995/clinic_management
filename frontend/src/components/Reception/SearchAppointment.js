import React, { useState, useEffect } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchAndPrescription() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const logindata = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Apiservice.GetApiCallWithToken(
          urls.View_Appointment,
          logindata.token
        );
        if (response.status === 200) {
          setAppointments(response.data.data.apointlist);
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, [logindata.token]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter((appointment) =>
        appointment.patient?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, appointments]);

  const handleAddPrescription = (appointment) => {
    navigate("/reception/AddPrescription", { state: { appointment } });
  };

  return (
    <div className="container mt-5">
      <h3>Search Patients and Add Prescription</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Appointment Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment.visit_id}>
                  <td>{index + 1}</td>
                  <td>{appointment.patient?.name || ""}</td>
                  <td>{appointment.appointment_date_time || ""}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAddPrescription(appointment)}
                    >
                      Add Prescription
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
