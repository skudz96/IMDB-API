const express = require("express");
/* import express from "express"; Needed to switch to commonJS as we had issues with our data*/
const filmsRouter = require("./routes/filmRoutes");

// Import router from routes folder once that's set up

const app = express();
app.use(express.json());

// Use router for any requests. Define path name
app.use("/films", filmsRouter);

/* export default app; Similarly here*/
module.exports = app;
