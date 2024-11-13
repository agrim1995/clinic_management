import axios from "axios";
import ClinicDetails from "../components/admin/ClinicDetails";

class Apiservice {
  PostApiCall(url, data) {
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  PostApiCallWithToken(url, data, token) {
    return axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }

  GetApiCallWithToken(url, token) {
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }

  DelApiCall(url, token) {
    return axios.delete(url, { headers: { Authorization: "Bearer " + token } });
  }

  PutApiCall(url, data, token) {
    return axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }
}

const SERVER = `http://tutorials.codebetter.in:7092`;

export const urls = {
  LOGIN: `${SERVER}/auth/login`,
  REGISTER: `${SERVER}/auth/clinic/save`,
  ADDSTAFF: `${SERVER}/api/staff/save`,
  STAFFLIST: `${SERVER}/api/staff/list`,
  DELETE_STAFF: `${SERVER}/api/staff/delete`,
  UPDATE_STAFF: `${SERVER}/api/staff/update`,
  ADD_DOCTOR: `${SERVER}/api/doctor/adddoctor`,
  DOCTORLIST: `${SERVER}/api/doctor/list`,
  DELETE_DOCTOR: `${SERVER}/api/doctor/delete`,
  User_Save: `${SERVER}/api/user/save`,
  User_list: `${SERVER}/api/user/list`,
  Roll_List: `${SERVER}/api/master/rolelist`,
  Block_User: `${SERVER}/api/user/block`,
  Unblock_User: `${SERVER}/api/user/unblock`,
  ClinicDetail: `${SERVER}/api/clinic/clinicdetails`,

  // Reception

  Add_Patient: `${SERVER}/api/patient/addpatient`,
  Patient_List: `${SERVER}/api/patient/list`,
  Search_old_patient: `${SERVER}/api/patient/serch`,
  View_Appointment: `${SERVER}/api/appointment/list`,
  Update_Appointment: `${SERVER}/api/appointment/update`,
  Add_Prescription: `${SERVER}/api/prescription/prescriptionadd`,
};

export default new Apiservice();
