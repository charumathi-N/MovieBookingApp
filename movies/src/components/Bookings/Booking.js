import React, { Fragment, useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { getMovieDetails } from '../../api-helpers/api-helpers';
import { Typography } from '@mui/material';
import  {Box} from "@mui/material";

const Booking = () => {
    const [movie, setMovie] = useState();
    const id = useParams().id;
    useEffect(() => {
        getMovieDetails(id)
        .then((res)=>setMovie(res.movie))
        .catch(err=>console.error(err));
    },[id]);
    console.log(movie);
    return (
        <div>
            {movie && <Fragment>
                <Typography padding={3} fontFamily="fantasy"
                variant="h4" textAlign={"center"}>
                   Book Tickets of Movie: {movie.title}
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
                            <Typography paddingTop={2}>{movie.description}</Typography>
                            <Typography fontweight={"bold"} marginTop={1}>
                                Starrer:
                                {movie.actors.map((actor)=>" "+actor+" ")}
                            </Typography>
                            <Typography fontweight={"bold"} marginTop={1}>
                                Release Date: {new Date(movie.releaseDate).toDateString()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Fragment>}
        </div>
    )
}

export default Booking
