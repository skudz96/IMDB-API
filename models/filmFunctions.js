/* const data = require("../libs/imdb_top_1000.json");  not needed any more as helper functions parse and return the data for us*/
const { readData, writeData } = require("../models/helperFunctions");

async function assignIDs() {
  // Creating a function that assigns persistent IDs to our movies
  const data = await readData(); // Storing data from helper function
  if (!data) return null; // return null if data doesn't exist

  // .map does something to every element in the array
  // in this case, we are passing 2 arguments to data, item and index
  // spread every item in the array (...)
  const updatedData = data.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  await writeData(updatedData);
  return updatedData;
}

async function readFilmData() {
  const filmData = await assignIDs();
  return filmData;
  console.log(filmData);
}

//create new film function
async function createNewFilm(newFilm) {
  try {
  //read films array with ids already generated
    const filmArray= await readFilmData();
  //append new variable to film array
    filmArray.push(newFilm);
//save the updated array to the data file
    await writeData(filmArray);
//return newly created data object
    return(newFilm);
  } catch {
  console.error(error, "message: post request failed")
  }
}

//function to delete film
//search through film array and select by id
//

module.exports = {
  readFilmData,
  createNewFilm,
};
