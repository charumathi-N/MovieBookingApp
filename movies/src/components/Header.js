import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Toolbar,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminActions, userActions } from "../store";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, SetValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Multiple Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          {/* <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>SetValue(val)} > 
                <Tab LinkComponent={ Link } to="/movies" label="Movies"/>
                {!isAdminLoggedIn && !isUserLoggedIn && (
                  <>
                    <Tab LinkComponent={ Link }  to="/admin" label="Admin"/>
                    <Tab LinkComponent={ Link }  to="/auth" label="Auth"/> 
                  </>
                )}
                {isUserLoggedIn && (
                  <>
                    <Tab LinkComponent={ Link }  to="/user" label="Profile"/>
                    <Tab onClick={()=>logout(false)} LinkComponent={ Link }  to="/" label="Logout"/> 
                  </>
                )}
                  {isAdminLoggedIn && (
                  <>
                    <Tab LinkComponent={ Link }  to="/add" label="Add Movie"/>
                    <Tab LinkComponent={ Link }  to="/add" label="Profile"/>
                    <Tab onClick={()=>logout(true)} LinkComponent={ Link }  to="/admin" label="Logout"/> 
                  </>
                )}
            </Tabs> */}

          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => SetValue(val)}
          >
            <Tab component={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn &&
              !isUserLoggedIn && [
                <Tab key="admin" component={Link} to="/admin" label="Admin" />,
                <Tab key="auth" component={Link} to="/auth" label="Auth" />,
              ]}
            {isUserLoggedIn && [
              <Tab key="profile" component={Link} to="/user" label="Profile" />,
              <Tab
                key="logout"
                onClick={() => logout(false)}
                component={Link}
                to="/"
                label="Logout"
              />,
            ]}
            {isAdminLoggedIn && [
              <Tab key="add" component={Link} to="/add" label="Add Movie" />,
              <Tab
                key="adminProfile"
                component={Link}
                to="/add"
                label="Profile"
              />,
              <Tab
                key="adminLogout"
                onClick={() => logout(true)}
                component={Link}
                to="/admin"
                label="Logout"
              />,
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
