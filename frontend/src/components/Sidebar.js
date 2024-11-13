import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userReducer } from "../reduxData/UserSlice";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const logindata = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(
      userReducer({
        uid: undefined,
        name: undefined,
        email: undefined,
        phone: undefined,
        role: undefined,
        token: undefined,
        islogin: false,
      })
    );
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="btn btn-primary d-lg-none"
        onClick={toggleSidebar}
        style={{ position: "absolute", top: "16px", left: "55%", zIndex: 1000 }}
      >
        <i className="fas fa-search"></i>
      </button>
      <nav
        className={`sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white ${
          isSidebarOpen ? "open" : ""
        }`}
        id="sidenav-main"
      >
        <div className="scrollbar-inner">
          <div className="sidenav-header  align-items-center">
            <Link className="navbar-brand" to="javascript:void(0)">
              <img
                src="assets/img/brand/blue.png"
                className="navbar-brand-img"
                alt="..."
              />
            </Link>
          </div>
          <div className="navbar-inner">
            <div
              className="collapse navbar-collapse"
              id="sidenav-collapse-main"
            >
              <ul className="navbar-nav">
                {logindata.islogin ? (
                  <>
                    {logindata.role == "admin" ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link active" to="/admin">
                            <i className="ni ni-tv-2 text-primary"></i>
                            <span className="nav-link-text">Dashboard</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/admin/addStaff">
                            <i className="ni ni-single-02 text-orange"></i>
                            <span className="nav-link-text">Add Staff</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/admin/staffList">
                            <i className="ni ni-folder-17 text-orange"></i>
                            <span className="nav-link-text">
                              {" "}
                              Staff Details
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/admin/addDoctor">
                            <i className="ni ni-briefcase-24 text-orange"></i>
                            <span className="nav-link-text">Add Doctor</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="viewAppointment">
                            <i className="ni ni-calendar-grid-58 text-primary"></i>
                            <span className="nav-link-text">Appointments</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="ClinicDetail">
                            <i className="ni ni-building text-yellow"></i>
                            <span className="nav-link-text">
                              Clinic Details
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/admin/users">
                            <i className="ni ni-bullet-list-67 text-default"></i>
                            <span className="nav-link-text">Users</span>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/" onClick={logout}>
                            <i className="ni ni-user-run text-red"></i>
                            <span className="nav-link-text">Logout</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}

                    {logindata.role == "reception" ? (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="addPatient">
                            <i className="ni ni-bullet-list-67 text-default"></i>
                            <span className="nav-link-text">
                              Add New Appointment
                            </span>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="viewAppointment">
                            <i className="ni ni-bullet-list-67 text-default"></i>
                            <span className="nav-link-text">
                              View Appointments
                            </span>
                          </Link>
                        </li>


                        <li className="nav-item">
                          <Link className="nav-link" to="viewPatient">
                            <i className="ni ni-bullet-list-67 text-default"></i>
                            <span className="nav-link-text">
                              View Patients
                            </span>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="searchAppointment">
                            <i className="ni ni-bullet-list-67 text-default"></i>
                            <span className="nav-link-text">
                              Add Prescription
                            </span>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/" onClick={logout}>
                            <i className="ni ni-user-run text-red"></i>
                            <span className="nav-link-text">Logout</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}

                    {logindata.role == "doctor" ? <> </> : <></>}
                  </>
                ) : (
                  <></>
                )}
              </ul>

              <hr className="my-3" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
