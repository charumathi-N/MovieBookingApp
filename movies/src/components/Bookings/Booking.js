import React, { Fragment, useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { getMovieDetails,newBooking } from '../../api-helpers/api-helpers';
import { Button, FormLabel, TextField, Typography } from '@mui/material';
import  {Box} from "@mui/material";

const Booking = () => {
    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({seatNumber:"", date:""});
    const id = useParams().id;
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await getMovieDetails(id);
                setMovie(res.movies);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovieDetails();
    }, [id]);
    const handleChange = (e) =>{
        setInputs((prevState)=>({...prevState, [e.target.name]: e.target.value}))
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs.date); // Log the date input
        newBooking({ ...inputs, movie: movie._id })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    console.log(movie,inputs);
    return (
        <div>
            {movie && <Fragment>
                <Typography padding={3} fontFamily="fantasy"
                variant="h4" textAlign={"center"}>
                  " Book Tickets of Movie: {movie.title}"
                </Typography>
                <Box display={"flex"} justifyContent={"center"}>
                    <Box display={"flex"} 
                    justifyContent={"column"} 
                    flexDirection="column"
                    paddingTop={3}
                    width="50%">
                        <img width="80%" 
                        heigth={"300px"} 
                        src={movie.posterUrl} 
                        alt={movie.title}/>
                        <Box width={"80%"} marginTop={3} padding={2}>
                            <Typography paddingTop={2}>{movie.Description}</Typography>
                            <Typography fontWeight={"bold"} marginTop={1}>
                                Starrer:
                                {movie.actors.map((actor)=>" "+actor+" ")}
                            </Typography>
                            <Typography fontWeight={"bold"} marginTop={1}>
                                Release Date: {new Date(movie.releaseDate).toDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <Box width={"50%"} paddingTop={3}>
                        <form onSubmit={handleSubmit}>
                            <Box padding={5} margin={"auto"} display={"flex"} flexDirection={"column"}>
                                <FormLabel>Seat Number</FormLabel>
                                {/* <TextField value={inputs.seatNumber} onChange={handleChange} name='seatNumber' type={"number"} margin='normal' variant="standard"/>
                                <TextField value={inputs.seatNumber} onChange={handleChange} name="date"  type={"date"} margin="normal" variant='standard'/> */}
                                <TextField value={inputs.seatNumber} onChange={handleChange} name="seatNumber" type={"number"} margin="normal" variant="standard" />
                                <TextField value={inputs.date} onChange={handleChange} name="date" type="date" margin="normal" variant="standard" />
                                <Button type='submit' sx={{mt:3}}>
                                    Book Now
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Fragment>}
        </div>
    )
}

export default Booking
