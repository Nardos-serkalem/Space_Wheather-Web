import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Research", path: "/research" },
    { name: "Conferences", path: "/conference" },
    { name: "Team", path: "/staff-profile" },
    { name: "Space Weather", path: "/space-weather" },
  ];

  // Pages that need solid background from the start
  // Removed '/space-weather' to allow transparent start there
  const solidBgPages = ["/conference", "/staff-profile"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const alwaysSolid = solidBgPages.includes(location.pathname);
  const bgClass = scrolled || alwaysSolid ? "bg-[#0E1B3D] shadow-md" : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${bgClass}`}
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="SSGI_Logo.png" alt="Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium text-white hover:text-[#E69D4A] transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
{open && (
  <nav className="md:hidden bg-[#0E1B3D] px-6 py-4 space-y-4">
    {navLinks.map((link) => (
      <Link
        key={link.name}
        to={link.path}
        onClick={() => setOpen(false)}
        className="block text-white font-medium hover:text-[#E69D4A] transition"
      >
        {link.name}
      </Link>
    ))}
  </nav>
)}

    </header>
  );
};

export default Navbar;
