import axios from 'axios';

export const getAllMovies = async() =>{
   const res = await axios.get("/movie")
   .catch((err)=> console.log(err));

   if(res.status !== 200){
     return console.log("No Data");
   }

   const data = await res.data;
   return data;
}


export const sendUserAuthRequest = async(data, signup)=>{
   const res = await  axios.post(`/user/${signup?"signup":"login"}`,{
      name: signup ?  data.name : "",
      email: data.email,
      password: data.password
    }).catch((err)=>console.log(err));
    console.log(res);
    if(res.status!== 200 && res.status!== 201 )
    {
      console.log("Unexpected error occurred");
    }
    const resData  = await res.data;
    return resData;
}

export const sendAdminAuthRequest = async (data) => {
   console.log("SendAdmin");
   const res = await axios
   .post("/admin/login",{
      email : data.email,
      password : data.password,
   })
   .catch((err)=>console.log(err));

   if(res.status !== 200){
    return console.log("Unexpected error occurred");
   }
   const resData = await res.data;
   return resData;
}

export const getMovieDetails = async (id) =>{
  const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
  if(res.status !== 200){
   return console.log("Unexpected status");
  }
  const resData = await res.data;
  return resData;

}