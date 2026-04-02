import { Mail, User2Icon, Lock } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = React.useState(urlState || 'login')
  const [error, setError] = React.useState('')

  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (state === 'login') {
        login(formData.email, formData.password)
      } else {
        register(formData.name, formData.email, formData.password)
      }
      navigate('/app/')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === 'login' ? 'Login' : 'Sign up'}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>

        {/* Error message */}
        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {state !== 'login' && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={20} className="text-indigo-600 shrink-0" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 flex-1 text-gray-900"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={20} className="text-indigo-600 shrink-0" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 flex-1 text-gray-900"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={20} className="text-indigo-600 shrink-0" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 flex-1 text-gray-900"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === 'login' && (
          <div className="mt-4 text-left text-indigo-500">
            <button className="text-sm" type="button">Forget password?</button>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {state === 'login' ? 'Login' : 'Sign up'}
        </button>

        <p
          onClick={() => {
            setState(prev => prev === 'login' ? 'register' : 'login')
            setError('')
          }}
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <span className="text-indigo-500 hover:underline ml-1">click here</span>
        </p>
      </form>
    </div>
  )
}

export default Login