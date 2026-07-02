import { DisplayCodeCompletion } from "./DisplayCodeCompletion";
import { DisplayMultiplechoice } from "./DisplayMultiplechoice";

export function RenderTask({task, onSubmit}) {

    switch(task.type) {
        
        case "multiple-choice":
            return <DisplayMultiplechoice 
                    task={task}
                    onSubmit={(input) => onSubmit(task, input)}
                />;

        case "code-completion":
            return <DisplayCodeCompletion 
                    task={task}
                    onSubmit={(input) => onSubmit(task, input)}
                />;

        default:
            return <div> ERROR </div>;
    }

}