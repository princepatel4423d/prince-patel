import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";

const ProjectList = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/project/all`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setProjects(data.data);
      else toast(data.message, "error");
    } catch (error) {
      toast("Failed to fetch projects", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`${backendUrl}/api/project/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast("Project deleted", "success");
        fetchProjects();
      } else toast(data.message, "error");
    } catch (error) {
      toast("Failed to delete project", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.type.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  const bigProjects = filteredProjects.filter((p) => p.image?.url);
  const smallProjects = filteredProjects.filter((p) => !p.image?.url);

  return (
    <div className="w-full text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-8">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 w-full md:w-64"
          />

          <button
            onClick={() => navigate("/admin/project/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FiPlus size={18} /> Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">No projects found.</p>
      ) : (
        <>
          {/* Big Projects */}
          {bigProjects.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Big Projects</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bigProjects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-lg overflow-hidden flex flex-col w-full"
                  >
                    <img
                      src={project.image.url}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          {project.description}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                          {project.type}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                          Tags: {project.tags.join(", ")}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex-1 flex items-center justify-center gap-1"
                          onClick={() => navigate(`/admin/project/edit/${project._id}`)}
                        >
                          <FiEdit size={18} /> Edit
                        </button>

                        <button
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex-1 flex items-center justify-center gap-1"
                          onClick={() => handleDelete(project._id)}
                          disabled={deletingId === project._id}
                        >
                          {deletingId === project._id ? (
                            "Deleting..."
                          ) : (
                            <>
                              <FiTrash2 size={18} /> Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Small Projects */}
          {smallProjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Small Projects</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {smallProjects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-lg overflow-hidden flex flex-col w-full p-4"
                  >
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          {project.description}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                          {project.type}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                          Tags: {project.tags.join(", ")}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button
                          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex-1 flex items-center justify-center gap-1"
                          onClick={() => navigate(`/admin/project/edit/${project._id}`)}
                        >
                          <FiEdit size={16} /> Edit
                        </button>

                        <button
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex-1 flex items-center justify-center gap-1"
                          onClick={() => handleDelete(project._id)}
                          disabled={deletingId === project._id}
                        >
                          {deletingId === project._id ? (
                            "Deleting..."
                          ) : (
                            <>
                              <FiTrash2 size={16} /> Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectList;