import { useState } from 'react'
import { Button } from '@mui/material'
// import { task } from './task_mockup'
import { DisplayMultiplechoice } from './DisplayMultiplechoice'
import { TaskSelection } from './TaskSelection'



function TestApp() {

    const [nextTask, setTask] = useState(null);

  return (
    <>
    <Button onClick={() => setTask(TaskSelection())}>
        Next Task
    </Button>
{/* Display only shows up, when task was selected */}
    {nextTask && (
        <DisplayMultiplechoice task={nextTask} />
      )}
    </>
  )
}

export default TestApp