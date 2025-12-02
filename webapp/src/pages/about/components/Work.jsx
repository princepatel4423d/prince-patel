import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/formatDate";
import { FaBriefcase, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const Work = () => {
  const { backendUrl } = useContext(AppContext);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/work/all`);
        const data = await res.json();
        if (data.success) setWorks(data.works);
      } catch (err) {
        console.error("Error fetching work:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [backendUrl]);

  if (loading) {
    return (
      <p className="text-center py-10 text-neutral-600 dark:text-neutral-300">
        Loading work experience...
      </p>
    );
  }

  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row gap-8">
        {/* ---------------- Left Title Section ---------------- */}
        <div className="md:w-1/3 w-full">
          <h2 className="flex items-center gap-2 text-3xl font-medium text-neutral-900 dark:text-neutral-100">
            <FaBriefcase size={32} /> Work Experience
          </h2>
        </div>

        {/* ---------------- Right Work Cards ---------------- */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {works.map((work) => (
            <div
              key={work._id}
              className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-xs hover:shadow-sm transition"
            >
              {/* Role + Duration */}
              <div className="flex justify-between flex-wrap items-start mb-3">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {work.role}
                </h3>

                <span className="text-base text-neutral-600 dark:text-neutral-400 italic">
                  {formatDate(work.startDate)} to{" "}
                  {work.endDate
                    ? isNaN(Date.parse(work.endDate))
                      ? work.endDate
                      : formatDate(work.endDate)
                    : "Present"}
                </span>
              </div>

              {/* Title / Position */}
              <p className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                {work.title}
              </p>

              {/* Company + Location */}
              <div className="flex flex-col gap-1 mb-3">
                {/* Company */}
                <div className="flex items-center gap-2">
                  <FaBuilding
                    size={16}
                    className="text-neutral-600 dark:text-neutral-400"
                  />
                  {work.company?.link ? (
                    <a
                      href={work.company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-neutral-900 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-100 hover:underline"
                    >
                      {work.company.name}
                    </a>
                  ) : (
                    <span className="text-base font-medium text-neutral-900 dark:text-neutral-200">
                      {work.company.name}
                    </span>
                  )}
                </div>

                {/* Location */}
                {work.location?.name && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt
                      size={14}
                      className="text-neutral-600 dark:text-neutral-400"
                    />
                    {work.location?.link ? (
                      <a
                        href={work.location.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
                      >
                        {work.location.name}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {work.location.name}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              {work.description?.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-base text-neutral-700 dark:text-neutral-300 mb-3">
                  {work.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}

              {/* Tech Stack */}
              {work.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {work.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm border border-neutral-400 dark:border-neutral-700 rounded-full text-neutral-800 dark:text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;