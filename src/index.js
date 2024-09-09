import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './pages/App'
import Register from './pages/Register'
import Account from './pages/Account'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
