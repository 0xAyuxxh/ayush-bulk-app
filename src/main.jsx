import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BulkApp from './BulkApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BulkApp />
  </StrictMode>,
)
