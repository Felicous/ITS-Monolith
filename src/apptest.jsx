import { useState } from 'react'
import { 
  Button,
  Box
 } from '@mui/material'
// import { task } from './task_mockup'
// import { DisplayMultiplechoice } from './DisplayMultiplechoice'
import { HintDisplay } from './HintDisplay';
import { TaskSelection } from './TaskSelection'
import { RenderTask } from './RenderTask';
import { InputAnalysis } from './InputAnalysis';
import { updateStudent, save } from './StudentModel';



function TestApp() {

    const [nextTask, setTask] = useState(null);

    function HandleUserInput(task, input) {
      const correct = InputAnalysis(task, input);
      updateStudent(task.id, task.concept, correct);
      // save aufrufen für speichern in persistenz
      save();
    }

  return (
    <>
    <Button onClick={() => setTask(TaskSelection())}>
        Next Task
    </Button>
{/* Display only shows up, when task was selected */}
    {nextTask && (
        <Box>
          <RenderTask 
            task={nextTask} 
            onSubmit={HandleUserInput}
          />
          <HintDisplay task ={nextTask} />
        </Box>
      )}
    </>
  )
}

export default TestApp;