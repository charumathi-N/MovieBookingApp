import React, { useEffect, useState } from "react";
import { getUserBookings } from "../api-helpers/api-helpers";
import { AccountCircleIcon, Box, Typography, Fragment, ListItem, List ,ListItemText, IconButton} from "@mui/material";
import bookingsRouter from "../../../backend/routes/booking-routes";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const UserProfile = () => {
  const [booking, setBookings] = useState();
  useEffect(() => {
    getUserBookings()
      .then((res) => setBookings(res.booking))
      .catch((err) => console.log(err));
  }, []);
  console.log(booking);
  return <Box width={"100%"} display="flex">
    {booking && booking.length > 0 && (
      <Fragment>
        {" "}
        <Box
          flexDirection={"column"}
          justifyContent="center"
          alignitems={"center"}
          width={"30%"} padding={3}
        >
          <AccountCircleIcon sx={{ fontSize: "10rem", textAlign : "center", ml:3 }} />
          <Typography
            padding={1}
            width="auto"
            textAlign={"center"}
            border={"1px solid #ccc"}
            borderRadius={6}
          ></Typography>
        </Box>
        <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography variant="h3" fontFamily={"verdana"} textAlign="center" padding={2}>Bookings</Typography>
            <Box margin={"auto"} display="flex" flexDirection={"column"} width="80%">
                <List>
                    {bookingsRouter.map((booking,index)=>(
                        <ListItem
                            sx={{
                                bgcolor:"#00d386",
                                color:"white",
                                textAlign:"center",
                                margin:1
                            }}
                            >
                            <ListItemText
                                sx={{margin:1, width:"auto", textAlign:"left"}}
                                >Movie:{booking.movie.title}</ListItemText>
                                <ListItemText
                                sx={{margin:1, width:"auto", textAlign:"left"}}
                                >Seat:{booking.seatNumber}</ListItemText>
                                <ListItemText
                                sx={{margin:1, width:"auto", textAlign:"left"}}
                                >Date:{booking.releaseDate}</ListItemText>
                                <IconButton color="error">
                                    <DeleteForeverIcon />
                                </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
      </Fragment>
    )}
  </Box>
};

export default UserProfile;
