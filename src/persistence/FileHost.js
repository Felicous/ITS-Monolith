import express from "express";
import fs from "fs";

/**
 * This is a solution for reading the JSON files and passing the contents on to the vite-project.
 * Run 'npm run filehost' to start the script.
 */

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.text());

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
 * Function which returns the contents of Concepts.json
 */
app.get("/concepts", (req, res) => {
    res.json(readJSON('./src/persistence/Concepts.json'));
});

/**
 * Function which returns the contents of Tasks.json
 */
app.get("/tasks", (req, res) => {
    res.json(readJSON('./src/persistence/Tasks.json'));
});

/**
 * Function which returns the contents of Student.json
 */
app.get("/student", (req, res) => {
    res.json(readJSON('./src/persistence/Student.json'));
});

/**
 * Function which saves the given object in Student.json
 */
app.post("/student", (req, res) => {
    fs.writeFileSync(
        './src/persistence/Student.json',
        req.body
    );
    res.sendStatus(200);
});


app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT, "\nPress 'ctrl + c' to close the connection");
    }
); 