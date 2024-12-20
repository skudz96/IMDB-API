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
  console.log(filmData);
}

//create new film function
async function createNewFilm(newFilm) {
  try {
    //read films array with ids already generated
    const filmArray = await readFilmData();
    //append new variable to film array
    filmArray.push(newFilm);
    //save the updated array to the data file
    await writeData(filmArray);
    //return newly created data object
    console.log(filmArray.length);
    await assignIDs();
    return newFilm;
  } catch {
    console.error(error, "message: post request failed");
  }
}

//function to delete film
//search through film array and select by id
//

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

// Again, reformatting Chris' code. The way we are handling ID is different, so unsure if we need to, include this as part of the spread
async function updateFilmDataById(filmId, filmUpdates) {
  let filmData = await readFilmData();
  const index = await getFilmIndexById(filmId);

  if (index === -1) {
    return;
  }

  const oldFilmData = filmData[index];
  const updated = { ...oldFilmData, ...filmUpdates, id: filmId };

  filmData = [
    ...filmData.slice(0, index),
    updated,
    ...filmData.slice(index + 1),
  ];
  await writeData(filmData);
  console.log(filmData.length);
  return updated;
}

// Logic for finding a random film from our database
async function getRandomFilm() {
  let filmData = await readFilmData();
  let randomNumberGen = Math.floor(Math.random() * filmData.length);

  let randomFilm = filmData[randomNumberGen];
  console.log(randomFilm);
  return randomFilm;
}

async function getFilmByName(searched) {
  let filmData = await readFilmData();
  let lowercased = searched.toLowerCase();

  let filteredByName = filmData.filter(
    (film) =>
      film["Series_Title"] &&
      film["Series_Title"].toLowerCase().includes(lowercased)
  );

  return filteredByName;
}

async function getFilmByRating(rating) {
  let filmData = await readFilmData();

  let filteredByRating = filmData.filter(
    (film) => film["IMDB_Rating"] === parseFloat(rating)
  );

  return filteredByRating;

  /* if (filteredByRating.includes()) */
}

// get film by genre
async function getFilmByGenre(searched) {
  let filmData = await readFilmData();
  let lowercased = searched.toLowerCase();

  let filteredByGenre = filmData.filter(
    (film) =>
      film["Genre"] &&
      film["Genre"]
        .toLowerCase()
        .split(",") // Look into these 2 lines
        .some((genre) => genre.trim().includes(lowercased))
  );

  return filteredByGenre;
}

// Delete film function

async function deleteFilm(id) {
  //search through film array and select by id
  let filmArray = await readFilmData();
  //use findindexbyid to get index of film
  let filmIndex = await getFilmIndexById(id);
  //remove film from array with slice and index
  if (filmIndex !== -1) {
    let deletedObject = filmArray.splice(filmIndex, 1);
    //return deleted object
    await writeData(filmArray);
    await assignIDs();
    return deletedObject;
  }
}

module.exports = {
  readFilmData,
  getFilmById,
  replaceFilmById,
  updateFilmDataById,
  createNewFilm,
  getRandomFilm,
  getFilmByName,
  getFilmByRating,
  deleteFilm,
  getFilmByGenre,
};
