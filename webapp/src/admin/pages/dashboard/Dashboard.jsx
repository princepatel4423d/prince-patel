import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";

import { FiBook, FiLayers, FiBriefcase, FiBookmark, FiPlus, FiLink, FiTarget } from "react-icons/fi";

const Dashboard = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    work: 0,
    education: 0,
    socialLinks: 0,
    milestones: 0,
  });

  const [latest, setLatest] = useState({
    blog: null,
    project: null,
    work: null,
  });

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/dashboard/data`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) return toast(data.message, "error");

      setStats(data.stats);
      setLatest(data.latest);
    } catch (error) {
      toast("Failed to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-8 text-neutral-900 dark:text-neutral-100">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">
          Loading Dashboard...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
            {/* Blogs */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                <FiBook className="text-blue-600 dark:text-blue-300" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Blogs</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {stats.blogs}
                </p>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                <FiLayers className="text-green-600 dark:text-green-300" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Projects</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {stats.projects}
                </p>
              </div>
            </div>

            {/* Work */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                <FiBriefcase className="text-purple-600 dark:text-purple-300" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Work</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {stats.work}
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                <FiBookmark className="text-orange-600 dark:text-orange-300" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Education</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {stats.education}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900">
                <FiLink className="text-teal-600 dark:text-teal-300" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Social Links</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {stats.socialLinks}
                </p>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                <FiTarget className="text-yellow-600 dark:text-yellow-300" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Milestones</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {stats.milestones}
                </p>
              </div>
            </div>
          </div>

          {/* Latest Section */}
          <div className="space-y-6 mb-6">
            {/* Latest Blog */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                Latest Blog
              </h2>
              {latest.blog ? (
                <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {latest.blog.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {latest.blog?.category || "No category"}
                  </p>
                </div>
              ) : (
                <p className="text-neutral-500 dark:text-neutral-400">No blogs found.</p>
              )}
            </div>

            {/* Latest Project */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                Latest Project
              </h2>
              {latest.project ? (
                <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {latest.project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {latest.project?.description || "No Description"}
                  </p>
                </div>
              ) : (
                <p className="text-neutral-500 dark:text-neutral-400">No projects found.</p>
              )}
            </div>

            {/* Latest Work */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                Latest Work
              </h2>
              {latest.work ? (
                <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {latest.work.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {latest.work.role} — {latest.work.company?.name}
                  </p>
                </div>
              ) : (
                <p className="text-neutral-500 dark:text-neutral-400">No work entries found.</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              to="/admin/blog/add"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg transition-all text-center"
            >
              <FiPlus size={18} /> Add Blog
            </Link>

            <Link
              to="/admin/project/add"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition-all text-center"
            >
              <FiPlus size={18} /> Add Project
            </Link>

            <Link
              to="/admin/work/add"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-5 rounded-lg transition-all text-center"
            >
              <FiPlus size={18} /> Add Work
            </Link>

            <Link
              to="/admin/education/add"
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-5 rounded-lg transition-all text-center"
            >
              <FiPlus size={18} /> Add Education
            </Link>

            <Link
              to="/admin/social/add"
              className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-5 rounded-lg transition-all text-center"
            >
              <FiPlus size={18} /> Add Social
            </Link>

            <Link
              to="/admin/milestone/add"
              className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-5 rounded-lg transition-all text-center"
            >
              <FiPlus size={18} /> Add Milestone
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;