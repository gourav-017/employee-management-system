import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        EMS
      </h1>

      <nav className="flex flex-col gap-3">

        <NavLink
          to="/dashboard"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Profile
        </NavLink>

      </nav>

    </div>
  );
}