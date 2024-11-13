import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";

export default function AddStaff() {
    const logindata = useSelector(state => state.userInfo.value)
    console.log(logindata.token)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const nameBox = useRef()
    const [gender, setGender] = useState("")
    const emailBox = useRef()
    const phoneBox = useRef()
    const desBox = useRef()
    const salBox = useRef()

    const staffSave = async (event) => {
        event.preventDefault()
        var ob = {
            name: nameBox.current.value,
            gender:gender,
            email: emailBox.current.value,
            phone: phoneBox.current.value,
            designation: desBox.current.value,
            salary: salBox.current.value
        }
        try {
            setLoading(true)
            const response = await Apiservice.PostApiCallWithToken(urls.ADDSTAFF, ob, logindata.token)
            console.log(response)
            if (response.data.status) {
                setMsg(response.data.msg)
            } else {
                setMsg(response.data.msg)
            }
        } catch (error) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return <>

<div className="container-fluid mt--6">
        <div className="row">
          <div className="offset-xl-2 col-xl-8 ">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-7">
                    <h3 className="mb-0">Add Staff</h3>
                  </div>

                </div>
              </div>
              <div className="card-body">
                <form onSubmit={staffSave}>
                  <h6 className="heading-small text-muted mb-4">Employee information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-username">Employee Name</label>
                          <input type="text" id="input-username" className="form-control"  ref={nameBox}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-email">Email address</label>
                          <input type="email" id="input-email" className="form-control" ref={emailBox}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-first-name">Phone Nu.</label>
                          <input type="text" id="input-first-name" className="form-control" ref={phoneBox} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-last-name">Designation</label>
                          <input type="text" id="input-last-name" className="form-control" ref={desBox} />
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
                          <label className="form-control-label" htmlFor="input-last-name">Salary</label>
                          <input type="text" id="input-last-name" className="form-control" ref={salBox} />
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
}