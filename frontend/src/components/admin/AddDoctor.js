import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice, { urls} from "../../ApiService/Apiservice";

import { useSelector } from 'react-redux';

export default function AddDoctor(){
  const logindata = useSelector(state => state.userInfo.value)
  console.log(logindata);
  console.log(logindata.token)
  const[loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const [gender, setGender] = useState("")
  const dNameBox = useRef()
  const dPhoneBox = useRef()
  const dEmailBox = useRef()
  const dPassword = useRef()
  const designationBox = useRef()
  const dsalBox = useRef()
  const dSpecilityBox = useRef()
  const dAddressBox = useRef()
  const dExperienceBox = useRef()
  const dAvailableDay = useRef()
  const dAvailableTime = useRef()

  const doctorSave = async(event) => {
    
    event.preventDefault()
    var ob = {
      name: dNameBox.current.value,
      phone: dPhoneBox.current.value,
      email: dEmailBox.current.value,
      password: dPassword.current.value,
      gender: gender,
      designation:designationBox.current.value,
      salary : dsalBox.current.value,
      specialty: dSpecilityBox.current.value,
            address: dAddressBox.current.value,
            experience: dExperienceBox.current.value,
            available_days: dAvailableDay.current.value,
            available_time: dAvailableTime.current.value
    }
    console.log(ob)
    try {
      setLoading(true);
      const response = await Apiservice.PostApiCallWithToken(urls.ADD_DOCTOR , ob,logindata.token);
      console.log("Response:", response); 
      if(response.data.status) {
        setMsg(response.data.msg)
      } else {
        setMsg(response.data.msg)
      }
    } catch(error){
      console.error("Error adding doctor:", error); // Log any errors that occur during the API call
    setMsg("Error adding doctor. Please try again."); // Provide feedback to the user about the error
} finally {
  setLoading(false);
}

  };
  

  return (
    <>
   <div className="container-fluid mt--6">
        <div className="row">
          <div className="offset-xl-2 col-xl-8 ">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-7">
                    <h3 className="mb-0">Add Doctor</h3>
                  </div>
             
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={doctorSave}>
                  <h6 className="heading-small text-muted mb-4">Doctor information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-username">Doctor Name</label>
                          <input type="text" id="input-username" className="form-control" ref={dNameBox}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-email">Email address</label>
                          <input type="email" id="input-email" className="form-control" ref={dEmailBox}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-first-name">Phone Nu.</label>
                          <input type="text" id="input-first-name" className="form-control" ref={dPhoneBox} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-last-name">Password</label>
                          <input type="password" id="input-last-name" className="form-control" ref={dPassword} />
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
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="custom-control-label" htmlFor="customRadioInline1">Female</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline2"
                            name="gender"
                            className="custom-control-input"
                            value="Male"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="custom-control-label" htmlFor="customRadioInline2">Male</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline3"
                            name="gender"
                            className="custom-control-input"
                            value="Other"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="custom-control-label" htmlFor="customRadioInline3">Other</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-first-name">Designation</label>
                        <input type="text" id="input-first-name" className="form-control" ref={designationBox} />
                      </div>
                    </div>
                  </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-username">Salary</label>
                          <input type="number" id="input-username" className="form-control" ref={dsalBox}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-text">Specility</label>
                          <input type="text" id="input-email" className="form-control" ref={dSpecilityBox}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-username">Address</label>
                          <input type="text" id="input-username" className="form-control" ref={dAddressBox}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-exp">experience</label>
                          <input type="text" id="input-email" className="form-control" ref={dExperienceBox}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-username">Available Day</label>
                          <input type="text" id="input-username" className="form-control" ref={dAvailableDay} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-add">Available Time</label>
                          <input type="text" id="input-email" className="form-control" ref={dAvailableTime}/>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary my-4">
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </form>
                {msg && <div className="alert alert-info mt-3">{msg}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

