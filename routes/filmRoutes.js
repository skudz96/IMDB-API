const express = require("express");
const {
  readFilmData,
  getFilmById,
  replaceFilmById,
  updateFilmDataById,
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

module.exports = router;
