import express from "express";
import fs from "fs";

console.log("listening to port 3000\nPress 'ctrl + c' to close the connection.\n");

const domain = express();
domain.use(express.json());

/**
 * Function for reading JSON files an responding with Errorcode if necessary
 * @param {string} filePath - path of the JSON file
 */
function readJSON(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return (JSON.parse(data));
    } catch (err) {
        console.error(err);
    }
}

/**
 * Function that returns the contents of Concepts.json
 */
domain.get("/concepts", (req, res) => {
    res.json(readJSON('./src/domain/Concepts.json'));
})

/**
 * Function that returns the contents of Tasks.json
 */
domain.get("/tasks", (req, res) => {
    res.json(readJSON('./src/domain/Tasks.json'));
})

domain.listen(3000)