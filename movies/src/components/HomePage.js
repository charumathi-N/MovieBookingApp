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
          src="https://i.ytimg.com/vi/Njsku3ql7UI/maxresdefault.jpg"
          alt="Bramastra"
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
