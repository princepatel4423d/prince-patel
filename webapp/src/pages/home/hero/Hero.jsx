import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { Typewriter } from "./TypeWriter";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";
import { DarkButton, LightButton } from "@/components/ui/Button";

const Hero = () => {
    return (
        <section className="max-h-screen flex items-center justify-center text-center py-12 md:py-16">
            <div>
                <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400">
                    The Portfolio
                </p>
                {/* Heading */}
                <h1 className="font-playfair leading-normal text-4xl sm:text-6xl md:text-7xl font-light text-neutral-900 dark:text-white">
                    I&apos;m <span className="bg-linear-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text italic font-normal font-playfair">Prince</span>
                    <span className="inline-block border-3 border-black dark:border-neutral-100 rounded-full shadow-md align-middle mx-2 overflow-hidden">
                        <img
                            src={assets.heroImage}
                            alt="Prince"
                            className="sm:w-28 sm:h-14 w-20 h-10 object-cover"
                        />
                    </span>
                    ,<br />
                    a passionate
                    <span className="inline-block border-3 border-black dark:border-neutral-100 rounded-full shadow-md align-middle mx-2 overflow-hidden">
                        <img
                            src={assets.developmentImage}
                            alt="developer"
                            className="sm:w-28 sm:h-14 w-20 h-10 object-cover"
                        />
                    </span>
                    <span className="bg-linear-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text italic font-normal font-playfair">Web Developer</span><br />
                    based in India
                    <span className="inline-block border-3 border-black dark:border-neutral-100 rounded-full shadow-md align-middle mx-2 overflow-hidden">
                        <img
                            src={assets.indiaImage}
                            alt="india"
                            className="sm:w-28 sm:h-14 w-20 h-10 object-cover"
                        />
                    </span>
                </h1>

                <div className="mt-4 text-black dark:text-white">
                    <Typewriter
                        words={['Full Stack Developer', 'Open Source Enthusiast', 'MERN Stack Lover', 'JavaScript Aficionado']}
                        loop={true}
                        cursor={true}
                        speed={70}
                        delay={1500}
                    />
                </div>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-6 max-w-xl mx-auto">
                    A frontend developer passionate about creating accessible, high-performance websites for modern brands and startups.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/cv">
                        <DarkButton>
                            <FiFileText size={18} weight="duotone" /> Read CV
                        </DarkButton>
                    </Link>
                    <Link to="/project">
                        <LightButton>
                            <FaBriefcase size={18} weight="duotone" /> Projects
                        </LightButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;