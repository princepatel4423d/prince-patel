import React from "react";
import { Link } from "react-router-dom";
import MagneticButton from "@/components/ui/Button";

const Banner = () => {
    return (
        <section className="relative py-8 md:py-12 flex flex-col items-center justify-center overflow-hidden">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl font-light text-center mb-6 leading-tight text-neutral-900 dark:text-neutral-100">
                FROM CONCEPT TO <span className="font-bold">CREATION</span><br />
                LET&apos;S MAKE IT <span className="font-bold">HAPPEN!</span>
            </h1>

            {/* Rotating "OPEN TO WORK" Circle */}
            <div className="absolute right-6 top-8 hidden md:block">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* SVG for ring and circular text */}
                    <svg
                        className="absolute inset-0 rounded-full w-full h-full rotate-circle"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="M48,8 a40,40 0 1,1 0,80 a40,40 0 1,1 0,-80"
                            />
                        </defs>
                        {/* Circular text */}
                        <text
                            className="fill-neutral-900 dark:fill-neutral-100 transition-colors duration-300"
                            fontSize="14"
                            fontWeight="bold"
                            letterSpacing="3"
                        >
                            <textPath
                                xlinkHref="#circlePath"
                                startOffset="0%"
                                textLength="255"
                                lengthAdjust="spacingAndGlyphs"
                            >
                                OPEN TO WORK · OPEN TO WORK ·
                            </textPath>
                        </text>
                    </svg>

                    {/* Center star, always upright */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 32 32"
                            className="text-neutral-900 dark:text-neutral-100 transition-colors duration-300"
                            fill="currentColor"
                        >
                            <path d="M16 4 L18.5 14 H29 L20 18.5 L22.5 28 L16 22 L9.5 28 L12 18.5 L3 14 H13.5 Z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Button */}
            <Link to="/contact">
                <MagneticButton strength={0.8} maxOffset={80}>Get In Touch</MagneticButton>
            </Link>

            {/* Availability and About */}
            <div className="max-w-xl mx-auto mt-6 text-center">
                <p className="text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                    I&apos;m available for full-time roles &amp; freelance projects.
                </p>
                <p className="text-base text-neutral-600 dark:text-neutral-300">
                    I thrive on crafting dynamic web applications,<br />
                    and delivering seamless user experiences.
                </p>
            </div>
        </section>
    );
};

export default Banner;