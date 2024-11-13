import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice, { urls } from "../ApiService/Apiservice";

export default function Register() {
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const cnameBox = useRef();
  const caddressBox = useRef();
  const cContactBox = useRef();
  const cemailBox = useRef();
  const uNameBox = useRef();
  const uemailBox = useRef();
  const uContactBox = useRef();
  const uPassBox = useRef();

  const validateForm = () => {
    const newErrors = {};

    // Regular expression for validating text (alphabetic characters and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;

    // Validates 10-digit phone numbers that don't start with 0-6 and don't have repeating digits
    const phoneRegex = /^[7-9]{1}[0-9]{9}$/;
    const repeatingDigitsRegex = /(\d)\1{9}/;

    // Password validation rules
    const passwordRegex = {
      length: /.{8,}/, // At least 8 characters
      uppercase: /[A-Z]/, // At least one uppercase letter
      lowercase: /[a-z]/, // At least one lowercase letter
      number: /\d/, // At least one digit
      specialChar: /[!@#$%^&*(),.?":{}|<>]/, // At least one special character
    };

    if (!cnameBox.current.value)
      newErrors.clinicName = "Clinic Name is required";
    if (!caddressBox.current.value)
      newErrors.clinicAddress = "Clinic Address is required";

    if (!cContactBox.current.value) {
      newErrors.clinicContact = "Clinic Contact is required";
    } else if (!phoneRegex.test(cContactBox.current.value)) {
      newErrors.clinicContact =
        "Clinic Contact must be a valid 10-digit number starting with 7, 8, or 9";
    } else if (repeatingDigitsRegex.test(cContactBox.current.value)) {
      newErrors.clinicContact = "Clinic Contact cannot have repeating digits";
    }

    if (!cemailBox.current.value) {
      newErrors.clinicEmail = "Clinic Email is required";
    } else if (!/\S+@\S+\.\S+/.test(cemailBox.current.value)) {
      newErrors.clinicEmail = "Clinic Email is invalid";
    }

    if (!uNameBox.current.value) {
      newErrors.userName = "Owner's Name is required";
    } else if (!nameRegex.test(uNameBox.current.value)) {
      newErrors.userName = "Owner's Name must contain only letters and spaces";
    }

    if (!uContactBox.current.value) {
      newErrors.userContact = "Contact is required";
    } else if (!phoneRegex.test(uContactBox.current.value)) {
      newErrors.userContact =
        "Contact must be a valid 10-digit number starting with 7, 8, or 9";
    } else if (repeatingDigitsRegex.test(uContactBox.current.value)) {
      newErrors.userContact = "Contact cannot have repeating digits";
    }

    if (!uemailBox.current.value) {
      newErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(uemailBox.current.value)) {
      newErrors.userEmail = "Email is invalid";
    }

    if (!uPassBox.current.value) {
      newErrors.userPassword = "Password is required";
    } else if (!passwordRegex.length.test(uPassBox.current.value)) {
      newErrors.userPassword = "Password must be at least 8 characters long";
    } else if (!passwordRegex.uppercase.test(uPassBox.current.value)) {
      newErrors.userPassword =
        "Password must contain at least one uppercase letter";
    } else if (!passwordRegex.lowercase.test(uPassBox.current.value)) {
      newErrors.userPassword =
        "Password must contain at least one lowercase letter";
    } else if (!passwordRegex.number.test(uPassBox.current.value)) {
      newErrors.userPassword = "Password must contain at least one number";
    } else if (!passwordRegex.specialChar.test(uPassBox.current.value)) {
      newErrors.userPassword =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (event) => {
    event.preventDefault();
    // Clear previous error messages
    setErrors({});

    if (!validateForm()) return;

    const ob = {
      clinic_name: cnameBox.current?.value,
      clinic_phone: cContactBox.current?.value,
      clinic_email: cemailBox.current?.value,
      clinic_address: caddressBox.current?.value,
      name: uNameBox.current?.value,
      phone: uContactBox.current?.value,
      email: uemailBox.current?.value,
      password: uPassBox.current?.value,
      is_doctor: isDoctor,
    };
    console.log(ob);
    try {
      setLoading(true);
      const response = await Apiservice.PostApiCall(urls.REGISTER, ob);
      console.log(response);
      console.log(response.data);

      if (response.data.status) {
        setMsg(response.data.msg);
      } else {
        setMsg(response.data.msg || "Registration Failed.");
      }
    } catch (error) {
      console.error(error);
      setMsg(
        error.response?.data?.msg || "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setIsDoctor(event.target.checked);
  };

  return (
    <>
      <body className="">
        <nav
          id="navbar-main"
          className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light fixed-top"
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="../assets/img/brand/logo.jpg" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-controls="navbar-collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse navbar-custom-collapse collapse"
              id="navbar-collapse"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <span className="nav-link-inner--text">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <span className="nav-link-inner--text">Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <span className="nav-link-inner--text">
                      Register for Clinic
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="main-content">
          <div className="header py-5  pt-lg-9 bg-header overlay">
            <div className="container">
              <div className="header-body ">
                <div className="row ">
                  <div className="col-xl-5 col-lg-6 col-md-8">
                    <div className="page-nav no-margin row">
                      <div className="container">
                        <div className="row">
                          <h2>Create Your Account Here</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container h-100 pt-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div className="card card-registration card-registration-2 cardborder">
                  <div className="card-body p-0">
                    <form role="form" onSubmit={register}>
                      <div className="row g-0">
                        <div className="col-lg-6">
                          <div className="p-5">
                            <h1 className=" mb-5">Clinic Details</h1>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <input
                                  type="text"
                                  id="form3Examplea2"
                                  className="form-control form-control-lg"
                                  ref={cnameBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplea2"
                                >
                                  Clinic Name
                                </label>
                                {errors.clinicName && (
                                  <div className="text-danger">
                                    {errors.clinicName}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                  ref={caddressBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplev4"
                                >
                                  Clinic Address
                                </label>
                                {errors.clinicAddress && (
                                  <div className="text-danger">
                                    {errors.clinicAddress}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="email"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                  ref={cemailBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplev4"
                                >
                                  Clinic Email
                                </label>
                                {errors.clinicEmail && (
                                  <div className="text-danger">
                                    {errors.clinicEmail}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                  ref={cContactBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplev4"
                                >
                                  Clinic Contact
                                </label>
                                {errors.clinicContact && (
                                  <div className="text-danger">
                                    {errors.clinicContact}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 bg-indigo">
                          <div className="p-5">
                            <h1 className=" mb-5">Owner Details</h1>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <input
                                  type="text"
                                  id="form3Examplea2"
                                  className="form-control form-control-lg"
                                  ref={uNameBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplea2"
                                >
                                  Owner's Name
                                </label>
                                {errors.userName && (
                                  <div className="text-danger">
                                    {errors.userName}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="email"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                  ref={uemailBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplev4"
                                >
                                  Email
                                </label>
                                {errors.userEmail && (
                                  <div className="text-danger">
                                    {errors.userEmail}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="password"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                  ref={uPassBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplev4"
                                >
                                  Password
                                </label>
                                {errors.userPassword && (
                                  <div className="text-danger">
                                    {errors.userPassword}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="form3Examplev4"
                                  className="form-control form-control-lg"
                                  ref={uContactBox}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplev4"
                                >
                                  Contact
                                </label>
                                {errors.userContact && (
                                  <div className="text-danger">
                                    {errors.userContact}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="isDoctorCheck"
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="isDoctorCheck"
                              >
                                I am a Doctor
                              </label>
                            </div>

                            <div className="mb-4">
                              <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-block mt-4"
                                disabled={loading}
                              >
                                {loading ? "Registering..." : "Register"}
                              </button>
                              {msg && <h3 className="mt-4">{msg}</h3>}
                            </div>

                            <div>
                              <p>
                                Already have an account?{" "}
                                <Link to="/">Login here</Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
