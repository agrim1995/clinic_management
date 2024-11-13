import React, { useState, useEffect } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";

export default function SearchAndPrescription() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    symptoms: "",
    observation: "",
    diseases: "",
    next_visit_date: "",
    advice: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const logindata = useSelector((state) => state.userInfo.value);

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

  const handlePrescription = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      symptoms: appointment.symptoms || "",
      observation: "",
      diseases: "",
      next_visit_date: "",
      advice: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Apiservice.PostApiCallWithToken(
        urls.Add_Prescription,
        {
          ...formData,
          doctor_id: logindata.uid,
          visit_id: selectedAppointment.visit_id,
        },
        logindata.token
      );

      if (response.status === 200) {
        alert("Prescription added successfully");
        setSelectedAppointment(null);
        setFormData({
          symptoms: "",
          observation: "",
          diseases: "",
          next_visit_date: "",
          advice: "",
        });
      } else {
        throw new Error("Failed to add prescription");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add prescription");
    }
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
                      onClick={() => handlePrescription(appointment)}
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

      {selectedAppointment && (
        <div className="mt-5">
          <h4>Add Prescription for {selectedAppointment.patient?.name}</h4>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="symptoms" className="form-label">
                Symptoms
              </label>
              <input
                type="text"
                className="form-control"
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="observation" className="form-label">
                Observation
              </label>
              <input
                type="text"
                className="form-control"
                id="observation"
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="diseases" className="form-label">
                Diseases
              </label>
              <input
                type="text"
                className="form-control"
                id="diseases"
                name="diseases"
                value={formData.diseases}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="next_visit_date" className="form-label">
                Next Visit Date
              </label>
              <input
                type="date"
                className="form-control"
                id="next_visit_date"
                name="next_visit_date"
                value={formData.next_visit_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="advice" className="form-label">
                Advice
              </label>
              <input
                type="text"
                className="form-control"
                id="advice"
                name="advice"
                value={formData.advice}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Prescription
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setSelectedAppointment(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
