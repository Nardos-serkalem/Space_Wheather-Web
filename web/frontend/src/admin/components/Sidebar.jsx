import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiDatabase, FiCalendar, FiUsers } from "react-icons/fi";

const Sidebar = () => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-l-full transition-all duration-200 ${
      isActive ? "bg-[#E69D4A] text-white font-semibold" : "hover:bg-[#194270] text-gray-200"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-[#0E1B3D] text-white flex flex-col p-6">
      {/* Logo */}
      <NavLink to="/admin/dashboard" className="mb-6 flex justify-center">
        <img src="/SSGI_Logo.png" alt="Logo" className="h-16 w-auto" />
      </NavLink>

      <h2 className="text-2xl font-bold text-center mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-2 flex-grow">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <FiHome /> Dashboard
        </NavLink>
        <NavLink to="/admin/manage-research" className={linkClass}>
          <FiDatabase /> Manage Research
        </NavLink>
        <NavLink to="/admin/manage-events" className={linkClass}>
          <FiCalendar /> Manage Events
        </NavLink>
        <NavLink to="/admin/manage-staff" className={linkClass}>
          <FiUsers /> Manage Staff
        </NavLink>
      </nav>

      {/* Back to public site */}
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
