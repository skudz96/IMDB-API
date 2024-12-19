const express = require("express");
const { readFilmData, createNewFilm } = require("../models/filmFunctions");

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

//post request to create new film and append it to film array, post request to /, 
router.post("/", async function (req, res) {
  let filmData= await readFilmData();
  //uses req.body to store as a variable
  let userInput = req.body;

  //call create film  function with req.body as argument
  let createdFilm = await createNewFilm(userInput);

  //create data object with success boolean and payload
  const data= {
    success: true,
    payload: createdFilm
  }

  //respond with status and complete data set
  res.status(201).json(data);
})
router.post

module.exports = router;
