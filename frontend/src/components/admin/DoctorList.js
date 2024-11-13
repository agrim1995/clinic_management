import { useDispatch, useSelector } from "react-redux";
import Apiservice, { urls } from "../../ApiService/Apiservice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StaffUpdateReducer } from "../../reduxData/StaffSlice";

export default function StaffList() {
  const logindata = useSelector((state) => state.userInfo.value);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("list", list);
  const staff = async () => {
    try {
      const response = await Apiservice.GetApiCallWithToken(
        urls.DOCTORLIST,
        logindata.token
      );
      console.log(response);
      if (response.status) {
        setList(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    staff();
  }, []);

  const deleteStaff = async (id) => {
    const confrm = window.confirm("Are You Sure You Want to delete this staff");
    if (confrm) {
      try {
        const URL = urls.DELETE_STAFF + "/" + id;

        const response = await Apiservice.DelApiCall(URL, logindata.token);
        console.log(response);
        await staff();
      } catch (error) {}
    } else {
    }
  };

  const upd = (ob) => {
    dispatch(StaffUpdateReducer(ob));
    navigate("/admin/editStaff");
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header border-0">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="mb-0">Page visits</h3>
                </div>
                <div className="col text-right">
                  <a href="#!" className="btn btn-sm btn-primary">
                    See all
                  </a>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Salary</th>

                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list?.data?.map((o, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{o.specialty}</td>
                        <td>{o.address}</td>
                        <td>{o.experience}</td>
                        <td>{o.available_days}</td>
                        <td>{o.email}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteStaff(o.staff_id)}
                          >
                            Delete
                          </button>{" "}
                          &nbsp;
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => upd(o)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
