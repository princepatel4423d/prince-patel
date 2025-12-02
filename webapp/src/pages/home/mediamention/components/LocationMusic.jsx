import React from 'react';
import { FaMapMarkerAlt, FaMusic } from 'react-icons/fa';
import { assets } from '@/assets/assets';

const LocationMusic = () => {
  return (
    <>
      {/* Location Box */}
      <div className="p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm basis-1/2 space-y-2 bg-white dark:bg-neutral-950">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-white">
          <FaMapMarkerAlt size={20} /> Location
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">Idar, Gujarat</p>
        <div className="w-full rounded-md overflow-hidden">
          <iframe
            title="Idar, Gujarat Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29195.84150472591!2d72.98727036398597!3d23.837076631095044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395da3f1254ee4cf%3A0x1bf54521f9c2e2b6!2sIdar%2C%20Gujarat%20383430!5e0!3m2!1sen!2sin!4v1753419261661!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Music Box */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://last.fm/user/princep4423d"
        className="relative p-2 rounded-lg shadow-sm basis-1/2 overflow-hidden border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 hover:scale-95 transition duration-500"
      >
        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col space-y-1 max-w-1/2 text-neutral-800 dark:text-white">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaMusic size={20} /> Alone
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Top listened track this month</p>
          </div>
          <img
            src={assets.songImage}
            alt="Album Art"
            className="w-1/2 h-1/2 object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 z-10 relative">
          "This track captures the feeling of being completely immersed in your own world — when the noise fades, and the music speaks directly to your soul."
        </p>
      </a>
    </>
  );
};

export default LocationMusic;