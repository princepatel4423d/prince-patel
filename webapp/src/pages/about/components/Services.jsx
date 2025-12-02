import React from "react";
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaHandshake,
} from "react-icons/fa";

const services = [
  {
    icon: <FaCode size={32} />,
    title: "Full Stack Development",
    description:
      "Building powerful and scalable web apps using MERN stack and modern tools.",
  },
  {
    icon: <FaLaptopCode size={32} />,
    title: "UI/UX Design",
    description:
      "Creating clean, intuitive, and responsive user interfaces with great user experience.",
  },
  {
    icon: <FaMobileAlt size={32} />,
    title: "Responsive Design",
    description:
      "Ensuring seamless experience across all devices — mobile, tablet, and desktop.",
  },
  {
    icon: <FaPaintBrush size={32} />,
    title: "Creative Frontend",
    description:
      "Crafting interactive and modern UI with Tailwind CSS, Framer Motion, and custom animations.",
  },
];

const Services = () => {
  return (
    <section className="py-14">
      <div className="flex items-center gap-2 text-3xl font-medium mb-10">
        <FaHandshake size={32} /> Services
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="space-y-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="text-black dark:text-white flex justify-center">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold dark:text-white">
              {service.title}
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;