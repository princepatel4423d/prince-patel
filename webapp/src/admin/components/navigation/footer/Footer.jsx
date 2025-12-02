import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 rounded-2xl">
      <div className="p-3 flex flex-col md:flex-row items-center justify-between text-neutral-600 dark:text-neutral-400 text-sm">
        
        {/* Left - Copyright */}
        <p className="text-center md:text-left">
          &#169; {new Date().getFullYear()} Prince Admin Dashboard. All rights reserved.
        </p>

        {/* Right - Small Links */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <a
            href="https://github.com/princepatel4423d?ref=princepatel.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;