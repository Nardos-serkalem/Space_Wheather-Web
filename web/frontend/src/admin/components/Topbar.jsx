import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#0E1B3D] text-white shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        <span>Welcome, {user?.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
