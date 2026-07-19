import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ITS from './ITS.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ITS/>
  </StrictMode>,
)
