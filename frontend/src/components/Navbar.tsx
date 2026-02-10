import React from "react";
import ptt from "/src/images/ptt.png";
import casia from "/src/images/c-asia.png";
import { useLogout } from "./Logout";

export default function Navbar() {
  const logout = useLogout();

  return (
    <nav className="w-full h-14 px-6 bg-white border-b shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-16 h-16 ml-10 text-white rounded gap-2">
          <img src={ptt} alt="icon" className="w-full h-full object-contain" />
          <img
            src={casia}
            alt="icon"
            className="w-full h-full object-contain mt-2"
          />
        </div>

        {/* <span className="text-lg font-semibold text-gray-800">
          Demo Dashboard
        </span> */}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Dashboard
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Recruit
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Progress
        </button>

        <div className="flex items-center gap-2 pl-4 border-l">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-gray-400 rounded-full">
            NJ
          </div>
          <span className="text-sm text-gray-700">Nakin</span>
          <button onClick={logout} className="text-red-600 hover:text-red-800">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
