import React, { useEffect, useState } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ViewPatient() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [Patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const refresh = location.state?.refresh || false;

  const ViewPatient = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(
        urls.Patient_List,
        logindata.token
      );

      if (response.status === 200) {
        const PatientList = response.data.data.apointlist;
        setPatients(PatientList);
        setFilteredPatients(PatientList); // Initialize with full list
      } else {
        throw new Error("Failed to view Patients");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch Patients");
      setPatients([]);
      setFilteredPatients([]);
    }
  };

  useEffect(() => {
    ViewPatient();
  }, [logindata.token, refresh]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query ==="") {
      setFilteredPatients(Patients);
    } else {
      const filtered = Patients.filter(
        (Patients) =>
          Patients.patient?.name.toLowerCase().includes(query) ||
          Patients.patient?.email.toLowerCase().includes(query) ||
          Patients.patient?.phone.toLowerCase().includes(query)
      );
      setFilteredPatients(filtered);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Patient List</h3>
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
              <th>Sr.No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Patient Blood Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredPatients) &&
            filteredPatients.length > 0 ? (
              filteredPatients.map((appointment, index) => (
                <tr key={appointment.visit_id}>
                  <td>{index + 1}</td>
                  <td>{appointment.patient?.name || ""}</td>
                  <td>{appointment.patient?.phone || ""}</td>
                  <td>{appointment.patient?.email || ""}</td>
                  <td>{appointment.patient?.age || ""}</td>
                  <td>{appointment.patient?.gender || ""}</td>
                  <td>{appointment.patient?.blood_group || ""}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    {/* Uncomment this if you have a delete function */}
                    {/* <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteAppointment(appointment.patient_id)}
                    >
                      Delete
                    </button> */}
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
