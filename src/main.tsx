// Browser polyfill สำหรับ process object
if (typeof process === 'undefined') {
  (window as any).process = { env: {} }
}

import { createRoot } from 'react-dom/client'
import './shadcn.css'
import App from './App'
import { logConfig } from './utils/env'

// Log configuration ใน development mode
logConfig()

const root = createRoot(document.getElementById('app')!)
root.render(<App />)
