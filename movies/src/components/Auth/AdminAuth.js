import React from 'react';
import AuthForm from '../Auth/AuthForm';

function AdminAuth() {
    const getData = (data)=>{
         console.log("Auth",data);
    }
    return (
        <div><AuthForm onSubmit={getData}/></div>
    )
}

export default AdminAuth
        