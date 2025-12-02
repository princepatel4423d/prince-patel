import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { getIcon } from "@/utils/iconHelper";

const SocialMedia = ({ section = "multimedia" }) => {
  const { backendUrl } = useContext(AppContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/social/all`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const filtered = data.data.filter(
            (item) =>
              item.isActive &&
              item.sections.includes(section)
          );

          setLinks(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch social links:", error);
      }
    };

    fetchSocialLinks();
  }, [backendUrl, section]);

  const smallLinks = links.slice(0, 4);
  const largeLink = links[4];

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      {/* Left: 2x2 small boxes */}
      <div className="grid grid-cols-4 md:grid-cols-2 gap-2 w-full md:w-[50%]">
        {smallLinks.map((link, idx) => {
          const Icon = getIcon(link.icon);
          return (
            <a
              key={link._id || idx}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white p-2 rounded-lg border border-neutral-100 dark:border-neutral-900 shadow flex flex-col items-start justify-center space-y-1 hover:scale-95 transition duration-500"
            >
              {Icon && <Icon size={20} />}
              <span className="text-sm font-semibold">{link.platform}</span>
              {link.description && <p className="text-xs line-clamp-2">{link.description}</p>}
            </a>
          );
        })}
      </div>

      {/* Right: large box */}
      {largeLink && (
        <a
          href={largeLink.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative text-black dark:text-white w-full md:w-[60%] p-4 rounded-lg border border-neutral-100 dark:border-neutral-900 shadow flex flex-col justify-end space-y-2 hover:scale-95 transition duration-500"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 backdrop-blur-xs" />

          {/* Content */}
          <div className="relative z-10 flex flex-col">
            {(() => {
              const LargeIcon = getIcon(largeLink.icon);
              return LargeIcon ? <LargeIcon size={24} /> : null;
            })()}
            <span className="text-base font-semibold">{largeLink.platform}</span>
            {largeLink.username && <p className="text-xs">{largeLink.username}</p>}
            {largeLink.description && <p className="text-xs">{largeLink.description}</p>}
          </div>
        </a>
      )}
    </div>
  );
};

export default SocialMedia;