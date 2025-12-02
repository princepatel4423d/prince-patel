import React, { useState } from 'react';
import { LiaBrainSolid } from "react-icons/lia";
import { RiArrowDownSLine } from "react-icons/ri";
import { SkillIcons } from '@/assets/Skills';
import skillsData from '@/assets/stack.json';

const Knowledge = () => {
  const [openCategory, setOpenCategory] = useState('Programming languages');
  const [showCaptions, setShowCaptions] = useState(true);

  const toggleCategory = (category) =>
    setOpenCategory(openCategory === category ? '' : category);

  return (
    <div className="py-14 transition-all duration-300">
      {/* Title */}
      <h2 className="flex items-center gap-2 text-3xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        <LiaBrainSolid size={32} /> Knowledge
      </h2>

      {/* Captions toggle */}
      <div className="border-b border-neutral-300 dark:border-neutral-700 mb-6 pb-4">
        <div className="mt-4 text-base transition-opacity duration-300 text-neutral-600 dark:text-neutral-400">
          These icons represent languages and tools I’ve worked with. Click on a section to explore.
        </div>
      </div>

      {/* Categories */}
      {Object.entries(skillsData).map(([category, items], index) => (
        <div key={category} className="mb-6 transition-all duration-300">
          {/* Header */}
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex justify-between items-center text-left text-xl font-normal cursor-pointer text-neutral-900 dark:text-neutral-100"
          >
            <span>{category}</span>
            <span
              className={`transition-transform duration-300 ${openCategory === category ? 'rotate-180' : ''
                }`}
            >
              <RiArrowDownSLine size={20} />
            </span>
          </button>

          {/* Skills (animated) */}
          <div
            className={`transition-all duration-500 overflow-hidden ${openCategory === category
                ? 'max-h-[500px] opacity-100 mt-4'
                : 'max-h-0 opacity-0'
              }`}
          >
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => {
                const Icon = SkillIcons[skill.icon];
                return (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-full text-sm shadow-sm transition-all duration-200 transform bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 ${skill.faded ? 'opacity-50' : 'hover:opacity-100'
                      }`}
                  >
                    {Icon ? (
                      <img src={Icon} alt={skill.name} className="w-5 h-5" />
                    ) : (
                      <span className="w-5 h-5 bg-gray-200 dark:bg-neutral-700 rounded-full" />
                    )}
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          {index !== Object.keys(skillsData).length - 1 && (
            <hr className="mt-6 border-t border-neutral-300 dark:border-neutral-700" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Knowledge;