import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Apiservice, { urls } from "../../ApiService/Apiservice";

export default function UpdateAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate() 
  const logindata = useSelector((state) => state.userInfo.value);

  // Ensure that AppointmentData exists, or default to an empty object.
  const AppointmentData = useSelector((state) => state.appointData.value) || {};
  
  console.log(logindata.token);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const Appointment_dBox = useRef();
  const StatusBox = useRef();
  const SymptomsBox = useRef();
  const AllergyBox = useRef();
  
  const AppointSave = async (event) => {
    event.preventDefault();

    var ob = {
      Appointment_d: Appointment_dBox.current.value,
      Status: StatusBox.current.value,
      Symptoms: SymptomsBox.current.value,
      Allergy: AllergyBox.current.value,
      patient_id: AppointmentData.patient_id, 
      doctor_id: AppointmentData.doctor_id,   
    
    };
    try {
      setLoading(true);
      const URL = urls.Update_Appointment + "/" + AppointmentData.visit_id;
      const response = await Apiservice.PutApiCall(URL, ob, logindata.token);

      console.log(response);
      if (response.data.status) {
        setMsg(response.data.msg);

        // After successful update, navigate back to the appointment list and trigger a refresh
        //navigate("/Reception/ViewAppointment", { state: { refresh: true },replace: true });


      } else {
        setMsg(response.data.msg);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card bg-secondary border-0 mb-0">
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Update Patient</small>
                </div>
                <form role="form" onSubmit={AppointSave}>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Appointment Date & Time"
                        defaultValue={AppointmentData.Appointment_d || ""} // Use a default empty string if undefined
                        ref={Appointment_dBox}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Appointment Status"
                        ref={StatusBox}
                        defaultValue={AppointmentData.Status || ""} // Default to an empty string
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Symptoms"
                        defaultValue={AppointmentData.Symptoms || ""} // Default value handling
                        ref={SymptomsBox}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-lock-circle-open"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Allergy"
                        defaultValue={AppointmentData.Allergy || ""} // Handle default email
                        ref={AllergyBox}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary my-4">
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                  <h3>{msg}</h3>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
