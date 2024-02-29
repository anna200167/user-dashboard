import React from 'react'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter ,Routes,Route} from "react-router-dom"  
import Header from "./components/Header.jsx"
import MyForm from "./MyForm.jsx"
import Users from "./User.jsx"
import { MyComponent } from './components/Mycomponent.js';

const App = () => {
  return (
    <>
    {/* <ToastContainer /> */}
    {/* {(()=>{toast("Data Added Sucessfully!");})()} */}
    
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Users/>} />
            <Route path='/form' element={<MyForm/>} />
            <Route path='/setting' element={<MyComponent/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App