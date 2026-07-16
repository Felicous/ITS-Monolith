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
import { DisplayResult } from './DisplayResult';



function TestApp() {

    const [nextTask, setTask] = useState(null);

    const [result, setResult] = useState(false);

    const [correct, setCorrect] = useState(false);

    function HandleUserInput(task, input) {

      /** @type {boolean} - Result of the analysis of the users input */
      const isCorrect = InputAnalysis(task, input);

      setCorrect(isCorrect);

      updateStudent(task.id, task.concept, isCorrect);

      setResult(true);

      // save aufrufen für speichern in persistenz
      save();
    }

  return (
    <>
    <Button onClick={() => {setTask(TaskSelection()); setResult(false);}}>
        Next Task
    </Button>
{/* Display only shows up, when task was selected */}
    {(nextTask && !result) && (
        <Box>
          <RenderTask 
            task={nextTask} 
            onSubmit={HandleUserInput}
          />
          <HintDisplay task ={nextTask} />
        </Box>
      )}

      {result && (
        <DisplayResult 
          task={nextTask} 
          taskCorrect={correct}
        />
      )}
    </>
  )
}

export default TestApp;