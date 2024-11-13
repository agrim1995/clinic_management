import { useDispatch, useSelector } from "react-redux";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StaffUpdateReducer } from "../../reduxData/StaffSlice";

export default function StaffList() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredList, setFilteredList] = useState([]); // State for filtered list
  const [ActiveStatatue, setActiveStatatue] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("list", list);
  const staff = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(
        urls.STAFFLIST,
        logindata.token
      );
      console.log("API Response:", response);
      if (response.status) {
        setList(response.data);
        setFilteredList(response.data); // Initialize filtered list
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    staff();
  }, []);

  // search staff

  useEffect(() => {
    handleSearch(); // Update filtered list whenever search term changes
  }, [searchTerm]);

  const handleSearch = () => {
    const filtered =
      list.data?.filter(
        (staff) =>
          staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    setFilteredList({ data: filtered });
  };

  // search staff

  const deleteStaff = async (id) => {
    const confrm = window.confirm("Are You Sure You Want to delete this staff");
    if (confrm) {
      try {
        const URL = urls.DELETE_STAFF + "/" + id;

        const response = await Apiservice.DelApiCall(URL, logindata.token);
        console.log(response);
        await staff();
      } catch (error) {
        console.error(error);
      }
    } else {
    }
  };

  const upd = (ob) => {
    dispatch(StaffUpdateReducer(ob));
    navigate("/admin/editStaff");
  };

  const makeUser = (staff) => {
    navigate("/admin/makeUser", { state: { staff } });
  };

  // const unblockUser = (staff) =>{

  // };

  // const blockUser = (staff) =>{

  // };

  const blockUser = async (id) => {
    const confrm = window.confirm("Are You Sure You Want to block this user?");
    if (confrm) {
      try {
        const URL = urls.Block_User + "/" + id;
        console.log("this is block url", URL);
        console.log("token", logindata.token);

        const toke = logindata.token;

        // console.log("==================1" ,asb);
        const response = await Apiservice.PutApiCall(URL, {}, logindata.token);
        console.log("====================2", response);
        console.log(response);
        if (response.status) {
          staff();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const unblockUser = async (id) => {
    const confrm = window.confirm(
      "Are You Sure You Want to unblock this user?"
    );
    if (confrm) {
      try {
        const URL = urls.Unblock_User + "/" + id;
        console.log("this is url", URL);
        const response = await Apiservice.PutApiCall(URL, {}, logindata.token);
        if (response.status) {
          staff();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div class="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header border-0">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Staff List</h3>
                  </div>
                  <div className="col text-right">
                    <a href="#!" className="btn btn-sm btn-primary">
                      See all
                    </a>
                  </div>
                </div>
              </div>

              {/* Search Input and Button */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2 w-75 d-inline m-3"
                  placeholder="Search by Name, Email, or Designation"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button className="btn btn-primary " onClick={handleSearch}>
                  Search
                </button> */}
              </div>
              <div className="table-responsive">
                <div>
                  <table className="table align-items-center">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" class="sort">
                          Sr.no
                        </th>
                        <th scope="col" class="sort">
                          Name
                        </th>
                        <th scope="col" class="sort">
                          Gender
                        </th>
                        <th scope="col" class="sort">
                          Designation
                        </th>
                        <th scope="col" class="sort">
                          Salary
                        </th>

                        <th scope="col" class="sort">
                          Contact
                        </th>
                        <th scope="col" class="sort">
                          Email
                        </th>
                        <th scope="col" class="sort">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {filteredList.data?.length > 0 ? (
                        filteredList.data.map((o, index) => (
                          <tr key={o.staff_id}>
                            <td>{index + 1}</td>
                            <td>{o.name}</td>
                            <td>{o.gender}</td>
                            <td>{o.designation}</td>
                            <td>{o.salary}</td>
                            <td>{o.phone}</td>
                            <td>{o.email}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteStaff(o.staff_id)}
                              >
                                Delete
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() => upd(o)}
                              >
                                Edit
                              </button>
                              &nbsp;
                              {o.user_id == null ? (
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => makeUser(o)}
                                >
                                  Make User
                                </button>
                              ) : o.user.active_status === true ? (
                                <button
                                  className="btn btn-sm btn-info"
                                  onClick={() => unblockUser(o.user_id)}
                                >
                                  Unblock
                                </button>
                              ) : (
                                <button
                                  className="btn btn-sm btn-warning"
                                  onClick={() => blockUser(o.user_id)}
                                >
                                  Block
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8">No staff found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
