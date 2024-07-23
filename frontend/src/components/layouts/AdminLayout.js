import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { MdOutlineMiscellaneousServices,MdOutlineImportContacts } from "react-icons/md";
import './admin.css'
import { useAuth } from '../../store/auth';
import ErrorPage from '../../screens/Error';
export default function AdminLayout() {

  const {user}=useAuth();
  const styleobj={
    color:"#17cf97",
    marginTop:"5px"

  }
  return (
    <>
     {user.isAdmin ? (<>
      <section>
        
        <h1 style={styleobj} className='mx-5'>Welcome To Admin Panel ,{user.username}</h1>
      </section>
     <div className="admin-nav my-5">
     <nav className="navbar navbar-expand-lg navbar-light " style={styleobj}>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <h1 style={styleobj} className='mx-5'>Welcome To Admin Panel ,{user.username}</h1>

       <ul className="navbar-nav mr-auto">
         <li className="nav-item active mx-5 ">
           <NavLink className="fs-1 my-5" style={styleobj} to={"/admin/users"}><FaUser />users</NavLink>
         </li>
         
         <li className="nav-item mx-5">
           <NavLink className="fs-1 my-5" style={styleobj} to={"/admin/contacts"}><MdOutlineImportContacts />Contacts</NavLink>
         </li>
         
         <li className="nav-item mx-5">
           <NavLink className="fs-1" style={styleobj} to={"/admin/services"}><MdOutlineMiscellaneousServices />Services</NavLink>
         </li>
       </ul>
     </div>
     </nav>
    
       <Outlet/>
     </div>
      </>
    ) : (
      <ErrorPage/>
    )}
    </>
  )


}



