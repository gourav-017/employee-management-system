import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,

  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },

];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">
          EMS
        </h1>

        <p className="text-sm text-slate-400">
          Employee Management
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{menu.title}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-700">

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}