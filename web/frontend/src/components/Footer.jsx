import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaAngleRight } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // same page, scroll manually
    } else {
      navigate(path); // different page, navigate
    }
  };

  return (
    <footer className="bg-[#0E1B3D] text-white w-full pt-14 pb-10" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/10 pb-10">
        {/* Left: Branding + Contact Info + Socials */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold tracking-wider text-white">
            Space and Planetary Science
          </h2>
          <p className="text-sm text-gray-300 max-w-md leading-relaxed">
            Advancing space and planetary science through research, collaboration, and education.
          </p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>Email: <a href="mailto:info@essgi.gov.et" className="hover:text-[#E69D4A]">info@essgi.gov.et</a></p>
            <p>Phone: <a href="tel:+251112345678" className="hover:text-[#E69D4A]">+251 11 234 5678</a></p>
            <p>Address: Menilik II Ave, Addis Ababa</p>
          </div>
          <div className="flex gap-4 pt-3">
            <a href="#" aria-label="Facebook" className="hover:text-[#E69D4A]"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-[#E69D4A]"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#E69D4A]"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-300">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Research", path: "/research" },
              { name: "Research Domains", path: "/research/domains" },
              { name: "Publications", path: "/publications" },
              { name: "Conference", path: "/conference" },
              { name: "Space Weather", path: "/space-weather" },
              { name: "Staff", path: "/staff-profile" },
            ].map(({ name, path }) => (
              <button
                key={name}
                onClick={() => handleNavClick(path)}
                className="flex items-center gap-2 hover:text-[#E69D4A] transition-colors text-left"
              >
                <FaAngleRight className="text-[#E69D4A]" />
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Institute for Space Science and Planetary Research. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
