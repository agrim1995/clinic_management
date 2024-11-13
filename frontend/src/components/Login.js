import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Apiservice, { urls } from "../ApiService/Apiservice";
import { useDispatch } from "react-redux";
import UserSlice, { userReducer } from "../reduxData/UserSlice";

export default function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const emailbox = useRef()
    const passbox = useRef()

    const login = async (event) => {
        event.preventDefault()
        var ob = {
            email: emailbox.current.value,
            password: passbox.current.value
        }
        console.log(ob)
        try {
            setLoading(true)
            const response = await Apiservice.PostApiCall(urls.LOGIN, ob)
            console.log(response.data.data)

            if (response.status) {

                if (response.data.data.user.user_roles[0].rolename.role_name == "admin") {
                    const d = dispatch(userReducer({
                        uid: response.data.data.user.user_id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        role: "admin",
                        token: response.data.data.token,
                        islogin: true,
                        clinic_id:response?.data?.data?.user?.clinicdata[0]?.clinic_id

                    }))
                    console.log("dispatch data", d)

                    navigate('/admin')

                }else{
                    
                if (response.data.data.user.user_roles[0].rolename.role_name == "nurse") {
                    const d = dispatch(userReducer({
                        uid: response.data.data.user.user_id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        role: "nurse",
                        token: response.data.data.token,
                        islogin: true,
                        clinic_id:response?.data?.data?.user?.clinicdata[0]?.clinic_id

                    }))
                    console.log("dispatch data", d)

                    navigate('/nurse')

                }
                }
                
                if (response.data.data.user.user_roles[0].rolename.role_name == "doctor") {
                    const d = dispatch(userReducer({
                        uid: response.data.data.user.user_id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        role: "doctor",
                        token: response.data.data.token,
                        islogin: true,
                        clinic_id:response?.data?.data?.user?.clinicdata[0]?.clinic_id

                    }))
                    console.log("dispatch data", d)

                    navigate('/doctor')

                }else{
                    
                if (response.data.data.user.user_roles[0].rolename.role_name == "accountant") {
                    const d = dispatch(userReducer({
                        uid: response.data.data.user.user_id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        role: "accountant",
                        token: response.data.data.token,
                        islogin: true,
                        clinic_id:response?.data?.data?.user?.clinicdata[0]?.clinic_id

                    }))
                    console.log("dispatch data", d)

                    navigate('/accountant')

                }
                else{
                     if (response.data.data.user.user_roles[0].rolename.role_name == "reception") {
                    const d = dispatch(userReducer({
                        uid: response.data.data.user.user_id,
                        name: response.data.data.user.name,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        role: "reception",
                        token: response.data.data.token,
                        islogin: true,
                        clinic_id:response?.data?.data?.user?.clinicdata[0]?.clinic_id

                    }))
                    console.log("dispatch data", d)

                    navigate('/reception')

                }
                }
            }

            } 

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    return <>
        <nav id="navbar-main" className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="dashboard.html">
                    <img src="../assets/img/brand/logo.jpg" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
                    <div className="navbar-collapse-header">
                        <div className="row">
                            <div className="col-6 collapse-brand">
                                <Link to="dashboard.html">
                                    <img src="../assets/img/brand/blue.png" />
                                </Link>
                            </div>
                            <div className="col-6 collapse-close">
                                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="dashboard.html" className="nav-link">
                                <span className="nav-link-inner--text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <span className="nav-link-inner--text">Login</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                <span className="nav-link-inner--text">Register</span>
                            </Link>
                        </li>
                    </ul>
                    <hr className="d-lg-none" />
                    <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                        <li className="nav-item">
                            <Link className="nav-link nav-link-icon" to="https://www.facebook.com/creativetim" target="_blank" data-toggle="tooltip" data-original-title="Like us on Facebook">
                                <i className="fab fa-facebook-square"></i>
                                <span className="nav-link-inner--text d-lg-none">Facebook</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-link-icon" to="https://www.instagram.com/creativetimofficial" target="_blank" data-toggle="tooltip" data-original-title="Follow us on Instagram">
                                <i className="fab fa-instagram"></i>
                                <span className="nav-link-inner--text d-lg-none">Instagram</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-link-icon" to="https://twitter.com/creativetim" target="_blank" data-toggle="tooltip" data-original-title="Follow us on Twitter">
                                <i className="fab fa-twitter-square"></i>
                                <span className="nav-link-inner--text d-lg-none">Twitter</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-link-icon" to="https://github.com/creativetimofficial" target="_blank" data-toggle="tooltip" data-original-title="Star us on Github">
                                <i className="fab fa-github"></i>
                                <span className="nav-link-inner--text d-lg-none">Github</span>
                            </Link>
                        </li>
                        <li className="nav-item d-none d-lg-block ml-lg-4">
                            <Link to="https://www.creative-tim.com/product/argon-dashboard-pro?ref=ad_upgrade_pro" target="_blank" className="btn btn-neutral btn-icon">
                                <span className="btn-inner--icon">
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                </span>
                                <span className="nav-link-inner--text">Upgrade to PRO</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="main-content">

            <div className="header  py-7 py-lg-8 pt-lg-9 bg-header">
                <div className="container">
                    <div className="header-body text-center mb-7">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                <h1 className="text-dark">Clini Management!</h1>
                                <p className="text-lead text-dark">welcome to our Clinic Management System</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="separator separator-bottom separator-skew zindex-100">
                    <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div> */}
            </div>
            <div className="container mt--8 pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="card bg-secondary border-0 mb-0">

                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Login Here</small>
                                </div>
                                <form role="form" onSubmit={login}>
                                    <div className="form-group mb-3">
                                        <div className="input-group input-group-merge input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                            </div>
                                            <input className="form-control" placeholder="Email" type="email" ref={emailbox} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group input-group-merge input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                            </div>
                                            <input className="form-control" placeholder="Password" type="password" ref={passbox} />
                                        </div>
                                    </div>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                        <label className="custom-control-label" for=" customCheckLogin">
                                            <span className="text-muted">Remember me</span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary my-4">{loading ? "Sign in..." : "Sign in"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <Link to="#" className="text-light"><small>Forgot password?</small></Link>
                            </div>
                            <div className="col-6 text-right">
                                <Link to="/register" className="text-light"><small>Create new account</small></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}