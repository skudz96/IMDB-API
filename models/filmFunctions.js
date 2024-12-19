const data = require("../libs/imdb_top_1000.json");

async function readFilmData() {
  return data;
}

module.exports = {
  readFilmData,
};
