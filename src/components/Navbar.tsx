import { NavLink } from  "react-router"
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/95 py-2 shadow-lg" : "bg-gray-900 py-4"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            RpM Official
          </span>
        </div>
        
        <div className="flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? "bg-blue-900/50 text-blue-100 shadow-inner" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/submitTime" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? "bg-blue-900/50 text-blue-100 shadow-inner" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Submit time
          </NavLink>
          <NavLink 
            to="/joinus" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? "bg-blue-900/50 text-blue-100 shadow-inner" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Join us
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? "bg-indigo-900/50 text-indigo-100 shadow-inner" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>
                    {/* <NavLink 
            to="/session" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? "bg-purple-900/50 text-purple-100 shadow-inner" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            Login
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
};