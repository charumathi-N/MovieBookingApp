import React, { useState } from "react";
import {Button, Dialog, Box, TextField, Typography, FormLabel, IconButton } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const labelStyle = {mt:1,mb:1}
const AuthForm = () =>{
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        password:""
    });
    const [isSignup, setIsSignup] = useState(false);
    const handleChange = (e) =>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,

        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
    }
    return (
    <Dialog open={true} PaperProps={{style:{borderRadius:20}}}>
        <Box sx={{ml:"auto", padding:1}}>
            <IconButton>
                <CloseRoundedIcon/>
            </IconButton>
        </Box>
        <Typography variant="h4" textAlign="center">{isSignup ? "Signup":"Login"}</Typography>
        <form onSubmit={handleSubmit}>
            <Box 
            padding={6} 
            display={"flex"} 
            justifyContent={"center"} 
            flexDirection="column" 
            width={400}  
            margin="auto" 
            alignContent = {"center"}>
                 {isSignup && 
                 <>
                 {" "}
                 <FormLabel sx={labelStyle}>Name</FormLabel>
                <TextField value={inputs.name} onChange={handleChange} margin="normal" variant="standard" type={"text"} name="name"/>
                </>} 

                <FormLabel sx={labelStyle}>Email</FormLabel>
                <TextField value={inputs.email} onChange={handleChange}  margin="normal" variant="standard" type={"email"} name="email"/>

                <FormLabel sx={labelStyle}>Password</FormLabel>
                <TextField value={inputs.password} onChange={handleChange}  margin="normal" variant="standard" type={"password"} name="password"/>

                <Button sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42"}} type="submit"  fullwidth="true">{isSignup ? "Signup":"Login"}</Button>
                <Button onClick={()=>setIsSignup(!isSignup)} sx={{mt:2, borderRadius:10}}  fullwidth="true">Switch To {isSignup?"Login":"Signup"}</Button>
            </Box>
        </form>
    </Dialog>)
}
export default AuthForm
