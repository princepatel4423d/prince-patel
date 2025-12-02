import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GiCoffeeCup } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { LuGitFork } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { PiHouseLine } from "react-icons/pi";
import { assets } from "@/assets/assets";
import { GrayButton } from "@/components/ui/Button";
import { AppContext } from "@/context/AppContext";
import { getIcon } from "@/utils/iconHelper";

const ProfileCard = ({ username, totals }) => {
  const { backendUrl } = useContext(AppContext);

  // 🔥 Dynamic socials (only this part added)
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/social/all`);
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          const filtered = data.data.filter(
            (item) => item.isActive && item.sections.includes("profile")
          );
          setSocials(filtered);
        }
      } catch (error) {
        console.error("Failed to load socials:", error);
      }
    };

    fetchSocialLinks();
  }, [backendUrl]);

  return (
    <div className="w-full space-y-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-lg transition-all text-neutral-800 dark:text-neutral-200">

      {/* Header */}
      <header className="flex justify-between items-center text-lg font-semibold">
        <div className="flex items-center gap-2">
          <GiCoffeeCup size={22} className="text-neutral-700 dark:text-neutral-300" />
          <span>Currently making...</span>
        </div>

        <Link
          to="/projects"
          className="text-sm underline text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
        >
          See projects
        </Link>
      </header>

      {/* Profile Card */}
      <div className="space-y-4 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 transition">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-bold text-lg text-neutral-800 dark:text-neutral-200">
              {username}
            </div>

            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Today is:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* 🔥 Dynamic Social Icon (only change done here) */}
          <div className="flex gap-3">
            {socials.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                >
                  {Icon && <Icon size={22} className="text-neutral-700 dark:text-neutral-300" />}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <PiHouseLine className="text-neutral-700 dark:text-neutral-300" size={20} />
          <span>
            My corner of internet — Personal Homepage & Portfolio.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <CiStar size={18} className="text-neutral-700 dark:text-neutral-300" />
            <span className="font-medium">{totals.stars}</span>
          </div>

          <div className="flex items-center gap-1">
            <LuGitFork size={18} className="text-neutral-700 dark:text-neutral-300" />
            <span className="font-medium">{totals.forks}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center">
        <GrayButton
          as="a"
          target="_blank"
          href={assets.resume}
          className="flex items-center gap-2"
        >
          Download CV
          <FiDownload size={18} className="text-neutral-700 dark:text-neutral-300" />
        </GrayButton>

        <Link
          to="/cv"
          className="flex items-center gap-1 text-sm underline text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
        >
          <span>read.cv</span>
          <MdArrowOutward size={15} className="text-neutral-700 dark:text-neutral-300" />
        </Link>
      </div>

    </div>
  );
};

export default ProfileCard;