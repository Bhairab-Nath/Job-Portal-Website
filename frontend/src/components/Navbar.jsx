import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/authSlice";
import LoginDropdown from "./LoginDropDown";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, data } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(setLogout());
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-800 sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold transition-colors"
        >
          Job <span className="text-yellow-500">Khojau</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-transform hover:scale-105"
              >
                Register
              </Link>

              <LoginDropdown />
            </>
          ) : (
            <>
              {data?.role === "jobprovider" && (
                <Link
                  to="/job-provider-dashboard"
                  className="border border-slate-200 hover:border-yellow-400 hover:text-yellow-400 text-slate-200 px-4 py-2 rounded-md transition-transform hover:scale-105"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="border border-slate-200 hover:border-yellow-400 hover:text-yellow-400 text-slate-200 px-4 py-2 rounded-md transition-transform hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:text-yellow-400"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden mt-4 flex flex-col gap-3 overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        {!isAuthenticated ? (
          <>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 px-4 py-2 rounded-md text-center"
            >
              Register
            </Link>

            <LoginDropdown mobile closeMenu={() => setIsOpen(false)} />
          </>
        ) : (
          <>
            {data?.role === "jobprovider" && (
              <Link
                to="/job-provider-dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center border border-slate-200 hover:border-yellow-400 hover:text-yellow-400 text-slate-200 px-4 py-2 rounded-md transition-transform hover:scale-105"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="border border-slate-200 text-slate-200 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
