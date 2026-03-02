import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users } from "lucide-react";

export default function Menubar() {
  const [open, setOpen] = useState(false);

  const baseStyle =
    "relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300";

  const activeStyle =
    "text-[#144194] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#ffcc00] after:origin-left after:scale-x-100 after:transition-transform after:duration-300";

  const inactiveStyle =
    "text-slate-700 hover:text-[#144194] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#fe5000] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

  return (
    <nav
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/40
        border-b border-white/30
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <LayoutDashboard size={18} />
              ภาพรวมผลการสำรวจ
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseStyle} ${
                  isActive ? activeStyle : inactiveStyle
                } pointer-events-none opacity-50 cursor-not-allowed`
              }
            >
              <Users size={18} />
              ข้อมูลเชิงลึก
            </NavLink>

             <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseStyle} ${
                  isActive ? activeStyle : inactiveStyle
                } pointer-events-none opacity-50 cursor-not-allowed`
              }
            >
              <Users size={18} />
              ผลการวิเคราะห์
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-700"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/30 bg-white/70 backdrop-blur-xl p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive ? "text-[#144194] font-semibold" : "text-slate-700"
              }`
            }
          >
            <LayoutDashboard size={18} />
            ภาพรวมผลการสำรวจ
          </NavLink>

          <NavLink
            to="/branch"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive ? "text-[#144194] font-semibold" : "text-slate-700"
              }`
            }
          >
            <Users size={18} />
            ข้อมูลเชิงลึก
          </NavLink>

          <NavLink
            to="/analysis"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive ? "text-[#144194] font-semibold" : "text-slate-700"
              }`
            }
          >
            <Users size={18} />
            ผลการวิเคราะห์
          </NavLink>
        </div>
      )}
    </nav>
  );
}
