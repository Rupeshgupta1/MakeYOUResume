import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/dashboard'
import Resumebuilder from './pages/Resumebuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

// ── Protected Route — sirf logged in user access kar sakta hai ───────────────
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

const App = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='view/:resumeID' element={<Preview />} />

        {/* Protected routes — bina login ke nahi jayega */}
        <Route
          path='app'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeID' element={<Resumebuilder />} />
        </Route>
      </Routes>
    </>
  )
}

export default App