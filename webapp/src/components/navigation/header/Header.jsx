import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Search from "@/components/common/Search";
import DesktopTheme from "@/components/theme/DesktopTheme";
import MobileMenu from "./mobilemenu/MobileMenu";
import { FaProductHunt } from "react-icons/fa";
import { assets } from "@/assets/assets";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/project" },
  {
    name: "More",
    dropdown: true,
    sections: [
      {
        type: "cards",
        items: [
          {
            title: "Contact",
            desc: "Get in touch for collaborations, projects, or just say hello.",
            path: "/contact",
            image: assets.contactImage,
          },
          {
            title: "Milestone",
            desc: "Dreams and adventures that inspire my journey.",
            path: "/milestone",
            image: assets.Milestone,
          },
        ],
      },
      {
        type: "links",
        items: [
          { title: "Social Links", path: "/social-links", desc: "All my social links here" },
          { title: "Uses", path: "/uses", desc: "A peek into my digital..." },
          {
            title: "Attribution",
            path: "/attribution",
            desc: "Journey to create this site",
          },
        ],
      },
    ],
  },
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const liRef = useRef(null);

  const closeDropdown = () => setIsDropdownOpen(false);

  const isInsideMore =
    navLinks.find((l) => l.dropdown)?.sections.some((section) =>
      section.items.some((item) => currentPath.startsWith(item.path))
    ) || false;

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !liRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full p-1 border border-neutral-200 dark:border-neutral-700 rounded-l-4xl rounded-r-3xl dark:bg-neutral-900 shadow-md">
        <nav className="flex items-center justify-between w-full">

          {/* Logo */}
          <div className="flex items-center">
            <FaProductHunt className="text-neutral-900 dark:text-white" size={32} />
            <span className="text-xl font-semibold text-neutral-900 dark:text-white">
              RINCE <span className="font-medium text-neutral-600 dark:text-neutral-300">PATEL</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="flex-1 justify-center hidden md:flex">
            <ul className="flex gap-1 tablet:gap-6 relative">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  ref={link.dropdown ? liRef : null}
                  className="relative group flex items-center"
                  onMouseEnter={link.dropdown ? handleMouseEnter : undefined}
                  onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
                >
                  {!link.dropdown ? (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-2 py-1.5 rounded-xl transition-all duration-200 ${isActive
                          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-md"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 text-neutral-900 dark:text-neutral-100"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`px-2 py-1.5 rounded-xl transition-all duration-200 ${isInsideMore || isDropdownOpen
                          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-md"
                          : "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
                          }`}
                      >
                        {link.name}
                      </button>

                      {/* Dropdown */}
                      <div
                        ref={dropdownRef}
                        className={`absolute top-10 left-1/2 -translate-x-1/2 z-50 
                        bg-white dark:bg-neutral-900 shadow-xl border 
                        border-neutral-200 dark:border-neutral-700
                        rounded-2xl p-2 flex gap-3
                        transition-all duration-200 ease-out
                        ${isDropdownOpen
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                          }`}
                      >
                        {/* Left Cards */}
                        <div className="flex gap-4">
                          {link.sections[0].items.map((card) => (
                            <NavLink
                              key={card.path}
                              to={card.path}
                              onClick={closeDropdown}
                              className="bg-neutral-100 dark:bg-neutral-800 w-40
                              rounded-xl shadow-md overflow-hidden border border-transparent
                              transition-all duration-200 cursor-pointer group
                              hover:shadow-xl hover:-translate-y-[3px]
                              hover:border-neutral-300 dark:hover:border-neutral-700
                              hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                              <img
                                src={card.image}
                                className="w-full h-28 object-cover group-hover:scale-[1.05] transition-transform duration-200"
                              />
                              <div className="p-3">
                                <div className="font-semibold text-sm tracking-wide 
                                text-neutral-900 dark:text-neutral-100">
                                  {card.title}
                                </div>
                                <div className="text-xs leading-tight mt-0.5
                                text-neutral-700 dark:text-neutral-200">
                                  {card.desc}
                                </div>
                              </div>
                            </NavLink>
                          ))}
                        </div>

                        {/* Right Links */}
                        <div className="flex flex-col gap-3 min-w-40">
                          {link.sections[1].items.map((item) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={closeDropdown}
                              className="bg-neutral-100 dark:bg-neutral-800 px-4 py-3
                              rounded-xl shadow-md border border-transparent
                              transition-all duration-200 cursor-pointer
                              hover:shadow-lg hover:-translate-y-0.5
                              hover:border-neutral-300 dark:hover:border-neutral-600
                              hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                              <span className="font-semibold text-sm tracking-wide 
                              text-neutral-900 dark:text-neutral-100">
                                {item.title}
                              </span>
                              <span className="text-xs block leading-tight mt-0.5
                              text-neutral-700 dark:text-neutral-200">
                                {item.desc}
                              </span>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Search + Theme */}
          <div className="items-center gap-1 hidden md:flex">
            <Search />
            <DesktopTheme />
          </div>

          <div className="md:hidden flex items-center">
            <MobileMenu />
          </div>

        </nav>
      </header>

    </>
  );
};

export default Header;