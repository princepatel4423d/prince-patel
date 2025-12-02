import React, { useState, useRef, useEffect } from "react";
import { PiPaintBrushBroadFill } from "react-icons/pi";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const DesktopTheme = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { name: "light", icon: <FiSun size={16} />, label: "Light" },
    { name: "dark", icon: <FiMoon size={16} />, label: "Dark" },
    { name: "system", icon: <FiMonitor size={16} />, label: "System" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTheme = (name) => {
    setTheme(name);
    setOpen(false); // Close dropdown after selecting
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      {/* Paint icon button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change color theme"
        title="Change color theme"
        className="p-1.5 bg-neutral-200 dark:bg-neutral-100 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-200 transition"
      >
        <PiPaintBrushBroadFill size={20} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 top-12 w-32 bg-white dark:bg-neutral-800 shadow-lg rounded-2xl z-50">
          <div className="p-2 text-sm text-neutral-500">Color themes</div>
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={() => handleSelectTheme(opt.name)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm rounded-xl transition
                ${theme === opt.name
                  ? "bg-neutral-300 text-black font-bold"
                  : "dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopTheme;