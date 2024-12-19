// Import app module from parent directory using commonJS notation
const app = require("../app");

const port = 3001;

// start server and listen on defined port

app.listen(port, () => {
  // log a message when server is successful
  console.log(`App listening at http://localhost:${port}`);
});
