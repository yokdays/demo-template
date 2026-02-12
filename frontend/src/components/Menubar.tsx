import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, Settings } from "lucide-react";

export default function Menubar() {
  const [open, setOpen] = useState(false);

  const linkStyle = "flex items-center gap-2 px-3 py-2 rounded-lg transition";

  const activeStyle = "text-black border-b-2 border-[#fe5000] bg-[#fff5f0]";

  const inactiveStyle = "text-slate-600 hover:bg-slate-100 hover:text-blue-600";

  return (
    <nav className="bg-white shadow border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <LayoutDashboard size={18} />
              ภาพรวมผลการสำรวจ
            </NavLink>

            <NavLink
              to="/branch"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <Users size={18} />
              ข้อมูลเชิงลึก
            </NavLink>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <Users size={18} />
              ผลการวิเคราะห์
            </NavLink>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white p-4 space-y-2">
          <NavLink
            to="/"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/users"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Users size={18} />
            Users
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </div>
      )}
    </nav>
  );
}
