import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineQuestionCircle,
  AiOutlineFileText,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const defaultLinks = {
  Navigation: [
    { name: "Home", path: "/", icon: <AiOutlineHome size={18} /> },
    { name: "About", path: "/about", icon: <AiOutlineInfoCircle size={18} /> },
    { name: "Contact", path: "/contact", icon: <AiOutlinePhone size={18} /> },
    { name: "Help", path: "/help", icon: <AiOutlineQuestionCircle size={18} /> },
  ],
  Legal: [
    { name: "Privacy Policy", path: "/privacy-policy", icon: <AiOutlineFileText size={18} /> },
    { name: "Terms & Condition", path: "/terms-condition", icon: <AiOutlineCheckCircle size={18} /> },
  ],
  Theme: [
    { name: "Light Mode", path: "/theme/light", icon: <FiSun size={18} /> },
    { name: "Dark Mode", path: "/theme/dark", icon: <FiMoon size={18} /> },
    { name: "System Theme", path: "/theme/system", icon: <FiMonitor size={18} /> },
  ],
  Website: [
    { name: "Blog", path: "/blog", icon: <AiOutlineFileText size={18} /> },
    { name: "Projects", path: "/projects", icon: <AiOutlineFileText size={18} /> },
    { name: "Services", path: "/services", icon: <AiOutlineFileText size={18} /> },
  ],
};

const flattenLinks = () => {
  const arr = [];
  Object.entries(defaultLinks).forEach(([category, links]) => {
    links.forEach((link) => arr.push({ ...link, category }));
  });
  return arr;
};

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState(flattenLinks());
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const websiteSearchRef = useRef(null);

  const allLinks = flattenLinks();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setIsOpen(false);
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && websiteSearchRef.current) {
      websiteSearchRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredLinks(allLinks);
    } else {
      setFilteredLinks(
        allLinks.filter((link) =>
          link.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  return (
    <>
      {/* Top search bar */}
      <form
        className="
    flex items-center
    bg-white dark:bg-neutral-900
    rounded-xl border border-neutral-200 dark:border-neutral-700
    py-1 px-2 w-full max-w-full sm:max-w-xs"
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Site search"
      >
        <IoIosSearch size={24} className="mr-2 text-neutral-700 dark:text-neutral-300" />

        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="
      bg-transparent outline-none
      text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-40 flex-1 sm:w-16"
          aria-label="Search"
          onFocus={() => setIsOpen(true)}
        />

        {/* ✅ Hide shortcut button on mobile */}
        <span
          className="hidden sm:inline
      px-2 py-1 text-xs rounded-lg
      bg-neutral-100 dark:bg-neutral-700
      text-black dark:text-white font-mono"
        >
          ctrl k
        </span>
      </form>

      {isOpen &&
        createPortal(
          <>
            {/* Overlay Black */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>

            {/* ✅ Fully Responsive Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
              <div
                ref={searchRef}
                className="bg-white dark:bg-neutral-900 w-full max-w-lg sm:max-w-xl max-h-[80vh] rounded-xl shadow-lg p-4 sm:p-6 overflow-y-auto border border-neutral-200 dark:border-neutral-800"
              >
                {/* Popup Input */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-center w-full px-2 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 mb-3 bg-neutral-50 dark:bg-neutral-800"
                >
                  <IoIosSearch size={24} className="mr-2 text-neutral-500 dark:text-neutral-400" />
                  <input
                    ref={websiteSearchRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the website..."
                    className="outline-none flex-1 text-neutral-900 dark:text-white bg-transparent text-sm sm:text-base"
                  />
                  <span className="px-2 py-1 text-xs rounded-lg bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white font-mono">
                    esc
                  </span>
                </form>

                {/* Results */}
                {filteredLinks.length > 0 ? (
                  Object.entries(
                    filteredLinks.reduce((acc, link) => {
                      (acc[link.category] = acc[link.category] || []).push(link);
                      return acc;
                    }, {})
                  ).map(([category, links]) => (
                    <div key={category} className="mb-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-neutral-400 mb-2">
                        {category}
                      </h3>
                      {links.map(({ name, path, icon }) => (
                        <Link
                          key={name}
                          to={path}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-3 py-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition text-sm text-gray-800 dark:text-neutral-200"
                        >
                          <span className="mr-2">{icon}</span>
                          {name}
                        </Link>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-neutral-500 mt-4">
                    No results found for "{query}"
                  </p>
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default Search;