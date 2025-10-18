import { useState } from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { FaChartColumn } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className={`hidden md:flex flex-col items-center gap-4 justify-center h-full 
      bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 shadow-lg 
      relative transition-all duration-300 ease-in-out 
      ${isSidebarCollapsed ? "w-16" : "w-60"}`}
      >
        <button
          onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          className="absolute top-4 -right-4 bg-gray-900 rounded-full p-1 shadow-md hover:bg-gray-800 transition"
        >
          {isSidebarCollapsed ? (
            <BiArrowFromLeft size={32} className="text-indigo-500" />
          ) : (
            <BiArrowFromRight size={32} className="text-indigo-500" />
          )}
        </button>

        <div className="flex flex-col items-center gap-3 mt-10 w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 w-[85%]
            ${
              isActive
                ? "bg-indigo-500 text-white shadow-md"
                : "hover:bg-gray-700 hover:text-white"
            }`
            }
          >
            <span>
              <GrContactInfo size={26} />
            </span>
            {!isSidebarCollapsed && <span>Contact</span>}
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 w-[85%]
            ${
              isActive
                ? "bg-indigo-500 text-white shadow-md"
                : "hover:bg-gray-700 hover:text-white"
            }`
            }
          >
            <span>
              <FaChartColumn size={26} />
            </span>
            {!isSidebarCollapsed && <span>Charts & Maps</span>}
          </NavLink>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 flex md:hidden justify-around bg-gray-900 text-gray-200 h-16 shadow-lg z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-sm font-medium w-full h-full ${
              isActive ? "text-indigo-500" : "text-gray-300"
            }`
          }
        >
          <GrContactInfo size={26} />
          <span className="text-xs">Contact</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-sm font-medium w-full h-full ${
              isActive ? "text-indigo-500" : "text-gray-300"
            }`
          }
        >
          <FaChartColumn size={26} />
          <span className="text-xs">Charts</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Navbar;
