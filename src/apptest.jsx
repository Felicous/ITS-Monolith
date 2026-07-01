// import { useState } from 'react'
// import { task } from './task_mockup'
import { DisplayMultiplechoice } from './DisplayMultiplechoice'
import { HintDisplay } from './HintDisplay';
import { TaskSelection } from './TaskSelection'



function TestApp() {

  const currentTask = TaskSelection();

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <DisplayMultiplechoice task={currentTask} />
      <HintDisplay task={currentTask} />
    </div>
  );
}

export default TestApp;