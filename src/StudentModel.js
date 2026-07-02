import { assessMastery } from './MasteryAssenssment.js';

/** StudentReader */
/** @type {number} - Threshold that determines the mastery of a concept */
const masteryThreshold = 0.95;

/** Loading student data */
/** @type {object} - knowledge and conpletedTasks from the student */
let student;

try {
    const response = await fetch("http://localhost:3000/student");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    student = await response.json();
} catch (error) {
    console.error(error.message, "\nif 'fetch failed' try 'npm run filehost'\n");
}



/** Functions */
/**
 * Knowledge value to a given concept. Returns undefined if the concept doesn't exist.
 * @param {string} concept - concept from which the knowledge is to be returned
 * @returns {number} knowledge of the given concept
 */
export function getKnowledge(concept) {
    /** @type {object[]} - List of concepts an their mastery */
    const knowledge = student.knowledge.find(
        (element) => element.id == concept
    );

    if (knowledge === undefined) {
        return (knowledge);
    } else {
        return (knowledge.mastery);
    }
}

/**
 * Updates the knowledge of the given concept and stores the conpleted Task. New concepts get added with their knowledge.
 * @param {int} taskID - id of the completed task
 * @param {string} concept - concept to which the knowledge is to be updated
 * @param {boolean} correct - result of the task
 */
export function updateStudent(taskID, concept, correct) {
    /** @type {int} - Index of the concept, mastery pair */
    const knowledgeIndex = student.knowledge.findIndex(
        (element) => element.id == concept
    );

    // Updating the mastery
    if (knowledgeIndex == -1) {  // Add new concept
        student.knowledge.push(
            {id: concept, mastery: assessMastery(0, correct)}
        )
    } else {  // Update existing concept
        student.knowledge[knowledgeIndex].mastery = assessMastery(student.knowledge[knowledgeIndex].mastery, correct);
    }

    // Adding the new concept to the competedTasks if necessary
    if (knowledgeIndex == -1) {
        student.completedTasks.push(
            {
                id: concept,
                correctTasks: [],
                failedTasks: []
            }
        )
    }

    // Updating completedTasks
    /** @type {int} - Index of the concept */
    const taskIndex = student.completedTasks.findIndex(
        (element) => element.id == concept
    );

    /** @type {int} - Index of the task in faildTasks if it was previously failed */
    const failedIndex = student.completedTasks[taskIndex].failedTasks.findIndex(
        (element) => element == taskID
    );
    
    if (correct) {
        student.completedTasks[taskIndex].correctTasks.push(taskID);

        // Removing the task from the failedTasks list if the task was previosly failed
        if (failedIndex != -1) {
            student.completedTasks[taskIndex].failedTasks.splice(failedIndex, 1);
        }
    } else if (failedIndex == -1) {  // Testing if the task is already failed
        student.completedTasks[taskIndex].failedTasks.push(taskID);
    }
}

/**
 * Returns a list of all concepts, which mastery is higher than the threshold
 * @param {number} threshold - Threshold at wich the concept couns as mastered
 * @returns {string[]} List of known concepts
 */
export function getKnownConcepts(threshold = masteryThreshold) {
    /** @type {string[]} - List of known concepts */
    let knownConcepts = [];
    student.knowledge.forEach(element => {
        if (element.mastery >= threshold) {
            knownConcepts.push(element.id);
        }
    });
    return (knownConcepts);
}

/**
 * Returns a list of correctly solved tasks form the given concept. Returns undefined if the concept doesn't exist.
 * @param {string} concept - concept from which the correct tasks are to be returned
 * @returns {int[]} List of correctly solved tasks
 */
export function getCorrectTasks(concept) {
    /** @type {object} - Completed tasks from the given concept */
    const competedTasks = student.completedTasks.find(
        element => element.id == concept
    );
    
    if (competedTasks === undefined) {
        return (competedTasks);
    } else {
        return (competedTasks.correctTasks);
    }
}

/**
 * Returns a list of failed tasks form the given concept. Returns undefined if the concept doesn't exist.
 * @param {string} concept - concept from which the failed tasks are to be returned
 * @returns {int[]} List of failed tasks
 */
export function getFailedTasks(concept) {
    /** @type {object} - Completed tasks from the given concept */
    const competedTasks = student.completedTasks.find(
        element => element.id == concept
    );
    
    if (competedTasks === undefined) {
        return (competedTasks);
    } else {
        return (competedTasks.failedTasks);
    }
}

/**
 * Sets the mastery to the masteryThreshold.
 * Use when all tasks of the concept are solved correctly.
 * @param {string} concept - Concept to be mastered.
 */
export function masterConcept(concept) {
    /** @type {int} - Id of the concept in student.knowledge */
    const knowledgeIndex = student.knowledge.findIndex((element) => element.id == concept);

    student.knowledge[knowledgeIndex].mastery = 0.95;
}

/**
 * Returns beather the concept has been presented.
 * @param {string} concept - The concept in question.
 * @returns {boolean} Has the concept been presented.
 */
export function wasPresented(concept) {
    /** @type {int} - Id of the concept in student.knowledge */
    const knowledgeIndex = student.knowledge.findIndex((element) => element.id == concept);

    if (!student.knowledge[knowledgeIndex].presented) {
        student.knowledge[knowledgeIndex].presented = true;
        return (false);
    } else {
        return (true);
    }
}

/**
 * Saves the student data to Student.json
 */
export async function save() {
    const data = await fetch(
        "http://localhost:3000/student",
        {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Conten-Type': 'application/json'
            },
            body: JSON.stringify(student, null, 4)
        }
    );
}