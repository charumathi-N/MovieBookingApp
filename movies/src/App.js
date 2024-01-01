import Header from "./components/Header";
import { Route,Routes} from "react-router-dom"
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store";

function App() {
  const dispatch = useDispatch()
  const isAdminisLoggedIn = useSelector((state)=>state.admin.isLoggedIn);
  const isUserisLoggedIn = useSelector((state)=>state.user.isLoggedIn); 
  console.log("isAdminLoggedIn",isAdminisLoggedIn);
  console.log("isUserLoggedIn",isUserisLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId"))
    {
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId")){
      dispatch(userActions.login());
    }
  },[])
  return (
    <div>
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
