import express from 'express';
import {addMovie, getAllMovies ,getAllMoviesById} from "../controllers/movie-controller.js"

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getAllMoviesById);

export default movieRouter;