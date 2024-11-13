import React, { useState, useRef } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AddPrescriptionPage() {
  const logindata = useSelector((state) => state.userInfo.value);
  const location = useLocation();
  const { appointment } = location.state || {}; // Retrieve the appointment data

  // State variables
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // useRef hooks for form fields
  const symptomsBox = useRef();
  const observationBox = useRef();
  const diseasesBox = useRef();
  const adviceBox = useRef();
  const nextVisitDateBox = useRef();

  const AddPresc = async (event) => {
    event.preventDefault();

    // Construct the request object using values from refs
    const prescriptionData = {
      symptoms: symptomsBox.current.value || appointment.symptoms || "",
      observation: observationBox.current.value || "",
      diseases: diseasesBox.current.value || "",
      next_visit_date: nextVisitDateBox.current.value || "",
      advice: adviceBox.current.value || "",
      doctor_id: appointment.doctor_id || "", // Use doctor_id from logged-in user
      visit_id: appointment.visit_id || "", // Use visit_id from appointment
    };
    console.log("Appointment data:", appointment);

    try {
      setLoading(true); // Start loading indicator

      // Make API call to save the prescription
      const response = await Apiservice.PostApiCallWithToken(
        urls.Add_Prescription,
        prescriptionData,
        logindata.token
      );

      console.log("API Response:", response);

      // Handle API response
      if (response.data.status) {
        setMsg(response.data.msg || "Prescription saved successfully");
      } else {
        setMsg(response.data.msg || "Failed to save prescription");
      }
    } catch (error) {
      console.log("Catch block reached");
      console.error("Error:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Other error:", error.message);
      }
      setMsg("An error occurred while saving the prescription.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="container mt-5">
      <h4>
        Add Prescription for {appointment?.patient?.name || "Patient Name"}
      </h4>
      {msg && <div className="alert alert-danger">{msg}</div>}

      <form onSubmit={AddPresc}>
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">
            Symptoms
          </label>
          <input
            type="text"
            className="form-control"
            id="symptoms"
            ref={symptomsBox}
            defaultValue={appointment?.symptoms || ""}
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
            ref={observationBox}
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
            ref={diseasesBox}
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
            ref={nextVisitDateBox}
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
            ref={adviceBox}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
