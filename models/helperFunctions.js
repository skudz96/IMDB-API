const fs = require("fs").promises;
const path = require("node:path");

const FILEPATH = path.resolve(process.cwd(), "./libs/imdb_top_1000.json");

async function readData() {
  try {
    const data = await fs.readFile(FILEPATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(FILEPATH, JSON.stringify(data), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing file:", error);
    return false;
  }
}

module.exports = {
  readData,
  writeData,
};
