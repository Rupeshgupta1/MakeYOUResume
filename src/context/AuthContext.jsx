import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ── App load hone pe check karo user logged in hai ya nahi ────────────────
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // ── Register ──────────────────────────────────────────────────────────────
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === email)
    if (exists) {
      throw new Error('Email already registered!')
    }
    const newUser = { id: `user_${Date.now()}`, name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const { password: _, ...userWithoutPassword } = newUser
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Invalid email or password!')
    }
    const { password: _, ...userWithoutPassword } = found
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)