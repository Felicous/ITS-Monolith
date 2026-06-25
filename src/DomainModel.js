/** DomainReader */
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
        console.error(error.message, "\nif 'fetch failed' try 'npm run filehost'\n");
    }

    return (result);
}

/**
 * @type {object} - List of concepts and tasks
 */
export const domainReader = {
    "concepts": await getData("http://localhost:3000/concepts"),
    "tasks": await getData("http://localhost:3000/tasks")
}