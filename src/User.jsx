import React, { useState } from "react";
import "./users.scss";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {useLocation} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteSingleUser, updateStar } from "./redux/slices/userSlice";
import { Rating } from "react-simple-star-rating";
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let x = location.state?.data;
  let y = 0;


  const selector = useSelector((state) => state.user.data);
  const [isDeleteModelOpen,setIsDeleteModelOpen] =useState(false);
  const [activeUserModel,setActiveUserModel] =useState(0);
  const [input,setInput] = useState("");

  const filteredData = selector.filter(item => {
    return (
      item.fullname.toLowerCase().includes(input.toLowerCase()) 
    );
  });

 const toaster=()=>{
     toast("User Added Sucessfully!");
 }
 const handleRating = (rate) => {
  console.log(rate);
}
  return (
    <>
        <div style={{display:"none"}}>
        {
            // x  ? (()=>{toast("User Added Sucessfully!"); x=null;console.log(x)})() : null
        }
        
        </div>
    <ToastContainer />
      <div className="user">
        <div className="user-box">
          <div className="search">
            <input type="text" onChange={(e)=>{setInput(e.target.value)}} placeholder="Search Here"/>
          </div>
          <div className="search-btn">
            <Link to={"/form"} className="btn btn-dark">
              Add User
            </Link>
          </div>
        </div>
        <hr />
        <div className="user-table">
          <div className="table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Username</th>
                  <th>Birth Date</th>
                  <th>Profile</th>
                  <th>Active</th>
                  <th>Ratings </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((i, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{i.fullname}</td>
                      <td>{i.email}</td>
                      <td>{i.phone}</td>
                      <td>{i.username}</td>
                      <td>{i.bdate}</td>
                      <td>{i.address}</td>
                      <td>{i.active ? "YES" : "NO"}</td>
                      <td><Rating iconsCount={3} fillColor={"#000"} initialValue={i.rating} allowHover={false} onClick={(rate)=>{
                        if(rate == 1.6666666666666667) rate =1
                        if(rate == 3.3333333333333335) rate =2
                        if(rate == 5) rate = 3
                        const id  = i.id;
                        dispatch(updateStar({rate,id}))                     
                      }}
                      allowFraction={false}
                      // disableFillHover
                      
                      />
                    </td>
                      <td>
                        <button className="btn btn-success" onClick={() => {
                            navigate("/form",{state:{id:i.id}})
                        }}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                            setActiveUserModel(i.id)
                            setIsDeleteModelOpen(true)}}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
           
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        isDeleteModelOpen &&
      <div className="models">       
            <div className="model-cart">
                <div>
                    <h1>Do you want to delete ?  </h1>
                </div>
                <div className="model-btns mt-5">
                    <button className="btn btn-success px-4" onClick={() => {
                        dispatch(deleteSingleUser(activeUserModel))
                        setIsDeleteModelOpen(false)
                      }}>Yes</button>
                    <button className="btn btn-danger px-4" onClick={() => {setIsDeleteModelOpen(false)}}>No</button>
                </div>
            </div>
      </div>    
      }
    </>
  );
};

export default User;
