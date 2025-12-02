import React, { useState, useContext, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";

const navLinks = [
  { name: "Dashboard", path: "/admin" },
  { name: "Blogs", path: "/admin/blog/list" },
  { name: "Projects", path: "/admin/project/list" },
  { name: "Education", path: "/admin/education/list" },
  { name: "Work", path: "/admin/work/list" },
  {
    name: "Manage",
    dropdown: true,
    sections: [
      {
        type: "links",
        items: [
          { title: "Social Links", path: "/admin/social/list", desc: "Update all your public links" },
          { title: "Milestone", path: "/admin/milestone/list", desc: "Maintain your future goals" },
        ],
      },
    ],
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null); // mobile dropdown state
  const { toast } = useToast();
  const navigate = useNavigate();
  const { adminData, backendUrl, setAdminData, setIsLoggedin } = useContext(AppContext);
  const mobileRef = useRef();
  const dropdownRef = useRef();

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        setAdminData(false);
        toast("Logged out successfully", "success");
        navigate("/admin/login");
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast(error.message, "error");
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
        setMobileDropdownOpen(null);
      }
    };

    if (mobileOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };

    if (dropdownOpen !== null) document.addEventListener("mousedown", handleClickOutsideDropdown);
    else document.removeEventListener("mousedown", handleClickOutsideDropdown);

    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, [dropdownOpen]);

  if (!adminData) return <></>;

  return (
    <header className="w-full sticky bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl top-0 z-50">
      <div className="pl-2 pr-3 py-2 flex justify-between items-center">
        {/* Avatar */}
        <div className="relative">
          <div
            className="w-8 h-8 flex justify-center items-center rounded-full bg-black dark:bg-neutral-700 text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {adminData.name[0].toUpperCase()}
          </div>

          {open && (
            <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border border-neutral-300 dark:border-neutral-700">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {adminData.name}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {adminData.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) =>
            !link.dropdown ? (
              <Link
                key={idx}
                to={link.path}
                className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
              >
                {link.name}
              </Link>
            ) : (
              <div key={idx} className="relative group">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === idx ? null : idx)}
                  className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  {link.name} <FaChevronDown size={12} />
                </button>

                {dropdownOpen === idx && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-10 right-0 w-60 bg-white dark:bg-neutral-800 shadow-xl border border-neutral-300 dark:border-neutral-700 rounded-lg p-2 space-y-2"
                  >
                    {link.sections.map((section, secIdx) => (
                      <div key={secIdx}>
                        {section.type === "links" && (
                          <ul className="space-y-2">
                            {section.items.map((item, lIdx) => (
                              <li key={lIdx}>
                                <Link
                                  to={item.path}
                                  className="block p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                                  onClick={() => setDropdownOpen(null)}
                                >
                                  <div className="font-medium">{item.title}</div>
                                  <div className="text-sm opacity-70">{item.desc}</div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          <button
            onClick={logout}
            className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMobile}
          className="md:hidden text-2xl text-neutral-700 dark:text-neutral-300 z-50"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-lg border-r border-neutral-300 dark:border-neutral-800 transform transition-transform duration-300 ease-in-out z-40 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        ref={mobileRef}
      >
        <div className="p-5 flex flex-col h-full justify-between">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) =>
              !link.dropdown ? (
                <Link
                  key={idx}
                  to={link.path}
                  className="block py-2 text-lg text-neutral-700 dark:text-neutral-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <div key={idx}>
                  <button
                    onClick={() =>
                      setMobileDropdownOpen(mobileDropdownOpen === idx ? null : idx)
                    }
                    className="w-full flex justify-between items-center py-2 text-lg text-neutral-700 dark:text-neutral-200"
                  >
                    {link.name}
                    {mobileDropdownOpen === idx ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </button>

                  {mobileDropdownOpen === idx && (
                    <div className="ml-4 space-y-3">
                      {link.sections.map((section, sIdx) => (
                        <div key={sIdx}>
                          {section.type === "links" &&
                            section.items.map((item, iIdx) => (
                              <Link
                                key={iIdx}
                                to={item.path}
                                className="block py-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.title}
                              </Link>
                            ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {/* Logout Button Bottom */}
          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="w-full py-2 px-4 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;