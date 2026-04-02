import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const logoutUser = () => {
        logout()
        navigate('/')
    }

    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-5xl mx-auto px-10 sm:px-16 py-4 text-slate-800 transition-all'>

                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="logo" className='h-11 w-auto' />
                    <span className="text-xl font-bold text-indigo-600">MakeYOURresume</span>
                </Link>

                <div className='flex items-center gap-4 text-sm'>
                    <p className='max-sm:hidden'>
                        hi {user?.name}
                    </p>
                    <button
                        onClick={logoutUser}
                        className='bg-white hover:bg-slate-300 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'
                    >
                        logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar