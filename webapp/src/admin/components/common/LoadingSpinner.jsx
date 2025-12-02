// LoadingSpinner.jsx

import React from "react";
import { FiLoader } from "react-icons/fi";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-40 w-40 mx-auto">
    <FiLoader
      className="animate-spin-slow text-gray-400"
      size={64}
      aria-label="Loading"
    />
    <p className="text-md text-gray-500 mt-4">Loading, please wait…</p>
    <style>
      {`
        .animate-spin-slow {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default LoadingSpinner;