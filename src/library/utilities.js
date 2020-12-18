const { readJson, writeJson } = require("fs-extra");
const { join } = require("path");

const moviesPath = join(__dirname, "../movies/movies.json");

const readDB = async (filepath) => {
  try {
    const fileJson = await readJson(filepath);
    return fileJson;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const writeDB = async (filepath, data) => {
  try {
    await writeJson(filepath, data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  readMovies: async () => readDB(moviesPath),
  writeMovies: async (data) => writeDB(moviesPath, data),
};
