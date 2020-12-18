const express = require("express");
const { readMovies, writeMovies } = require("../library/utilities");
const uniqid = require("uniqid");
const { fstat } = require("fs-extra");
const fs = require("fs");
const { join } = require("path");

const moviesRouter = express.Router();

const moviesPath = join(__dirname, "movies.json");

moviesRouter.get("/", async (req, res, next) => {
  try {
    const moviesDB = await readMovies();
    // console.log(moviesDB);
    res.send(moviesDB);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

moviesRouter.post("/", async (req, res, next) => {
  try {
    const moviesDB = await readMovies();
    const newMovie = { ...req.body, imdbID: uniqid() };
    moviesDB.push(newMovie);
    await writeMovies(moviesDB);
    res.status(201).send(newMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

moviesRouter.delete("/:movieID", async (req, res, next) => {
  try {
    const moviesDB = await readMovies();
    const singleMovie = moviesDB.find(
      (movie) => movie.imdbID !== req.params.movieID
    );
    if (singleMovie) {
      const filteredMoviesDB = moviesDB.filter(
        (movie) => movie.imdbID !== req.params.movieID
      );
      await writeMovies(filteredMoviesDB);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = moviesRouter;
