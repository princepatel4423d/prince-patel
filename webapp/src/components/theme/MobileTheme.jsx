import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { MdWbSunny } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";

const MobileTheme = () => {
  const { setTheme, theme: currTheme } = useTheme();

  return (
    <div className="flex flex-1 items-end justify-center pt-5">
      <div className="flex overflow-hidden rounded-xl bg-neutral-100 text-2xl dark:bg-neutral-950">

        {/* Light Theme */}
        <button
          onClick={() => setTheme("light")}
          data-theme-light={currTheme === "light"}
          className={`p-4 ${
            currTheme === "light" ? "bg-neutral-300" : "dark:bg-neutral-900 dark:text-neutral-100"
          }`}
          title="Light Theme"
        >
          <MdWbSunny size={20} />
        </button>

        {/* System Theme */}
        <button
          onClick={() => setTheme("system")}
          data-theme-system={currTheme === "system"}
          className={`p-4 ${
            currTheme === "system"
              ? "bg-neutral-800 text-neutral-100"
              : "dark:bg-neutral-900 dark:text-neutral-100"
          }`}
          title="System Theme"
        >
          <FiMonitor size={20} />
        </button>

        {/* Dark Theme */}
        <button
          onClick={() => setTheme("dark")}
          data-theme-dark={currTheme === "dark"}
          className={`p-4 ${
            currTheme === "dark" ? "bg-neutral-800 text-neutral-100" : "dark:bg-neutral-900 dark:text-neutral-100"
          }`}
          title="Dark Theme"
        >
          <BsMoonStarsFill size={20} />
        </button>

      </div>
    </div>
  );
};

export default MobileTheme;