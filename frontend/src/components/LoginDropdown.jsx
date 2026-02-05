import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const LoginDropdown = ({ mobile = false, closeMenu }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click (desktop only)
  useEffect(() => {
    if (mobile) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobile]);

  // 📱 MOBILE VERSION (no dropdown)
  if (mobile) {
    return (
      <>
        <Link
          to="/login/job-seeker"
          onClick={closeMenu}
          className="bg-white hover:bg-slate-200 text-blue-800 px-4 py-2 rounded-md text-center"
        >
          Login as Job Seeker
        </Link>

        <Link
          to="/login/job-provider"
          onClick={closeMenu}
          className="bg-white hover:bg-slate-200 text-blue-800 px-4 py-2 rounded-md text-center"
        >
          Login as Job Provider
        </Link>
      </>
    )
  }

  // 🖥️ DESKTOP DROPDOWN
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 bg-gray-200 text-blue-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition"
      >
        Login
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border z-50">
          <Link
            to="/login/job-seeker"
            className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Login as Job Seeker
          </Link>

          <Link
            to="/login/job-provider"
            className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Login as Job Provider
          </Link>
        </div>
      )}
    </div>
  )
}

export default LoginDropdown;
