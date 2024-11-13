import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";

export default function EditStaff() {
  const logindata = useSelector((state) => state.userInfo.value);
  const staffData = useSelector((state) => state.staffInfo.value);
  console.log(logindata.token);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const nameBox = useRef();
  const emailBox = useRef();
  const phoneBox = useRef();
  const desBox = useRef();
  const salBox = useRef();

  const staffSave = async (event) => {
    event.preventDefault();
    var ob = {
      name: nameBox.current.value,
      email: emailBox.current.value,
      phone: phoneBox.current.value,
      designation: desBox.current.value,
      salary: salBox.current.value,
    };
    try {
      setLoading(true);
      const URL = urls.UPDATE_STAFF + "/" + staffData.staff_id;
      const response = await Apiservice.PutApiCall(URL, ob, logindata.token);
      console.log(response);
      if (response.data.status) {
        setMsg(response.data.msg);
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
                  <small>Update Staff</small>
                </div>
                <form role="form" onSubmit={staffSave}>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Name"
                        defaultValue={staffData.name}
                        ref={nameBox}
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
                        placeholder="Designation"
                        ref={desBox}
                        defaultValue={staffData.designation}
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
                        placeholder="Salary"
                        defaultValue={staffData.salary}
                        ref={salBox}
                        type="number"
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
                        placeholder="Email"
                        defaultValue={staffData.email}
                        ref={emailBox}
                        type="email"
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
                        placeholder="Phone"
                        defaultValue={staffData.phone}
                        ref={phoneBox}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary my-4">
                      {loading ? "updating..." : "Update"}
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
