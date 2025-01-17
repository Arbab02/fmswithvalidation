'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaHome, FaChartLine, FaHandshake, FaUser, FaSignOutAlt, FaTools } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdDataUsage, MdAddChart, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarRef = useRef(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggleCollapse();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex fixed z-10">
      <div
        ref={sidebarRef}
        className={`${
          isCollapsed ? "w-16" : "w-60"
        } bg-gray-800 text-white h-screen transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={toggleCollapse}
            className="text-2xl block p-2 hover:bg-gray-700 rounded-full"
          >
            {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
          </button>
        </div>

        <nav className="mt-4">
          <ul>
            <Link href="/">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaHome className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Home</span>}
              </li>
            </Link>
            <Link href="/Dashboard">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <HiOutlineDesktopComputer className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Dashboard</span>}
              </li>
            </Link>
            {/* <Link href="/">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaChartLine className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Analytics</span>}
              </li>
            </Link> */}
            <Link href="/FinanceForm">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <MdAddChart className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Add Data</span>}
              </li>
            </Link>
            <Link href="/metrics">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <MdDataUsage className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Metrics</span>}
              </li>
            </Link>
            {/* <Link href="/deals">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaHandshake className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Deals</span>}
              </li>
            </Link> */}
            <Link href="/tools">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaTools className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Tools</span>}
              </li>
            </Link>
            {/* <Link href="/">
              <li className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaSignOutAlt className="mr-3 text-xl" />
                {!isCollapsed && <span className="text-lg">Logout</span>}
              </li>
            </Link> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
