import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { IoCloseCircle } from "react-icons/io5";
import { FiMenu, FiHome, FiTarget } from "react-icons/fi";
import { FaRegIdBadge, FaRegFile, FaGithub, FaRegCopyright } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

import Search from "@/components/common/Search";
import MobileTheme from "@/components/theme/MobileTheme";

const itemBase =
  "flex items-center gap-7 px-7 py-4 leading-none transition-colors duration-200";

const menuItemStyles = `${itemBase} 
text-neutral-900 dark:text-neutral-200
active:bg-neutral-200 dark:active:bg-neutral-900`;

const MenuLink = ({ name, icon: Icon, path, onClick }) => (
  <RouterLink to={path} onClick={onClick} className={menuItemStyles}>
    <Icon className="text-xl" />
    <span>{name}</span>
  </RouterLink>
);

const ExternalLink = ({ name, icon: Icon, path, rel }) => (
  <a
    href={path}
    rel={rel}
    target="_blank"
    className={menuItemStyles}
  >
    <Icon className="text-xl" />
    <span className="flex items-end gap-px">
      {name}
      <HiOutlineArrowUpRight className="text-lg" />
    </span>
  </a>
);

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleSearchInteract = () => {
    closeMenu();
    setTimeout(() => {
      const el = document.querySelector('input[type="search"]');
      if (el) el.focus();
    }, 80);
  };

  const navLinks = [
    { name: "Home", icon: FiHome, path: "/" },
    { name: "About", icon: FaRegIdBadge, path: "/about" },
    { name: "Blog", icon: TbNotes, path: "/blog" },
    { name: "Projects", icon: MdWorkOutline, path: "/project" },
    { name: "Contact", icon: AiOutlineSend, path: "/contact" },
    { name: "Milestone", icon: FiTarget, path: "/milestone" },
    { name: "Attribution", icon: FaRegCopyright, path: "/attribution" },
  ];

  const externalLinks = [
    {
      name: "LICENSE",
      icon: FaRegFile,
      rel: "license",
      path: "https://github.com/princepatel4423d/my-portfolio/blob/main/LICENSE",
    },
    {
      name: "Github",
      icon: FaGithub,
      rel: "external",
      path: "https://github.com/princepatel4423d",
    },
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        className="px-2 md:hidden text-neutral-900 dark:text-neutral-200"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-black/30 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 w-3/4 max-w-xs transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative flex h-dvh w-full">

          {/* Close Button */}
          <button
            aria-label="Close menu"
            onClick={closeMenu}
            className="absolute left-3 top-3 rounded-full p-2 backdrop-blur-lg
            text-neutral-700 dark:text-neutral-200
            active:bg-red-300/20 active:text-red-500
            dark:active:bg-red-400/10 dark:active:text-red-400"
          >
            <IoCloseCircle className="text-2xl" />
          </button>

          {/* Menu Content */}
          <nav
            className="flex flex-1 flex-col overflow-y-scroll rounded-bl-4xl rounded-tl-4xl
            bg-neutral-100 dark:bg-neutral-950 text-xl pb-4"
          >
            {/* Search */}
            <div
              className="px-6 pt-14 pb-4"
              onClickCapture={handleSearchInteract}
              onFocusCapture={handleSearchInteract}
            >
              <Search />
            </div>

            {/* Internal Links */}
            <div>
              {navLinks.map((item) => (
                <MenuLink key={item.path} {...item} onClick={closeMenu} />
              ))}
            </div>

            {/* External Links */}
            <div>
              {externalLinks.map((item) => (
                <ExternalLink key={item.path} {...item} />
              ))}
            </div>

            {/* Theme Toggle */}
            <MobileTheme />
          </nav>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;