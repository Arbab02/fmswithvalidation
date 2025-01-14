'use client'


import { useState } from "react";
import { FaHome, FaChartLine, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex fixed z-10">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-60"
        } bg-gray-800 text-white h-screen transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={toggleCollapse}
            className="text-2xl block  p-2 hover:bg-gray-700 rounded-full"
          >
            {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
          </button>
          {/* <div className="text-xl font-bold">Studio</div> */}
        </div>

        <nav className="mt-4">
          <ul>
            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaHome className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Home</span>}
            </li>

            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <HiOutlineDesktopComputer className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Dashboard</span>}
            </li>

            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaChartLine className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Analytics</span>}
            </li>

            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <IoMdNotificationsOutline className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Notifications</span>}
            </li>

            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaUser className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Profile</span>}
            </li>

            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaCog className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Settings</span>}
            </li>

            <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaSignOutAlt className="mr-3 text-xl" />
              {!isCollapsed && <span className="text-lg">Logout</span>}
            </li>
          </ul>
        </nav>
      </div>

      
    </div>
  );
};

export default Sidebar;
