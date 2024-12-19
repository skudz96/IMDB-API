const express = require("express");
const { readFilmData } = require("../models/filmFunctions");

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

module.exports = router;
