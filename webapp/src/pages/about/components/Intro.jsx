import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '@/assets/assets';
import { GoDownload } from "react-icons/go";
import { GrayButton } from '@/components/ui/Button';

const Intro = () => {
  return (
    <section className="flex flex-col md:flex-row gap-8 py-12">
      {/* Left Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={assets.aboutImage}
            alt="Prince Patel"
            className="w-16 h-16 rounded-full object-cover shadow-sm dark:shadow-neutral-700"
          />
          <div>
            <h2 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Prince Patel
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Full Stack Web Developer
            </p>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-100">
          Hi, I’m{" "}
          <span className="bg-linear-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text font-playfair italic">
            Prince
          </span>
          : <br /> Web Designer & Developer
        </h1>

        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
          I create custom websites that blend creativity and functionality, using Framer and Webflow
          to craft unique digital experiences for each client.
        </p>

        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-xl mb-3">
          <strong>Self-taught</strong> full-stack. I have knowledge in{" "}
          <span className="text-neutral-950 dark:text-neutral-100">ReactJS</span> and{" "}
          <span className="text-neutral-950 dark:text-neutral-100">NextJS</span> on the Front-end,{" "}
          <span className="text-neutral-950 dark:text-neutral-100">Nest.js</span> and{" "}
          <span className="text-neutral-950 dark:text-neutral-100">Express.js</span> on the Back-end, and{" "}
          <span className="text-neutral-950 dark:text-neutral-100">React-native/Expo</span> on Mobile with a focus on Android.
          My main stack is around <span className="text-neutral-950 dark:text-neutral-100">JavaScript</span>, primarily{" "}
          <span className="text-neutral-950 dark:text-neutral-100">Typescript</span>.
        </p>

        <div className="flex justify-start gap-4 items-center">
          <GrayButton
            as="a"
            target="_blank"
            href={assets.resume}
            className="hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            Download CV <GoDownload size={18} />
          </GrayButton>
          <Link
            className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition cursor-pointer"
            to="/cv"
          >
            read.cv ↗
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src={assets.aboutImage}
          alt="Prince Patel"
          className="rounded-lg w-full max-w-sm shadow-lg dark:shadow-neutral-700"
        />
      </div>
    </section>
  );
};

export default Intro;