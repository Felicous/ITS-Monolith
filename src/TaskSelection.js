import { Concepts } from "./concept_mockup";
import { conceptKnowledge } from "./student_mockup";
import { completedTasks } from "./student_mockup";
import { Tasks } from "./task_mockup";

export function TaskSelection() {

    //placeholder for fetching of data from each models

    // sorting concepts by mastery
    conceptKnowledge.sort((a,b) => a.mastery - b.mastery);
    

    // choosing the topic with the least mastery, but with every prerequisite above threshhold
    let unknownConcepts = conceptKnowledge.filter(x => x.mastery <= 0.4);

    let nextConcept = Concepts[0];

    for (const concept of conceptKnowledge) {
        
        let tempConcept = Concepts.find(c => c.id === concept.id);

        if(tempConcept.prerequisites.some(a => unknownConcepts.some(b => a === b.id))) {
            continue;
        };

        nextConcept = tempConcept;

        break;        

    };

    //choosing unattempted or failed task from nextConcept
    let taskLists = completedTasks.find(x => x.id === nextConcept.id);

    let allAttempted = [...taskLists.correctTasks, ...taskLists.failedTasks];

    let nextTask = nextConcept.tasks.find(x => !allAttempted.includes(x));

    return Tasks.find(x => x.id === nextTask);    

};