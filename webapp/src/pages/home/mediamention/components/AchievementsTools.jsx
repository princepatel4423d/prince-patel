import React from "react";
import { FaTrophy, FaJs } from "react-icons/fa6";

const AchievementsTools = () => {
  return (
    // Force row on all screen sizes
    <div className="flex flex-row gap-4">
      {/* Achievements */}
      <div className="flex-1 p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm space-y-2">
        <h3 className="flex items-center text-base font-medium gap-2 text-neutral-800 dark:text-white">
          <FaTrophy size={18} /> Achievements
        </h3>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 list-disc pl-4 space-y-1">
          <li>Completed 100+ freelance tasks</li>
          <li>Built a MERN blog app</li>
          <li>Top 5% on HackerRank</li>
        </ul>
      </div>

      {/* Tools */}
      <div className="flex-1 p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm space-y-2">
        <h3 className="flex items-center text-base font-medium gap-2 text-neutral-800 dark:text-white">
          <FaJs size={18} /> Tools
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          React, Node.js, MongoDB, Tailwind CSS, Git, VS Code
        </p>
      </div>
    </div>
  );
};

export default AchievementsTools;