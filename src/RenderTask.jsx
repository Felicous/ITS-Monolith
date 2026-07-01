import { DisplayCodeCompletion } from "./DisplayCodeCompletion";
import { DisplayMultiplechoice } from "./DisplayMultiplechoice";

export function RenderTask({task}) {

    switch(task.type) {
        
        case "multiple-choice":
            return <DisplayMultiplechoice task={task}/>;

        case "code-completion":
            return <DisplayCodeCompletion task={task}/>;

        default:
            return <div> ERROR </div>;
    }

}