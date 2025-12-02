import React, { useState, useEffect } from "react";
import { FaHashtag, FaWrench } from "react-icons/fa6";
import { assets } from "@/assets/assets";

const GitHubDiscord = () => {
  const username = "princepatel4423d";
  const [stats, setStats] = useState({ stars: 0, followers: 0, repos: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();

      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const repos = await reposRes.json();
      const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

      setStats({ stars, followers: userData.followers, repos: repos.length });
    };

    fetchStats();
  }, [username]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Row: GitHub (80%) + Discord (20%) */}
      <div className="flex w-full gap-4">
        {/* GitHub Contributions - 80% */}
        <div className="w-[80%] border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm p-2 space-y-3 bg-white dark:bg-neutral-950">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-white">
            <FaHashtag size={18} /> GitHub Contributions
          </div>
          <img
            src="https://ghchart.rshah.org/princepatel4423d"
            alt="GitHub contributions"
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="flex justify-between text-sm font-normal text-neutral-700 dark:text-neutral-300">
            <span>Stars: {stats.stars}</span>
            <span>Followers: {stats.followers}</span>
            <span>Repos: {stats.repos}</span>
          </div>
        </div>

        {/* Discord - 20% */}
        <div className="w-[20%] border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm p-2 flex items-center justify-center bg-white dark:bg-neutral-950">
          <div className="-rotate-12 text-center">
            <p className="text-xl font-semibold text-neutral-800 dark:text-white">discord</p>
            <p className="text-xs text-neutral-700 dark:text-neutral-300">(@princep4423d)</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Actively engaging in developer communities on Discord.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Under Construction */}
      <div className="w-full h-14 relative border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm overflow-hidden">
        <img
          src={assets.underConstructionImage}
          alt="Under Construction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="flex items-center gap-2 text-xl text-white font-medium">
            <FaWrench size={24} /> Under Construction
          </p>
        </div>
      </div>
    </div>
  );
};

export default GitHubDiscord;