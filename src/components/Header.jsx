import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut,IoCloseSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { FaWpforms,FaUsers } from "react-icons/fa";
import {Link} from "react-router-dom"
import "./header.scss"
const Header = () => {
    const [isModelOpen,setIsModelOpen] = useState(false);
    const [isSideBarOpen,setIsSideBarOpen] = useState(false);
    const [isCloser,setIsCloser] = useState(false)

  return (
    <div className='container-fluid Header'>

        <div className='header-first'>
        {
            isSideBarOpen && <div className='sidebar'>
                <div className='sidebar-cross'>
                     <IoCloseSharp onClick={()=>{
                      setIsSideBarOpen(false); 
                      setIsCloser(false)
                    }} />
                </div>
                <div className='sidebar-body'>
                <Link to={"/"} className='link'><FaUsers />Users</Link>
                <Link to={"/form"} className='link'><FaWpforms />Form</Link>
                <Link to={"/setting"} className='link'><IoIosSettings/>Setting</Link>
                </div>
            </div>
        }
         <GiHamburgerMenu onClick={()=>{ 
          setIsSideBarOpen(true);
           setIsCloser(true)}
          }
        />
         <Link to={"/"}>
         <img src='https://static.vecteezy.com/system/resources/previews/000/397/015/original/modern-company-logo-design-vector.jpg' alt='img'/></Link>
       </div>
       <div className='header-second'>
       <img src='https://tse3.mm.bing.net/th?id=OIP.GlIuUj-GYrRL_G8WvZ3YagHaHw&pid=Api&P=0&h=180' alt='img' 
       onClick={()=>
        {
          setIsModelOpen(!isModelOpen) 
          setIsCloser(true)

        }
       
       }/>
       {
        isModelOpen &&   <div className='model'>
                            <Link className='muted'>Hii Arya</Link>
                            <Link><IoLogOut/>Log Out</Link>
                            <Link><IoIosSettings/>Setting</Link>
                         </div>
       }     
       {
        isCloser && <div className='model-close' onClick={()=>{
          setIsModelOpen(false)
          setIsSideBarOpen(false)
          setIsCloser(false)
        }}>

        </div>
       }
       </div>
    </div>
  )
}

export default Header