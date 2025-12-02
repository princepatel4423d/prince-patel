import React from "react";
import { FaBook, FaPencilRuler } from "react-icons/fa";
import { assets } from "@/assets/assets";
import { SkillIcons } from '@/assets/Skills';

const HobbySkills = () => {
  return (
    <>
      {/* Hobby Box with Vertical Text and Image */}
      <div className="border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm w-[30%] overflow-hidden flex bg-white dark:bg-neutral-950">
        {/* Rotated Text on Left */}
        <div className="flex items-center justify-center w-10">
          <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap flex items-center gap-1 text-neutral-800 dark:text-white">
            <FaBook size={14} /> I love reading books
          </span>
        </div>

        {/* Image on Right */}
        <div className="flex-1">
          <img
            src={assets.bookImage}
            alt="books"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>

      {/* Skills Marquee Box */}
      <div className="p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm w-[70%] space-y-3 bg-white dark:bg-neutral-950">
        <div className="flex items-center gap-2 text-base font-medium text-neutral-800 dark:text-white">
          <FaPencilRuler size={14} /> Skills
        </div>

        {/* First Row - Left to Right */}
        <div className="relative overflow-hidden w-full h-8">
          <div className="absolute animate-marquee-left flex gap-4 items-center">
            {[...Object.entries(SkillIcons), ...Object.entries(SkillIcons)].map(
              ([name, icon], i) => (
                <img
                  key={`ltr-${name}-${i}`}
                  src={icon}
                  alt={name}
                  title={name}
                  className="h-6 w-auto"
                />
              )
            )}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative overflow-hidden w-full h-8">
          <div className="absolute animate-marquee-right flex gap-4 items-center">
            {[...Object.entries(SkillIcons), ...Object.entries(SkillIcons)].map(
              ([name, icon], i) => (
                <img
                  key={`rtl-${name}-${i}`}
                  src={icon}
                  alt={name}
                  title={name}
                  className="h-6 w-auto"
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HobbySkills;