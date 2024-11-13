import React, { useEffect, useState } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function ClinicDetails() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [clinics, setClinics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const refresh = location.state?.refresh || false;

  const clinicDetails = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(
        urls.ClinicDetail,
        logindata.token
      );

      // Print the entire response
      console.log("Full Response:", response);

      // Print the data section of the response
      console.log("Response Data:", response.data);

      // Print the clinic list specifically
      console.log("Clinic List:", response.data.data.clinicdata);

      if (response.status === 200) {
        setClinics(response.data.data.clinicdata);
      } else {
        throw new Error("Failed to view Clinic Details");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch Clinic Details");
      setClinics([]);
    }
  };

  useEffect(() => {
    clinicDetails();
  }, [logindata.token, refresh]);

  return (
    <div className="container-fluid mt--6">
      {/* <!-- Page content --> */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="container-fluid mt--6">
        <div className="row">
          {Array.isArray(clinics) && clinics.length > 0 ? (
            clinics.map((clinic) => (
              <div
                className=" offset-xl-2 col-xl-8 order-xl-6"
                key={clinic.clinic_id}
              >
                <div className="card card-profile">
                  <img
                    src="../assets/img/theme/bg.jpg"
                    alt="Image placeholder"
                    className="card-img-top"
                  />
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <Link to="#">
                          <img
                            src="../assets/img/theme/doctor.jpg"
                            className="rounded-circle"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    {/* <div className="d-flex justify-content-between">
                      <Link to="#" className="btn btn-sm btn-info mr-4">
                        Connect
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-sm btn-default float-right"
                      >
                        Message
                      </Link>
                    </div> */}
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                            <span className="heading">{clinic.clinic_id}</span>
                            <span className="description">Clinic Id</span>
                          </div>
                          <div>
                            <span className="heading">
                              {clinic.clinic_phone || ""}
                            </span>
                            <span className="description">Contact</span>
                          </div>
                          <div>
                            <span className="heading">
                              {clinic.clinic_address}
                            </span>
                            <span className="description">Address</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h5 className="h3">
                        <div className="mt-4">
                          <span className="welcome-message">
                            Welcome to {clinic.clinic_name} ! We're glad to have
                            you here.
                          </span>
                        </div>
                      </h5>
                      <div className="h3 mt-4">
                        <i className="ni business_briefcase-24 mr-2"></i>
                        {clinic.clinic_name} <span className="">Clinic</span>
                      </div>
                      {/* <div className="h5 mt-4">
                        Contact:
                        <i className="ni business_briefcase-24 mr-2"></i>{" "}
                        {clinic.clinic_phone || ""}
                      </div> */}
                      <div>
                        Email:
                        <i className="ni education_hat mr-2"></i>
                        {clinic.clinic_email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No clinics available</p>
          )}
        </div>
      </div>
    </div>
  );
}
