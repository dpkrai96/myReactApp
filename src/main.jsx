import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TestGorilla from './TestGorill.jsx'
import Counter  from "./Counter.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <TestGorilla props={{visible:1}} /> */}
    {/* <TestGorilla body="<h1> hi</h1>" /> */}
    {/* <TestGorilla children="<h1> hi</h1>" /> */}
    <Counter />
  </StrictMode>,
)
