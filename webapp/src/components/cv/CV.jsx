import React from "react";
import { assets } from "@/assets/assets";

const CV = () => {
    return (
        <div className="min-h-screen border rounded-xl p-6 font-sans bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-500 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="space-y-6">
                    <div className="text-4xl font-bold leading-tight tracking-tight">
                        <h1>Prince Patel</h1>
                    </div>

                    <div className="space-y-1 text-sm">
                        <p><span className="font-semibold">Phone:</span> +91 9998401922</p>
                        <p><span className="font-semibold">Instagram:</span> @princep_4423</p>
                        <p><span className="font-semibold">Email:</span> princep4423d@gmail.com</p>
                        <p><span className="font-semibold">LinkedIn:</span> linkedin.com/in/princep4423d</p>
                        <p><span className="font-semibold">GitHub:</span> github.com/princepatel4423d</p>
                    </div>

                    <h2 className="text-3xl font-bold mt-10 leading-snug text-primary-600 dark:text-primary-300 drop-shadow-md">
                        Full Stack Developer /<br />MERN Specialist /<br />Coding Enthusiast
                    </h2>

                    <div className="mt-8">
                        <img
                            src={assets.aboutImage}
                            alt="Profile"
                            className="rounded-md w-full max-w-xs"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="space-y-10">
                    <section>
                        <h3 className="text-lg font-semibold border-b border-neutral-400 dark:border-neutral-600 pb-1 uppercase tracking-wider">
                            Personal
                        </h3>
                        <p className="text-sm pt-2 leading-relaxed italic text-neutral-700 dark:text-neutral-200">
                            Hey, I'm Prince — a passionate developer with a love for crafting modern web applications using the MERN stack. I enjoy building full-stack projects that solve real-world problems and push my creativity and logic. I'm also deeply interested in UI/UX, scalable backend systems, and building personal tools. Let's connect and collaborate!
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold border-b border-neutral-400 dark:border-neutral-600 pb-1 uppercase tracking-wider">
                            Experience
                        </h3>
                        <ul className="text-sm space-y-2 pt-2 list-disc list-inside">
                            <li><strong>Freelance Web Developer</strong> — Ongoing</li>
                            <li><strong>Personal Portfolio & Admin Panel</strong> — Built with React, Tailwind, Vite, Node.js, MongoDB</li>
                            <li><strong>PG/Hostel Finder App</strong> — MERN stack-based real-time application (conceptualized)</li>
                            <li><strong>Guestbook Application</strong> — React + Google OAuth backend implementation</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold border-b border-neutral-400 dark:border-neutral-600 pb-1 uppercase tracking-wider">
                            Education
                        </h3>
                        <ul className="text-sm space-y-2 pt-2 list-disc list-inside">
                            <li><strong>Bachelor's in Computer Science</strong>, Ganpat University, Mehsana</li>
                            <li><strong>Higher Secondary</strong>, M.Y High School, Dahod</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold border-b border-neutral-400 dark:border-neutral-600 pb-1 uppercase tracking-wider">
                            Skills <span className="text-xs font-normal">(Technical &mdash; Soft)</span>
                        </h3>
                        <div className="grid grid-cols-2 text-sm pt-2 gap-2">
                            <ul className="space-y-1 list-disc list-inside">
                                <li>HTML, CSS, JavaScript</li>
                                <li>React, Vite, Tailwind</li>
                                <li>Node.js, Express.js</li>
                                <li>MongoDB, Mongoose</li>
                                <li>JWT Auth (Admin/User)</li>
                                <li>REST APIs</li>
                                <li>Axios, Postman</li>
                                <li>Git, GitHub</li>
                                <li>Framer Motion</li>
                            </ul>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Problem Solving</li>
                                <li>Creativity</li>
                                <li>Attention to Detail</li>
                                <li>Time Management</li>
                                <li>Adaptability</li>
                                <li>Teamwork</li>
                                <li>Learning Agility</li>
                                <li>Ownership</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold border-b border-neutral-400 dark:border-neutral-600 pb-1 uppercase tracking-wider">
                            Languages
                        </h3>
                        <ul className="text-sm pt-2 list-disc list-inside">
                            <li>English — ⭐⭐⭐⭐⭐</li>
                            <li>Hindi — ⭐⭐⭐⭐⭐</li>
                            <li>Gujarati — ⭐⭐⭐⭐</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CV;