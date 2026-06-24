// import { useState } from 'react'
// import { task } from './task_mockup'
import { DisplayMultiplechoice } from './DisplayMultiplechoice'
import { TaskSelection } from './TaskSelection'



function TestApp() {

  return (
    <>
    <DisplayMultiplechoice task={TaskSelection()}/>
    </>
  )
}

export default TestApp