import React from "react";
import { SkillIcons } from "@/assets/Skills";
import Banner from "@/components/common/Banner";

const categories = [
    {
        title: "Icons Library",
        skills: [
            { name: "Phosphor Icons", key: "Phosphor" },
            { name: "React Icons", key: "React" },
        ],
    },
    {
        title: "Frontend",
        skills: [
            { name: "React", key: "React" },
            { name: "TailwindCSS", key: "TailwindCSS" },
            { name: "React Router", key: "ReactRouter" },
            { name: "CSS3", key: "CSS" },
            { name: "Sass", key: "Sass" }
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "ExpressJS", key: "ExpressJS" },
            { name: "MongoDB", key: "MongoDB" },
            { name: "NodeJS", key: "NodeJS" }
        ],
    },
    {
        title: "Others",
        skills: [
            { name: "Vite", key: "Vite" },
            { name: "ESLint", key: "ESLint" }
        ],
    },
];

const Attribution = () => (
    <>
        <section className="w-full py-12">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                    Built With Using Modern Technologies
                </h2>
                <p className="mb-10 max-w-xl mx-auto text-gray-500 dark:text-gray-400">
                    This portfolio is powered by open-source frameworks, libraries, and services. Huge thanks to these awesome projects!
                </p>
                <div className="grid gap-10">
                    {categories.map((cat) => (
                        <div key={cat.title}>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-6">
                                {cat.skills.map((skill) => {
                                    const Icon = SkillIcons[skill.key];
                                    return (
                                        <div
                                            key={skill.name}
                                            className="flex flex-col items-center gap-2 p-4 w-28 rounded-lg bg-white dark:bg-neutral-800 shadow hover:shadow-md transition"
                                        >
                                            {Icon
                                                ? <img src={Icon} alt={skill.name} className="w-10 h-10 object-contain" />
                                                : <div className="w-10 h-10" />}
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                {skill.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <Banner />
    </>
);

export default Attribution;