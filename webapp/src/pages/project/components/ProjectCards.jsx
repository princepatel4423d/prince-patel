import React, { useContext } from "react";
import { FiGithub } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import { AppContext } from "@/context/AppContext";
import { BlueButton, GrayButton } from "@/components/ui/Button";
import { formatDate } from "@/utils/formatDate";
import { getIcon } from "@/utils/iconHelper";

const ProjectCards = ({ project, type }) => {
  const { backendUrl } = useContext(AppContext);

  // ---------------- IMAGE ----------------
  const imageUrl = project.image?.url || project.imageUrl || "";
  const getImage = () =>
    !imageUrl
      ? ""
      : imageUrl.startsWith("http")
        ? imageUrl
        : `${backendUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

  // ---------------- STACK ICONS ----------------
  const stack = Array.isArray(project.stackIcon) ? project.stackIcon : [];

  // ---------------- TAGS & LINKS ----------------
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const source = project.sourceUrl || "";
  const demo = project.demoUrl || "";

  // ------------------ RENDER ICON ----------------
  const renderIcon = (iconName) => {
    const IconComp = getIcon(iconName);
    if (!IconComp) return null;
    return <IconComp className="text-xl text-neutral-700 dark:text-neutral-300" />;
  };

  // ================= BIG PROJECT =================
  if (type === "big") {
    return (
      <div className="flex flex-col rounded-4xl shadow-lg border border-neutral-100 dark:border-neutral-900 overflow-hidden mb-6 bg-white dark:bg-neutral-900 transition-shadow hover:shadow-xl w-full max-w-2xl">
        {getImage() && (
          <img
            src={getImage()}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-4xl"
            loading="lazy"
          />
        )}

        <div className="flex flex-col grow p-6">
          <div className="flex flex-col grow">
            <h3 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              {formatDate(project.date)}
            </p>

            {/* STACK ICONS */}
            {stack.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {stack.map((iconName, i) => (
                  <div
                    key={i}
                    title={iconName}
                  >
                    {renderIcon(iconName)}
                  </div>
                ))}
              </div>
            )}

            {/* DESCRIPTION */}
            <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed">
              {project.description}
            </p>

            {/* TAGS */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-6 mt-4">
            {source && (
              <GrayButton as="a" href={source} target="_blank">
                <FiGithub size={16} />
                Source
              </GrayButton>
            )}
            {demo && (
              <BlueButton as="a" href={demo} target="_blank">
                <FaLink size={16} />
                Demo
              </BlueButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  // SMALL PROJECT 
  return (
    <div className="flex flex-col rounded-3xl shadow-md overflow-hidden p-6 border border-neutral-100 dark:border-neutral-900 mb-6 bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow max-w-sm h-full">
      <div className="flex flex-col grow">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
          {formatDate(project.date)}
        </p>

        {/* STACK ICONS */}
        {stack.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {stack.map((iconName, i) => (
              <div
                key={i}
                title={iconName}
              >
                {renderIcon(iconName)}
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 select-none"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-3">
        {source && (
          <GrayButton as="a" href={source} target="_blank">
            <FiGithub size={16} />
            Source
          </GrayButton>
        )}
        {demo && (
          <BlueButton as="a" href={demo} target="_blank">
            <FaLink size={16} />
            Demo
          </BlueButton>
        )}
      </div>
    </div>
  );
};

export default ProjectCards;