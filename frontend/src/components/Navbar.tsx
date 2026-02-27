import React, { Dispatch, SetStateAction } from "react";
import egat from "/src/images/egat.png";
import casia from "../images/c-asia.png";

interface User {
  id: number;
  name: string;
  email?: string;
}

interface NavbarProps {
  user: User | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export default function Navbar({ user, setToken }: NavbarProps) {
  return (
    <nav
      className="
        w-full h-20 px-8
        flex items-center justify-between

        backdrop-blur-md
        border-b border-blue-700/10
        shadow-sm
      "
    >
      <a href="/dashboard" className="flex items-center gap-3 group">
        <div className="flex items-center gap-3 hover:scale-[1.02] transition">
          <img src={egat} alt="ThaiPBS" className="w-20 object-contain" />
          <img src={casia} alt="C-Asia" className="w-20 object-contain mt-4" />
        </div>
      </a>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-black">
          <div
            className="
              flex items-center justify-center
              w-9 h-9
              text-sm font-semibold
              text-white
              bg-gradient-to-br from-blue-700 to-blue-400
              rounded-full
              shadow-md
            "
          >
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-black ">
                {user.name}
              </span>

              <button
                className="
                  px-3 py-1.5
                  text-sm font-medium
                  bg-blue-700
                  text-white
                  border border-blue-700
                  rounded-md
                  hover:bg-[#fe5000]
                  hover:text-white
                  transition-all
                  duration-200
                "
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setToken(null);
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
