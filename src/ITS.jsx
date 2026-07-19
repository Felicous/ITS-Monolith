import { useState } from 'react'
import { 
  Button,
  Box
 } from '@mui/material'
import { HintDisplay } from './ai/HintDisplay';
import { TaskSelection } from './tutoring/TaskSelection'
import { RenderTask } from './tutoring/components/RenderTask';
import { InputAnalysis } from './tutoring/InputAnalysis';
import { updateStudent, save } from './student/StudentModel';
import { DisplayResult } from './tutoring/components/DisplayResult';


function ITS() {

    const [nextTask, setTask] = useState(null);

    const [result, setResult] = useState(false);

    const [correct, setCorrect] = useState(false);

    function HandleUserInput(task, input) {

      /** @type {boolean} - Result of the analysis of the users input */
      const isCorrect = InputAnalysis(task, input);

      setCorrect(isCorrect);

      updateStudent(task.id, task.concept, isCorrect);

      setResult(true);

      // Call save to store data in persistence.
      save();
    }

  return (
    <Box sx={{ p: 4 }}>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        onClick={() => {setTask(TaskSelection()); setResult(false);}}
        sx={{ mb: 2, fontWeight: "bold" }}
      >
          Next Task
      </Button>
    {/* Display only shows up, when task was selected */}
    {(nextTask && !result) && (
        <Box sx={{ mt: 2 }}>
          <RenderTask 
            task={nextTask} 
            onSubmit={HandleUserInput}
          />
          <HintDisplay task={nextTask} />
        </Box>
      )}

      {result && (
        <DisplayResult 
          task={nextTask} 
          taskCorrect={correct}
        />
      )}
    </Box>
  )
}

export default ITS;