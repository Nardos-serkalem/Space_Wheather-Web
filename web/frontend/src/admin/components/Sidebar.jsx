import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#0E1B3D] text-white p-6 flex flex-col">
      <NavLink to="/admin/dashboard" className="mb-6 flex justify-center">
        <img src="/SSGI_Logo.png" alt="Logo" className="h-16 w-auto" />
      </NavLink>

      <h2 className="text-2xl font-bold text-center mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4 flex-grow">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "text-[#E69D4A] font-semibold" : "hover:text-[#E69D4A]"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/manage-research"
          className={({ isActive }) =>
            isActive ? "text-[#E69D4A] font-semibold" : "hover:text-[#E69D4A]"
          }
        >
          Manage Research
        </NavLink>
        <NavLink
          to="/admin/manage-events"
          className={({ isActive }) =>
            isActive ? "text-[#E69D4A] font-semibold" : "hover:text-[#E69D4A]"
          }
        >
          Manage Events
        </NavLink>
      </nav>

      {/* Back to public site button */}
      <NavLink
        to="/"
        className="mt-auto block text-center bg-[#E69D4A] hover:bg-[#cf893b] text-white py-2 rounded font-semibold transition"
      >
        Back to Public Site
      </NavLink>
    </aside>
  );
};

export default Sidebar;
