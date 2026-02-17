import React, { Dispatch, SetStateAction } from "react";
import ptt from "/src/images/thaipbs.png";
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
        w-full h-16 px-8
        flex items-center justify-between

        bg-gradient-to-r
        from-white
        via-[#fff4ec]
        to-[#fe5000]

        backdrop-blur-md
        border-b border-[#fe5000]/20
        shadow-sm
      "
    >
      <a href="/dashboard" className="flex items-center gap-3 group">
        <div className="flex items-center gap-3 hover:scale-[1.02] transition">
          <img
            src={ptt}
            alt="ThaiPBS"
            className="w-20 object-contain"
          />
          <img
            src={casia}
            alt="C-Asia"
            className="w-20 object-contain mt-4"
          />
        </div>
      </a>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-white">
          <div className="
              flex items-center justify-center
              w-9 h-9
              text-sm font-semibold
              text-white
              bg-gradient-to-br from-[#fe5000] to-[#b43900]
              rounded-full
              shadow-md
            ">
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white ">
                {user.name}
              </span>

              <button
                className="
                  px-3 py-1.5
                  text-sm font-medium
                  text-white
                  border border-[#fe5000]/40
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
