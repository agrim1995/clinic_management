import React, { useEffect, useState } from "react";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Users() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [users, setUsers] = useState([]);  
  const [errorMessage, setErrorMessage] = useState(''); 
  const location = useLocation();
  const refresh = location.state?.refresh || false;  

  const fetchUsers = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(urls.User_list, logindata.token);
      if (response.status === 200) {
        setUsers(response.data.data);  
      } else {
        throw new Error('Failed to fetch users');  
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch users'); 
      setUsers([]);  
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [logindata.token, refresh]);  

  // Function to delete a staff member
  const deleteStaff = async (id) => {
    const confrm = window.confirm("Are you sure you want to delete this staff?");
    if (confrm) {
      try {
        const URL = `${urls.DELETE_STAFF}/${id}`;  
        const response = await Apiservice.DelApiCall(URL, logindata.token);
        if (response.status === 200) {
          fetchUsers(); 
        } else {
          throw new Error('Failed to delete staff');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to delete staff');  
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3>Users List</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}  {/* Display error message */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Degree</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.user_id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.degree}</td>
                  <td>{user.active_status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteStaff(user.user_id)}  
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
