const express = require("express");
const { readMovies, writeMovies } = require("../library/utilities");

const moviesRouter = express.Router();

moviesRouter.get("/", async (req, res, next) => {
  try {
    const moviesDB = await readMovies();
    console.log(moviesDB);
    res.send(moviesDB);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = moviesRouter;
