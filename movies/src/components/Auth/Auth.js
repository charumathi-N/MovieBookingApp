import React from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { userActions } from '../../Store';
import {useDispatch} from "react-redux";


const Auth = () =>{
    const dispatch = useDispatch();
    const onResReceived = (data) =>{
        console.log(data);
        dispatch(userActions.login())
        
    }
    const getData = (data) =>{
        console.log("Auth", data); 
        sendUserAuthRequest(data.inputs,data.signup)
        .then((res)=>console.log(res))
        .then(()=>dispatch(userActions.login()))
        .catch((err)=>console.log(err));
    };
    return (
        <AuthForm onSubmit={getData} isAdmin={false}/>
    )     
}
 
export default Auth
