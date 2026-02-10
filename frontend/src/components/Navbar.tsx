import React from "react";
import ptt from "/src/images/ptt.png";
import casia from "/src/images/c-asia.png";
import { useLogout } from "./Logout";

export default function Navbar({ user }) {
  const logout = useLogout();

  return (
    <nav
      className="
        w-full h-14 px-6
        flex items-center justify-between

        bg-gradient-to-r
      from-white
      via-[#00478E]/90
      to-[#005689]

        text-white
        backdrop-blur-md
        border-b border-white/20
        shadow-md
      "
    >
      <div className="flex items-center gap-3">
        <a href="/dashboard">
          <div className="flex items-center justify-center w-16 h-16 ml-10 text-white rounded gap-2 hover:cursor-pointer">
            <img
              src={ptt}
              alt="icon"
              className="w-full h-full object-contain"
            />
            <img
              src={casia}
              alt="icon"
              className="w-full h-full object-contain mt-2"
            />
          </div>
        </a>

        {/* <span className="text-lg font-semibold text-gray-800">
          Demo Dashboard
        </span> */}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pl-4 border-l">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-gray-400 rounded-full">
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <span className="font-medium ml-1">{user.name}</span>
              <button
                className="text-sm text-white hover:underline"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.replace("/login");
                }}
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
