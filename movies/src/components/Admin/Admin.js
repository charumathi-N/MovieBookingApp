import React from 'react'
import AuthForm from '../Auth/AuthForm'
import {sendAdminAuthRequest} from "../../../src/api-helpers/api-helpers.js"
import {useDispatch} from "react-redux";


function Admin() {
    const dispatch = useDispatch();
    const getData = (data)=>{
        console.log("Admin",data);
        console.log("hey there");
        sendAdminAuthRequest(data.inputs)
        .then(()=>dispatch(adminActions.login()))
        .catch((err)=>console.log(err));
    };
    return (
        <div>
            <AuthForm onSubmit={getData} isAdmin={true}/>
        </div>
    )
}

export default Admin
