import { StrictMode } from 'react'
import { ClickToComponent } from "click-to-react-component";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ClickToComponent />
  </StrictMode>,
)
