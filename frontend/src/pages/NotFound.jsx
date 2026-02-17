import React from "react";
import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      
      
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <SearchX size={50} className="text-red-600" />
      </div>

      
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 max-w-md mb-6">
        The page you are looking for doesn’t exist or may have been removed. 
        Explore available jobs or return to the homepage.
      </p>

      
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Homepage
        </Link>

        <Link
          to="/"
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  )
}

export default NotFound;
