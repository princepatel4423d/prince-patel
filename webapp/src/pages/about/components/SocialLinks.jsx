import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { getIcon } from "@/utils/iconHelper";

const SocialLinks = () => {
  const { backendUrl } = useContext(AppContext);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/social/all`);
        const data = await res.json();
        if (data.success) setSocialLinks(data.data.filter(link => link.isActive));
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      }
    };
    fetchSocialLinks();
  }, [backendUrl]);

  return (
    <section className="py-14 transition-colors duration-300">
      <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-2xl md:text-3xl font-medium mb-12 text-neutral-900 dark:text-neutral-100">
        Connect with me..
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {socialLinks.map((link) => {
          const Icon = getIcon(link.icon);

          return (
            <a
              key={link._id}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`backdrop-blur-md rounded-2xl border border-neutral-100 dark:border-neutral-900 text-black dark:text-white p-3 shadow-xl hover:scale-105 transform transition-all duration-500`}
            >
              <div className="flex items-center gap-4 mb-2">
                {Icon && <Icon size={28} />}
                <div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold">{link.platform}</h3>
                  <p className="text-xs sm:text-sm md:text-base">{link.username}</p>
                </div>
              </div>
              {link.description && (
                <p className="text-xs sm:text-sm md:text-base">{link.description}</p>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SocialLinks;
