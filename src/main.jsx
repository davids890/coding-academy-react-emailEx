import React from 'react'
import ReactDOM from 'react-dom/client' // vs createRoot ?
import { App } from './App.jsx'
import './assets/css/index.css' // ?

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)


// import { createRoot } from 'react-dom/client'
// import { App } from './App.jsx'
// import './assets/css/index.css'