import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { getAllMovies } from "../api-helpers/api-helpers.js";

function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40%"} padding={2}>
        <img
          src="https://ew.com/thmb/0XGogtzJdyFN1hRdeLC1QzCk5Gk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EH2_20211019_06515_R-2000-ad302f22295847708c252539c230d934.jpg"
          alt="Sherlock holmes"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>

      <Box
        display="flex"
        margin={"auto"}
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice()
            .map((movie, item) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={item}
              />
            ))}
      </Box>
    </Box>
  );
}

export default HomePage;
