import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = auth.login(username, password);
    if (success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1B3D] px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 text-gray-800">
        <div className="flex justify-center mb-6">
          <img src="/SSGI_Logo.png" alt="Logo" className="h-16 w-auto" />
        </div>
        <h1 className="text-xl font-semibold text-center mb-4">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E69D4A]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E69D4A]"
            required
          />
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#E69D4A] text-white py-2 rounded hover:bg-[#cf893b] transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
