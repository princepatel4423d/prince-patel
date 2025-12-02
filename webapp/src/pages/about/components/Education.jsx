import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/formatDate";
import { FaGraduationCap, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";

const Education = () => {
  const { backendUrl } = useContext(AppContext);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEducation = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/education/all`);
      const data = await res.json();

      if (data.success) {
        setEducation(data.education);
      }
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading education...</p>;
  }

  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row gap-8">

        {/* ---------------- Left Title Section ---------------- */}
        <div className="md:w-1/3 w-full">
          <h2 className="flex items-center gap-2 text-3xl font-medium text-neutral-900 dark:text-neutral-100">
            <FaGraduationCap size={32} /> Education
          </h2>
        </div>

        {/* ---------------- Right Education Cards ---------------- */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {education.map((edu) => (
            <div
              key={edu._id}
              className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-xs hover:shadow-sm transition"
            >
              {/* Degree + Duration */}
              <div className="flex justify-between flex-wrap items-start mb-3">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {edu.degree}
                </h3>

                <span className="text-base text-neutral-600 dark:text-neutral-400 italic">
                  {formatDate(edu.startDate)} to{" "}
                  {edu.endDate
                    ? isNaN(Date.parse(edu.endDate))
                      ? edu.endDate
                      : formatDate(edu.endDate)
                    : "Present"}
                </span>
              </div>

              {/* Title */}
              <p className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                {edu.title}
              </p>

              {/* Institute + Location */}
              <div className="flex flex-col gap-1 mb-3">

                {/* Institute */}
                <div className="flex items-center gap-2">
                  <FaUniversity
                    size={16}
                    className="text-neutral-600 dark:text-neutral-400"
                  />
                  {edu.institute?.link ? (
                    <a
                      href={edu.institute.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-neutral-900 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-100 hover:underline"
                    >
                      {edu.institute.name}
                    </a>
                  ) : (
                    <span className="text-base font-medium text-neutral-900 dark:text-neutral-200">
                      {edu.institute.name}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt
                    size={14}
                    className="text-neutral-600 dark:text-neutral-400"
                  />
                  {edu.location?.link ? (
                    <a
                      href={edu.location.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
                    >
                      {edu.location.name}
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {edu.location.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Details / Description */}
              {edu.description?.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-base text-neutral-700 dark:text-neutral-300">
                  {edu.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;