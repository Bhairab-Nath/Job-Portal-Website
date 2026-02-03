import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../store/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () =>{
    dispatch(setLogout())
  }

  return (
    <nav className="bg-blue-800 sticky top-0 z-50 px-6 py-4 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <h1 className="text-white text-2xl font-bold cursor-pointer  transition-colors">
          <Link to="/">Job Khojau</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated ?
            <>
              <Link
                to="/register"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
              >
                Login
              </Link>

            </>
            :
            <Link
              to="/"
              onClick={handleLogout}
              className="border border-slate-200 hover:border-yellow-400 hover:text-yellow-400 text-slate-200 px-4 py-2 rounded-md transition-transform transform hover:scale-105"
            >
              Logout
            </Link>

          }

        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:text-yellow-400 transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 flex flex-col gap-3 overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <Link
          to="/register"
          onClick={() => setIsOpen(false)}
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 px-4 py-2 rounded-md transition-transform transform hover:scale-105 text-center"
        >
          Register
        </Link>
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 px-4 py-2 rounded-md transition-transform transform hover:scale-105 text-center"
        >
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
