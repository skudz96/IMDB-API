const express = require("express");

const {
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
} = require("../models/filmFunctions");
const { type } = require("os");

// setting up the router
const router = express.Router();

// testing router + get request of data works

router.get("/", async (req, res) => {
  try {
    let filmData = await readFilmData();

    let data = {
      success: true,
      payload: filmData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// Get film by name

router.get("/search", async (req, res) => {
  try {
    const title = req.query.title;

    const findFilm = await getFilmByName(title);

    let data = { success: true, payload: findFilm };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// by genre
router.get("/genre", async (req, res) => {
  try {
    const filmGenre = req.query.genre;

    const findFilm = await getFilmByGenre(filmGenre);

    let data = { success: true, payload: findFilm };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// get films by rating

router.get("/rating", async (req, res) => {
  try {
    const rating = req.query.score;
    const findFilmByRating = await getFilmByRating(rating);

    data = { success: true, payload: findFilmByRating };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// routing GET request for a random film -- ERRORS DONE PROPERLY?
// This was giving an error as it was clashing with /:id. Apparently this has to come before it as express matches routes in the order they're defined
router.get("/random", async (req, res) => {
  try {
    console.log(req.params);
    let randomFilm = await getRandomFilm();

    let data = {
      success: true,
      payload: randomFilm,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

//post request to create new film and append it to film array, post request to /,
router.post("/", async function (req, res) {
  let filmData = await readFilmData();
  //uses req.body to store as a variable
  let userInput = req.body;

  //call create film  function with req.body as argument
  let createdFilm = await createNewFilm(userInput);

  //create data object with success boolean and payload
  const data = {
    success: true,
    payload: createdFilm,
  };

  //respond with status and complete data set
  res.status(201).json(data);
});

// getting a film by its ID -- ERRORS DONE PROPERLY?

router.get("/:id", async (req, res) => {
  try {
    let searchedId = JSON.parse(req.params.id); // Same stuff we got stuck on yesterday. CHECK TYPE and CONVERT IF NEEDED
    console.log(typeof searchedId);
    let searchedFilm = await getFilmById(searchedId);

    if (!searchedFilm) {
      res.status(404);
    }

    let data = {
      success: true,
      payload: searchedFilm,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// replacing a film -- ERRORS DONE PROPERLY?

router.put("/:id", async (req, res) => {
  try {
    let searchedId = JSON.parse(req.params.id);
    let newFilmInfo = req.body;
    let replaceFilm = await replaceFilmById(searchedId, newFilmInfo);

    console.log(newFilmInfo);

    let data = {
      success: true,
      payload: replaceFilm,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// updating a film -- ERRORS DONE PROPERLY?

router.patch("/:id", async (req, res) => {
  try {
    let searchedId = JSON.parse(req.params.id);
    let updatedFilmInfo = req.body;
    let updateFilm = await updateFilmDataById(searchedId, updatedFilmInfo);

    console.log(updateFilm);
    let data = {
      success: true,
      payload: updateFilm,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

// delete a film

router.delete("/:id", async (req, res) => {
  try {
    let searchedId = JSON.parse(req.params.id);
    let deletedFilm = await deleteFilm(searchedId);
    res.status(200).json(deletedFilm);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: null,
    });
  }
});

module.exports = router;
