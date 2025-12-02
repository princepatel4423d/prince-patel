import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { getIcon } from "@/utils/iconHelper";

const FooterSocial = () => {
  const { backendUrl } = useContext(AppContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/social/all`);
        const data = await res.json();

        if (data.success) {
          const filtered = data.data.filter(
            (item) => item.isActive && item.sections.includes("footer")
          );
          setLinks(filtered);
        }
      } catch (err) {
        console.error("Error loading social links:", err);
      }
    };

    fetchSocial();
  }, [backendUrl]);

  return (
    <>
      {links.map((item) => {
        const Icon = getIcon(item.icon);

        if (!Icon) return null;

        return (
          <a
            key={item._id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.platform}
            className="relative group"
          >
            <Icon
              size={24}
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            />

            {/* Tooltip */}
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
              opacity-0 group-hover:opacity-100 transition-all pointer-events-none
              bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black 
              text-sm px-3 py-2 rounded-xl shadow z-10 whitespace-nowrap"
            >
              {item.platform}
            </span>
          </a>
        );
      })}
    </>
  );
};

export default FooterSocial;