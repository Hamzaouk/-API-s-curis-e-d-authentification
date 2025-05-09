import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App