import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Toolbar, TextField, Tabs, Tab } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies} from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";

const Header = () => {
    const [value, SetValue] = useState(0);
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
      getAllMovies()
      .then((data)=> setMovies(data.movies))
      .catch((err)=> console.log(err));
    })
  return (
    <AppBar position="sticky" sx={{bgcolor:"#2b2d42"}}>
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
              sx={{input:{color:"white"}}}  variant="standard"
              {...params} placeholder="Search Across Multiple Movies" />
            )}
          />
        </Box>
        <Box display={"flex"}>
            <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>SetValue(val)} > 
                <Tab LinkComponent={ Link } to="/movies" label="Movies"/>
                <Tab LinkComponent={ Link }  to="/admin" label="Admin"/>
                <Tab LinkComponent={ Link }  to="/auth" label="Auth"/> 
            </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
