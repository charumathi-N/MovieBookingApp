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
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => SetValue(val)}
          >
            <Tab component={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && [
                <Tab key="admin" LinkComponent={Link} to="/admin" label="Admin" />,
                <Tab key="auth" LinkComponent={Link} to="/auth" label="Auth" />,
              ]}
            {isUserLoggedIn && [
              <Tab key="profile" LinkComponent={Link} to="/user" label="Profile" />,
              <Tab key="logout" onClick={() => logout(false)} LinkComponent={Link}
                to="/"
                label="Logout"
              />,
            ]}
                 {isAdminLoggedIn && [
              <Tab key="Add Movie" LinkComponent={Link} to="/add" label="Add Movie"/>,
              <Tab key="Profile" LinkComponent={Link} to="/admin" label="Profile"/>,
              <Tab key="Logout" onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout"/>,
            ]} 
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
