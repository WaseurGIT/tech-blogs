import React, { useContext } from "react";
import { IoMdSunny } from "react-icons/io";
import { IoMoon, IoPersonCircle } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const links = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/saved", label: "Saved" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 z-20 w-full bg-[var(--bg-navbar)] shadow-md ${theme}`}
    >
      <div className="max-w-7xl mx-56 flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Blogify
        </h1>
        <div className="flex items-center justify-center gap-2">
          <IoPersonCircle className="text-2xl text-[var(--text-primary)] cursor-pointer" />
          <button
            onClick={toggleTheme}
            className="flex-shrink-0 relative transition-transform duration-300 hover:scale-110 active:scale-95 group"
          >
            {theme === "dark-theme" ? (
              <IoMdSunny className="text-2xl text-[var(--text-primary)] cursor-pointer" />
            ) : (
              <IoMoon className="text-2xl text-[var(--text-primary)] cursor-pointer" />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 pb-2">
        {links.map((link) => (
          <a
            key={link.path}
            href={link.path}
            className={({ isActive }) =>
              `hover:text-blue-500 text-sm text-[var(--text-primary)] ${isActive ? "text-blue-500" : ""}`
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
