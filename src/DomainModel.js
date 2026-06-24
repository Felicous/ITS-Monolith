/** DomainReader */
export default class DomainReader {
    /**
     * Ctor (reads the files)
     */
    constructor() {
        this.concepts = getData("http://localhost:3000/concepts");
        this.tasks = getData("http://localhost:3000/tasks");
    }
}

/**
 * Function to receive the data from a JSON file
 * @param {string} url - URL where the jSON file is hosted
 */
async function getData(url) {
    /** @type {string} */
    let result;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        result = await response.json();
    } catch (error) {
        console.error(error.message);
    }

    return (result);
}

// const Test = new DomainReader();

// console.log(Test.concepts);

console.log(await getData("http://localhost:3000/concepts"));