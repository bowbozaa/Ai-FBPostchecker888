import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './shadcn.css';

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root element');
}

// Create React root and render app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
