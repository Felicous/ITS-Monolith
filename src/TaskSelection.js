import { domainReader } from "./DomainModel.js";
import { getCorrectTasks, getFailedTasks, getKnowledge, getKnownConcepts, masterConcept, wasPresented } from "./StudentModel.js";

/**
 * Selects the next task based on the students unmastered concepts, their prerequisites and the students knowledge of this concept.
 * @returns {{
 *     id: int,
 *     concept: string,
 *     type: string,
 *     difficulty: int,
 *     explanation: string,
 *     content: array
 *     solution: any,
 *     hints: string[]
 * }} Next task.
 */
export function TaskSelection() {

    /** Chosing nextConcept */
    // Gettintg unknown concepts
    /** @type {object[]} - List of unknown concepts */
    let unknownConcepts = [];

    // Getting all concepts with all prerequisites known
    for (const concept of domainReader.concepts) {
        if (concept.prerequisites.every((prerequisite) => getKnownConcepts(0.6).includes(prerequisite))) {
            unknownConcepts.push(concept);
        }
    }

    // Getting rid of the mastered concepts
    unknownConcepts = unknownConcepts.filter((concept) => !getKnownConcepts().includes(concept.id));

    /**
     * If there are no unmastered concepts.
     */
    if (unknownConcepts.length == 0) {
        return ({
            type: "explanation",
            explanation: "Congratulations. You have mastered all concepts of this course and are now able to programm a little bit in C++."
        });
    }

    // Sorting concepts by knowledge
    unknownConcepts.sort((a, b) => getKnowledge(a.id) - getKnowledge(b.id));

    /** @type {object} - Concept with the least mastery */
    const nextConcept = unknownConcepts[0];

    /**
     * If the concept hasn't been presented.
     */
    if (!wasPresented(nextConcept.id)) {
        return ({
            type: "explanation",
            explanation: nextConcept.explanation
        });
    }

    /**
     * If there are no more tasks for this concept.
     */
    if (nextConcept.tasks == getCorrectTasks(nextConcept.id)) {
        masterConcept(nextConcept.id);
        return ({
            type: "explanation",
            explanation: "You have mastered this concept due to a lack of tasks."
        });
    }

    /** Choosing nextTask */
    /** @type {int} - Chosen difficulty */
    let difficulty;

    // Difficulty thresholds
    if (getKnowledge(nextConcept.id) < 0.32) {
        difficulty = 1;
    } else if (getKnowledge(nextConcept.id) < 0.64) {
        difficulty = 2;
    } else {
        difficulty = 3;
    }

    /** @type {array<int[]>} - List of unattempted tasks */
    const newTasks = splitByDifficulty(nextConcept.tasks.filter(
        (task) => !(getCorrectTasks(nextConcept.id).includes(task) || getFailedTasks(nextConcept.id).includes(task))
    ));

    /** @type {array<int[]>} - list of failed tasks */
    const failedTasks = splitByDifficulty(getFailedTasks(nextConcept.id));

    /** @type {int} - Id of the chosen task */
    let nextTaskId;

    // If there are any new tasks
    if (newTasks.length != 0) {
        if (newTasks[difficulty - 1].length != 0) {  // If there are any new tasks with the right difficulty
            nextTaskId = (newTasks[difficulty - 1][0]);
        } else if (failedTasks[difficulty - 1].length != 0) {  // If there are any failed tasks with the right difficulty
            nextTaskId = (failedTasks[difficulty - 1][0]);
        } else {
            nextTaskId = findTask(newTasks, difficulty);
        }

        // Getting the task
        return (domainReader.tasks.find((task) => task.id == nextTaskId));
    }

    if (failedTasks[difficulty - 1].length != 0) {  // If there are any failed tasks with the right difficulty
            nextTaskId = (failedTasks[difficulty - 1][0]);
    } else {
        nextTaskId = findTask(failedTasks, difficulty);
    }
    
    // Getting the task
    return (domainReader.tasks.find((task) => task.id == nextTaskId));
}


/**
 * Splits a list of tasks into three lists sorted by their difficulty.
 * @param {int[]} tasks - List of tasks to sort by difficulty.
 * @returns {array<int[]>} List of lists of tasks sorted by difficulty.
 */
function splitByDifficulty(tasks) {
    /**
     * @type {array<int[]>} - Three lists of tasks sorted by their difficulty.
     */
    let taskLists = [[], [], []]

    for (const task of tasks) {
        /** @type {object} - The real task from domain */
        const realTask = domainReader.tasks.find((element) => element.id == task);
        
        taskLists[realTask.difficulty - 1].push(task)
    }

    return (taskLists);
}

/**
 * Searches for available tasks optimally with the correct difficulty.
 * @param {array<int[]>} taskLists - Three lists of tasks sorted by their difficulty.
 * @param {int} difficulty - Chosen difficulty
 * @returns {int} Id of the chosen task.
 */
function findTask(taskLists, difficulty) {
    if (difficulty == 1) {  // Difficulty 1 empty but needed
        if (taskLists[1].length != 0) {  // Difficulty 1 and 3 empty
            return (taskLists[1][0]);
        } else {  // Difficulty 1 and 2 empty
            return (taskLists[2][0]);
        }
    } else if (difficulty == 2) {  // Difficulty 2 empty but needed
        if (taskLists[0].length != 0) {  // Difficulty 2 and 3 empty
            return (taskLists[0][0]);
        } else {  // Difficulty 1 and 2 empty
            return (taskLists[2][0]);
        }
    } else {  // Difficulty 3 empty but needed
        if (taskLists[1].length != 0) {  // Difficulty 1 and 3 empty
            return (taskLists[1][0]);
        } else {  // Difficulty 2 and 3 empty
            return (taskLists[0][0]);
        }
    }
}