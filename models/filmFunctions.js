/* const data = require("../libs/imdb_top_1000.json");  not needed any more as helper functions parse and return the data for us*/
const { readData, writeData } = require("../models/helperFunctions");

async function assignIDs() {
  // Creating a function that assigns persistent IDs to our movies
  const data = await readData(); // Storing data from helper function
  if (!data) return null; // return null if data doesn't exist

  // .map does something to every element in the array
  // for each item in the array, the callback function recieves:
  // item: the current element, index: the current position (starts at 0)
  // spread every item in the array (...) with the addition of id
  // note that item and index are parameters that the .map() method's callback function takes
  const updatedData = data.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  await writeData(updatedData);
  return updatedData;
}
// Reading data reassigns IDs
async function readFilmData() {
  const filmData = await assignIDs();
  return filmData;
}

// Getting a film by ID. IDs are dynamically updated before a film is fetched
async function getFilmById(filmId) {
  let films = await readFilmData();
  return films.find(({ id }) => id === filmId);
}

// Find index of a film by its ID
async function getFilmIndexById(filmId) {
  let films = await readFilmData();
  return films.findIndex((film) => film.id === filmId);
}

// Update existing entries with PUT and PATCH request
// remember PATCH = partial, PUT = entire resource
// can select currently existing entries we wish to update with the new ID parameter

// Similar to Chris' code. Not sure if spread is needed here. Also logging filmdata.length to ensure it is indeed replacing and not adding
async function replaceFilmById(filmId, filmReplacement) {
  let filmData = await readFilmData();
  const index = await getFilmIndexById(filmId);

  if (index === -1) {
    return;
  }

  const newFilm = { ...filmReplacement, id: filmId };

  filmData = [
    ...filmData.slice(0, index),
    newFilm,
    ...filmData.slice(index + 1),
  ];

  await writeData(filmData);
  console.log(filmData.length);
  return newFilm;
}

async function editFilmData() {}

module.exports = {
  readFilmData,
  getFilmById,
  replaceFilmById,
};
