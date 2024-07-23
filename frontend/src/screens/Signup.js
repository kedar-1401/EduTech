import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import './Login.css'
import { toast } from 'react-toastify';
import TopLoading from '../components/TopLoading';


export default function Signup() {

  const [credentials, setCredentials] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    showPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  

  const navigate=useNavigate();
  const {storeTokenInLS}=useAuth();
  const handleSubmit = async(e)=>{
      e.preventDefault();

      try {
        const response=await fetch('http://localhost:5000/api/auth/signup',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(credentials)
        })

        if (response.ok) {
          const responseData = await response.json();
          setCredentials({ username: "", email: "", password: "" ,confirmPassword:""});
          // localStorage.setItem("token",responseData.token)
          storeTokenInLS(responseData.token);
          toast.success("Regestration successful")

          navigate('/')
        } else {
          const responseError = await response.json();
          toast.error(responseError.extraDetails ?responseError.extraDetails : responseError.message)
          //(responseError.extraDetails);
          if(responseError.message==="You have an account already you can Login instead "){
            navigate("/login")
          }
        }

      } catch (error) {
          console.log('reg',error);
      }
    }
  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const showPAssword=(e)=>{
    setShowPassword(!showPassword);
  }
  const ShowConfirmPassword=(e)=>{
    setShowConfirmPassword(!showConfirmPassword);
  }
  const loginwithgoogle = ()=>{
    window.open("http://localhost:6005/auth/google/callback","_self")
}
  return (
    <div className="wrapper">
              <TopLoading/>
    <div className="container main">
      <div className="row">
          <div className="col-md-12 right">
              
              <div className="input-box">
                 <h4>Begin your Journey with</h4>
                 <header>EduTech</header>
                 <div className="input-field">
                      <input type="text" className="input" id="username"  onChange={handleInput} value={credentials.username} name="username" />
                      <label htmlFor="email">Username</label> 
                  </div> 
                 <div className="input-field">
                      <input type="text" className="input" id="email" autoComplete="off"  onChange={handleInput} value={credentials.email} name="email"/>
                      <label htmlFor="email">Email</label> 
                  </div> 
                 <div className="input-field">
                      <input type={ showPassword ? "text" : "password" } className="input" id="pass"  value={credentials.password} onChange={handleInput} name='password'/>
                      
                      <label htmlFor="pass">Password</label>
                      {showPassword ? <i class="fa fa-eye" onClick={showPAssword} aria-hidden="true"></i>:<i class="fa fa-eye-slash" onClick={showPAssword} aria-hidden="true"></i>}
                  </div> 
                  <div className="input-field">
                      <input type={ showConfirmPassword ? "text" : "password" } className="input" id="confirmpass"  value={credentials.confirmPassword} onChange={handleInput} name='confirmPassword' />
                      <label htmlFor="pass">Confirm Password</label>
                      {showConfirmPassword ? <i class="fa fa-eye" onClick={ShowConfirmPassword} aria-hidden="true"></i>:<i class="fa fa-eye-slash" onClick={ShowConfirmPassword} aria-hidden="true"></i>}
                  </div> 
                 <div className="input-field">
                      <button onClick={handleSubmit}>Sign Up</button>                   
                 </div> 
                 <div className="input-field">
                 <p>---------------------------------------Or---------------------------------------</p>
                 <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google
                </button>
                 </div>
              </div>  
          </div>
      </div>
  </div>
  </div>
  );
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWJiYWI2YmJiNWEwNzQ0MjU5NmM0MTEiLCJlbWFpbCI6ImMiLCJpYXQiOjE3MDY3OTc5MzJ9.zQu5VtNE33VFuqvHgbQEXDDSkr-oIfaxflgKVUrtjgU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWJiYWI2YmJiNWEwNzQ0MjU5NmM0MTEiLCJlbWFpbCI6ImMiLCJpYXQiOjE3MDY3OTc5NzB9.URQPl08a4qZ8KIaeLfuqlXkmxup3zL2u9AYsde674Hw