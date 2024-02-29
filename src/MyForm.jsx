import React, { useState } from 'react'
import "./form.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom"
import { addUsersData, editUsersData } from './redux/slices/userSlice';


const bloodGroups = [
    { type: "A+"},
    { type: "A-"},
    { type: "B+"},
    { type: "B-"},
    { type: "AB+"},
    { type: "AB-"},
    { type: "O+"},
    { type: "O-"}
  ];

  const validateSchema = Yup.object({
    fullname: Yup.string().min(5).max(20).required('Required'),
    age: Yup.number().required().positive().integer(),
    email: Yup.string().email().required(),
    gender: Yup.mixed().oneOf(['male', 'female']).defined(),
    phone: Yup.string().required().matches(/^[0-9]+$/, 'Only numbers are allowed').min(10).max(11),
    username: Yup.string().min(5).max(20).required(),
    password: Yup.string().min(5).required().max(20)
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/,
     'Contain special character and One number and Uppercase'),
    repassword:  Yup.string().oneOf ([Yup.ref ('password')], 'Passwords must match').required(),
    // bday: Yup.date().required('Date is required'),
    bgroup:Yup.string().required('Please select bloodgroup'),
    address:Yup.string().min(5).required(),
    file: Yup.mixed().required()
});

 

const MyForm = () => {
    const location = useLocation();
    const id = location.state?.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state=>state.user.data);
    let userData = selector.filter((item)=> item.id === id)
        userData = userData[0]
    // alert(JSON.stringify(userData))
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = () => {
            setSelectedImage(reader.result);
          };
    
          reader.readAsDataURL(file);
        }
      };



    console.log(selector.length)
        const handleSubmit =  (values) => {
            alert("Hello World")
            console.log('Form submitted successfully:', values);
            userData ?   dispatch(editUsersData({id,values})) : dispatch(addUsersData(values))
            navigate('/', { state: { data: true } });
        };

        const handleReset = () => {
        };
  return (
    <Formik  
        initialValues={{
            fullname : userData?.fullname || "",
            age : userData?.age || "",
            gender : userData?.gender || "",
            email : userData?.email || "",
            phone : userData?.phone || "",
            username : userData?.username || "",
            password : userData?.password || "",
            repassword : userData?.repassword || "",
            bdate : userData?.bdate || "",
            bgroup : userData?.bgroup || "",
            active : userData?.active || "",
            address  : userData?.address || "",
            file:""
            }}
    validationSchema = {validateSchema}
    onReset={handleReset}
      onSubmit={handleSubmit}>
      <Form className='Form'>
        <div className='Form-heading'>Form Heading</div>
        {selectedImage && <img src={selectedImage} alt="Selected" style={{ marginTop: '10px', 
        width: "200px", height:"200px",display:"block",margin:"0 auto",border:"1px solid #000",borderRadius:"80px",
    }} />}
        <hr/>
        <div className='Form-body'>

            <div className='input-container'>
                <label>Full Name</label>
                <br></br>
                <Field type='text'   className='input' placeholder='Enter FullName' name='fullname' />
                <ErrorMessage name='fullname' component="div"/>
            </div>

            <div className='input-container'>
                <label>Age</label>
                <br></br>
                <Field type='text'   className='input' placeholder='Enter Age' name='age'/>
                <ErrorMessage name='age' component="div"/>
            </div>

            <div className='input-container'>
                <label>Gender</label>
                <br></br>
                <label>Male</label><Field type="radio" name="gender" value="male"  />{" "}
                <label>Female</label><Field type="radio" name="gender" value="female"  />
                <ErrorMessage name='gender' component="div"/>
            </div>

            <div className='input-container'>
                <label>Email</label>
                <br></br>
                <Field type='text'   className='input' placeholder='Enter Email' name='email' />
                <ErrorMessage name='email' component="div"/>
            </div>

            <div className='input-container'>
                <label>Phone</label>
                <br></br>
                <Field type='text'   className='input' placeholder='Enter Phone Number' name='phone'/>
                <ErrorMessage name='phone' component="div"/>
            </div>

            <div className='input-container'>
                <label>Username</label>
                <br></br>
                <Field type='text'   className='input' placeholder='Enter Username' name='username'/>
                <ErrorMessage name='username' component="div"/>
            </div>

            <div className='input-container'>
                <label>Password</label>
                <br></br>
                <Field type='password'   className='input' placeholder='Enter Password' name='password'/>
                <ErrorMessage name='password' component="div"/>
            </div>

            <div className='input-container'>
                <label>Confirm Password</label>
                <br></br>
                <Field type='password'   className='input' placeholder='Re-Enter Password' name='repassword'/>
                <ErrorMessage name='repassword' component="div"/>
            </div>

            <div className='input-container'>
                <label>Enter Birth Date</label>
                <br></br>
                <Field type='date'   className='input' name='bdate' />
                <ErrorMessage name='bdate' component="div"/>
            </div>

            <div className='input-container'>
                <label>Add Profile</label>
                <br></br>
                <Field type='file'   className='input' placeholder='Re-Enter Password' name='file' accept=".jpg, .jpeg, .png" onInput={handleFileChange}/>
                {/*   */}
                <ErrorMessage name='file' component="div"/>
            </div>

            <div className='input-container'>
                <label>Select BloodGroup</label>
                <br></br>
                <Field as="select" className='input' name='bgroup'  placeholder="select blood group">
                <option value="" disabled selected>Select blood Group option</option>
                   { bloodGroups.map((grp,index)=>{
                       return <option key={index} value={grp.type}>{grp.type}</option>
                   })}
                </Field>
                <ErrorMessage name='bgroup' component="div"/>
            </div>

            <div className='input-container checkbox' >
                <label>Is Active</label> 
                <br></br>

                <Field className='checkbox'  type='checkbox' name="active"/>
            </div>

            <div className='input-container'>
                <label>Enter Address</label>
                <br></br>
                <Field as='textarea' className='input' name='address'/>
                <ErrorMessage name='address' component="div"/>
            </div>

            <div className='input-container '>
            </div>

            <div className='input-container btns'>
                {
                   userData ? 
                   <button className='mx-3 btn btn-dark' onClick={()=>
                   {
                    navigate(-1)
                   }}>Cancel</button>  : <button className='mx-3 btn btn-dark'
                    onClick={()=>
                    {
                     navigate("/")
                    }}>Cancel</button> 

                }
                <button className='mx-3 btn btn-danger' type="reset">Reset</button>        
                <input type='submit' className='mx-3 btn btn-primary' />     
            </div>
        </div>
            <hr/>
        </Form>
    </Formik>
  )
}

export default MyForm

