import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Apiservice, { urls } from "../../ApiService/Apiservice";

export default function AddPatient() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [msg, setMsg] = useState("");
  const [gender, setGender] = useState("");
  const [blood, setBlood] = useState("");
  const [patientId, setPatientId] = useState(null);
  const PNameBox = useRef();
  const PEmailBox = useRef();
  const PPhoneBox = useRef();
  const PAgeBox = useRef();
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [symptom, setSymptom] = useState("");
  const [allergy, setAllergy] = useState("");

  const patientSave = async (event) => {
    event.preventDefault();
    setMsg("");
    console.log("Patient ID before saving:", patientId);

    let ob = {
      doctor_id: doctorId,
      appointment_date_time: appointmentDateTime,
      appointment_status: appointmentStatus,
      symptoms: symptom,
      allergy: allergy,
    };

    if (!patientId) {
      ob = {
        ...ob,
        name: PNameBox.current.value,
        phone: PPhoneBox.current.value,
        email: PEmailBox.current.value,
        age: PAgeBox.current.value,
        gender: gender,
        blood_group: blood,
      };
    }

    ob.patient_id = patientId;

    console.log("Request Payload:", ob);
    try {
      setLoading(true);
      const response = await Apiservice.PostApiCallWithToken(
        urls.Add_Patient,
        ob,
        logindata.token
      );
      console.log("API Response:", response);

      if (response.data && response.data.status) {
        setMsg(response.data.msg || "Patient data saved successfully.");
      } else {
        setMsg(response.data.msg || "Unknown error occurred.");
      }
    } catch (error) {
      console.error(
        "Error adding patient:",
        error.response ? error.response.data : error.message
      );
      setMsg("Error adding patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Gender State:", gender);
    console.log("Blood State:", blood);
  }, [gender, blood]);

  // Search patient
  const searchPatient = async () => {
    try {
      setLoading(true);
      setMsg(""); // Clear previous messages
      console.log("Searching for patient with term: ", searchTerm);

      if (!searchTerm.trim()) {
        setMsg("Please enter a search term.");
        setLoading(false);
        return;
      }

      let queryParams = [];

      if (isValidEmail(searchTerm)) {
        queryParams.push(`email=${searchTerm}`);
      } else if (isValidPhone(searchTerm)) {
        queryParams.push(`mobile=${searchTerm}`);
      } else if (isValidName(searchTerm)) {
        queryParams.push(`name=${searchTerm}`);
      } else if (isValidPatientId(searchTerm)) {
        queryParams.push(`patient_id=${searchTerm}`);
      } else {
        setMsg(
          "Invalid search term. Please enter a valid email, phone number, name, or patient ID."
        );
        setLoading(false);
        return;
      }

      const url = `${urls.Search_old_patient}?${queryParams.join("&")}`;
      console.log("Search URL:", url);

      const response = await Apiservice.GetApiCallWithToken(
        url,
        logindata.token
      );
      console.log("Search Response: ", response);

      if (response.data.status === "data not found please enter valid input") {
        setMsg(
          "No patient found with the provided details. Please check your input and try again."
        );
        clearFormFields(); // Clear form data
        setPatientId(null); // Reset patient ID
      } else if (response.data.status) {
        console.log("Response Data: ", response.data);
        const patient = response.data.data?.patientdata;
        setPatientData(patient);
        setMsg(response.data.msg);
        console.log("patientData", patientData);

        // Set patient ID if found
        setPatientId(patient?.patient_id || null);

        console.log("Patient Gender:", patient.gender);
        if (patient) {
          PNameBox.current.value = patient.name || "";
          PEmailBox.current.value = patient.email || "";
          PPhoneBox.current.value = patient.phone || "";
          PAgeBox.current.value = patient.age || "";
          setGender(patient.gender || "");
          setBlood(patient.blood_group || "");
        }
      } else {
        setMsg(
          response.data.msg || "An unexpected error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Error searching patient: ", error);
      setMsg("Error searching patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value);
  };

  const isValidName = (value) => {
    const nameRegex =
      /^[A-Za-z]+([-'][A-Za-z]+)*([ ][A-Za-z]+([-'][A-Za-z]+)*)*$/;
    return value.trim().length >= 2 && nameRegex.test(value);
  };

  const isValidPatientId = (value) => {
    return /^[0-9]+$/.test(value.trim()) && value.trim().length > 0;
  };

  const clearFormFields = () => {
    PNameBox.current.value = "";
    PEmailBox.current.value = "";
    PPhoneBox.current.value = "";
    PAgeBox.current.value = "";
    setGender("");
    setBlood("");
    setAppointmentDateTime("");
    setDoctorId("");
    setAppointmentStatus("");
    setSymptom("");
    setAllergy("");
  };

  // Fetch doctor list
  const doctorList = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(
        urls.DOCTORLIST,
        logindata.token
      );
      console.log("Doctor List Response:", response);
      if (response.data.status) {
        setList(response.data.data.doctor); // Adjust data access according to the response structure
        console.log("Doctor List:", response.data.data.doctor);
      } else {
        console.log("Failed to fetch doctor list");
      }
    } catch (error) {
      console.error("Error fetching doctor list:", error);
    }
  };

  useEffect(() => {
    doctorList();
  }, []);
  return (
    <>
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-8 ">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-7">
                    <h3 className="mb-0">Add New Appointment</h3>
                  </div>
                  {/* <div className="col-5 search-container">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Id, Name, Email, Mobile Nu."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary search-button"
                          onClick={searchPatient}
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={patientSave}>
                  {msg && <div className="alert alert-info mt-3">{msg}</div>}
                  <h6 className="heading-small text-muted mb-4">
                    Patient information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Patient Name
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            className="form-control"
                            ref={PNameBox}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="input-email"
                            className="form-control"
                            ref={PEmailBox}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone Nu.
                          </label>
                          <input
                            type="text"
                            id="input-first-name"
                            className="form-control"
                            ref={PPhoneBox}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Age
                          </label>
                          <input
                            type="text"
                            id="input-last-name"
                            className="form-control"
                            ref={PAgeBox}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <h4 className="mb-0 me-4">Gender: </h4>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline1"
                              name="gender"
                              className="custom-control-input"
                              value="Female"
                              checked={gender === "Female"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline1"
                            >
                              Female
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline2"
                              name="gender"
                              className="custom-control-input"
                              value="male"
                              checked={gender === "male"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline2"
                            >
                              Male
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline3"
                              name="gender"
                              className="custom-control-input"
                              value="Other"
                              checked={gender === "other"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline3"
                            >
                              Other
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect1"
                          >
                            Blood Type
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            value={blood}
                            onChange={(e) => setBlood(e.target.value)}
                          >
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <h6 className="heading-small text-muted mb-4">
                      Appointment information
                    </h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            symptom
                          </label>
                          <textarea
                            class="form-control"
                            className="form-control"
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-allergy"
                          >
                            Allergy
                          </label>
                          <textarea
                            class="form-control"
                            className="form-control"
                            value={allergy}
                            onChange={(e) => setAllergy(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect1"
                          >
                            Appointment Status
                          </label>
                          <select
                            className="form-control"
                            id="input-appointment-status"
                            value={appointmentStatus}
                            onChange={(e) =>
                              setAppointmentStatus(e.target.value)
                            }
                          >
                            <option value="">Select Appointment Status</option>
                            <option value="Pending Confirmation">
                              Pending Confirmation{" "}
                            </option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Treated">Treated</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="doctorSelect"
                          >
                            Doctor's Name
                          </label>
                          <select
                            className="form-control"
                            id="doctorSelect"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                          >
                            <option value="">Select Doctor</option>
                            {list.map((doctor) => {
                              return (
                                <option value={doctor.doctor_id}>
                                  {doctor.user.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-allergy"
                          >
                            Appointment Date And Time
                          </label>
                          <input
                            type="datetime-local"
                            class="form-control"
                            aria-label="With textarea"
                            className="form-control"
                            value={appointmentDateTime}
                            onChange={(e) =>
                              setAppointmentDateTime(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Appointment"}
                      </button>
                    </div>
                  </div>
                </form>
                {/* {msg && <div className="alert alert-info mt-3">{msg}</div>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
