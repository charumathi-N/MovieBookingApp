import React, { useState } from "react";
import { AppBar, Autocomplete, Toolbar, TextField, Tabs, Tab } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";

const dummyArray = ["Memory", "Brahmastra", "Forest grump"];
const Header = () => {
    const [value, SetValue] = useState(0);
  return (
    <AppBar sx={{bgcolor:"#2b2d42"}}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={dummyArray.map((option) => option)}
            renderInput={(params) => (
              <TextField 
              sx={{input:{color:"white"}}}  variant="standard"
              {...params} placeholder="Search Across Multiple Movies" />
            )}
          />
        </Box>
        <Box display={"flex"}>
            <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>SetValue(val)} > 
                <Tab label="Movies"/>
                <Tab label="Admin"/>
                <Tab label="Auth"/>
            </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
