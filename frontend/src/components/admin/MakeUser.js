import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Apiservice, {urls} from '../../ApiService/Apiservice';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function MakeUser() {
  const [list, setList] = useState([])
console.log(list)
  const logindata = useSelector(state => state.userInfo.value);
  const roleData = useSelector(state => state.roleInfo.value);//imp
console.log("roleData",roleData)
  const navigate = useNavigate();
  const location = useLocation();
  const staff = location.state?.staff || {};

const [loading, setLoading] = useState(false) //for loading

  const [newUser, setNewUser] = useState({
    staff_id: staff.staff_id || '',
    name: staff.name || '',
    phone: staff.phone || '',
    // phone:"123568752",
    email: staff.email || '',
    // email:"pys@getDefaultNormalizer.com",
    password: '',
    gender: staff.gender || '' ,
    clinic_id:logindata.clinic_id,
    role_id:null,
    assign_by:logindata.uid,
    COMMENT:null,


  });



  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value ,[e.target.role_name]: e.target.value  });
   
  };
 

 // Fetch role list from API
//   const roleList = async () => {
//     try {
//         const response = await Apiservice.GetApiCallWithToken(urls.Roll_List, logindata.token)
//         console.log(response)
//         if (response?.status) {
//             setList(response?.data?.data?.rolelist)
//         }

//     } catch (error) {
//         console.error(error);

//     }
// }

// useEffect(() => {
//   roleList()
// }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // const apiUrl = 'http://tutorials.codebetter.in:7092/api/user/save'; // Directly using the complete URL
    const apiUrl = urls.User_Save; 

    // Log the URL and the payload for debugging purposes
    console.log('API URL:', apiUrl);
    console.log('Payload:', newUser);

    try {
      setLoading(true)
      const response = await Apiservice.PostApiCallWithToken(apiUrl ,newUser , logindata.token)
      
      console.log(response)

    
      if (response.status === 200) {
        if (response.data.status === false) {
          setErrorMessage(response.data.msg);
          setSuccessMessage(response.data.msg);

        } else {
          setSuccessMessage(response.data.msg);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in handleFormSubmit:', error);
    }
  };

  


  return (
    <div className="container mt-5">
      <h3>Create New User</h3>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={newUser.name} onChange={handleFormChange} required />
        </div>

{/* <div className="form-group">
          <label>Assign By</label>
          <input type="text" name="gender" className="form-control" value={newUser.assign_by} onChange={handleFormChange} required />
        </div> */}

        <div className="form-group">
        <label>Role List</label>
      {/* <select class="form-control" onChange={handleFormChange}> 
        {list?.map((o) =>{return   <option value={o.role_id} >{o.role_name}</option>
          })}
      </select> */}

<select
  className="form-control"
  name="role_id" // Add a name attribute to identify this input field
  value={newUser.role_id} // Bind the selected value to state
  onChange={handleFormChange} // Handle onChange event
>
  {roleData?.map((o) => (
    <option key={o.role_id} value={o.role_id}>
      {o.role_name}
    </option>
  ))}
</select>      </div>
     
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={newUser.password} onChange={handleFormChange} required />
        </div>
        
        <button type="submit" className="btn btn-primary">{loading ? "Saving...": "save"}</button>
      </form>
    </div>
  );

}
