import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/auth'


export const Logout=() =>{

    const {Logoutuser} =useAuth();

    localStorage.clear();
    useEffect(() => {
        Logoutuser();
    }, [])
    
     return <Navigate to='/login'/>
}
