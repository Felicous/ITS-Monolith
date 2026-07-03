import { DisplayCodeCompletion } from "./DisplayCodeCompletion";
import { DisplayExplanation } from "./DisplayExplanation";
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

        case "explanation":
            return <DisplayExplanation task={task}/>;

        default:
            return <div> ERROR </div>;
    }

}