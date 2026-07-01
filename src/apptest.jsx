import { useState } from 'react'
import { Button } from '@mui/material'
// import { task } from './task_mockup'
import { DisplayMultiplechoice } from './DisplayMultiplechoice'
import { HintDisplay } from './HintDisplay';
import { TaskSelection } from './TaskSelection'
import { RenderTask } from './RenderTask';



function TestApp() {

    const [nextTask, setTask] = useState(null);

  return (
    <>
    <Button onClick={() => setTask(TaskSelection())}>
        Next Task
    </Button>
{/* Display only shows up, when task was selected */}
    {nextTask && (
        <RenderTask task={nextTask} />
      )}
    </>
  )
}

export default TestApp;