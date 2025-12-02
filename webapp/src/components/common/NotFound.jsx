import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    className="
      flex flex-col items-center justify-center h-screen rounded-3xl
      bg-linear-to-br from-neutral-100 via-white to-white
      dark:from-neutral-900 dark:via-neutral-950 dark:to-black
    "
  >
    {/* Animated Icon */}
    <div className="mb-6 animate-bounce">
      <svg
        className="w-20 h-20 text-neutral-400 dark:text-neutral-600 drop-shadow-lg"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 19V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
        />
      </svg>
    </div>

    {/* Headline */}
    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100 drop-shadow-md">
      Page Not Found
    </h1>

    {/* Paragraph */}
    <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-lg text-center mb-8">
      Sorry, this page wasn’t found. It might have been removed, renamed, or moved elsewhere—check the URL, or explore other sections of the site. Let’s guide you back home and get your browsing back on track!
    </p>

    {/* Animated Button */}
    <Link to="/" className="inline-block">
      <button
        className="
          px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 animate-fade-in
          bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900
          dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white
          focus-visible:ring-2 focus:ring-neutral-400
        "
      >
        Go to Home
      </button>
    </Link>

    {/* Subtle fade-in animation */}
    <style>
      {`
        .animate-fade-in {
          animation: fadeIn 1.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96);}
          to { opacity: 1; transform: scale(1);}
        }
      `}
    </style>
  </div>
);

export default NotFound;
