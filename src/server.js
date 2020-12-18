const express = require("express");
const { join } = require("path");

const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("./library/errorHandling");

const moviesRouter = require("./movies");

const server = express();

const port = process.env.PORT || 3077;

server.use(express.json());
server.use("/movies", moviesRouter);

//error handlers
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log("Server running away on port: ", port);
});
