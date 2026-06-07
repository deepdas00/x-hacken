import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icon lib
import logo from "../assets/logo.png";

const Navbar = ({ setRegistrationForm }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl ${menuOpen ? "bg-[#030303]" : "bg-[#030303]/80"} border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.8)]`}
    >
      <div className="flex justify-between items-center px-4 md:px-10 py-2 max-w-[1600px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-16 md:w-20" />
          <span
            className="text-lg md:text-2xl font-black tracking-tighter"
            style={{ color: "var(--color-secondary)" }}
          >
            X<span className="text-white">-hacken</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            <a href="#" className="hover:text-green-500 transition">
              Tracks
            </a>
            <a href="#" className="hover:text-green-500 transition">
              Mentors
            </a>
            <a href="#" className="hover:text-green-500 transition">
              Schedule
            </a>
          </div>

          <button
            onClick={() => setRegistrationForm(true)}
            className="btn-secondary1 text-white font-black px-5 py-1.5 text-[10px] rounded-full uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Register Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden h-screen backdrop-blur-xsl bg-[#030303]/50 border-t border-white/[0.03] shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <div className="lg:hidden bg-[#030303]/50 px-6 pb-6 pt-2">
            <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-gray-300">
              <a href="#" onClick={() => setMenuOpen(false)}>
                Tracks
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                Mentors
              </a>
              <a href="#" onClick={() => setMenuOpen(false)}>
                Schedule
              </a>

              <button
                onClick={() => {
                  setRegistrationForm(true);
                  setMenuOpen(false);
                }}
                className="btn-secondary1 text-white font-black px-5 py-2 rounded-full text-xs uppercase tracking-widest"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
