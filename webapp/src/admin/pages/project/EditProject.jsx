import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";

const EditProject = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    stackIcon: "",
    tags: "",
    sourceUrl: "",
    demoUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/project/${id}`);
        const data = await res.json();
        if (data.success) {
          setProject(data.data);
          setFormData({
            type: data.data.type || "",
            title: data.data.title || "",
            description: data.data.description || "",
            stackIcon: Array.isArray(data.data.stackIcon)
              ? data.data.stackIcon.join(", ")
              : "",
            tags: Array.isArray(data.data.tags)
              ? data.data.tags.join(", ")
              : "",
            sourceUrl: data.data.sourceUrl || "",
            demoUrl: data.data.demoUrl || "",
          });
        } else {
          toast(data.message, "error");
        }
      } catch (err) {
        toast("Failed to fetch project", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [backendUrl, id, toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // ---------------------------
  // FINAL FIXED SUBMIT FUNCTION
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "tags") {
          const arr = value
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

          data.append("tags", JSON.stringify(arr)); // FIXED ✔
        }

        else if (key === "stackIcon") {
          const arr = value
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

          data.append("stackIcon", JSON.stringify(arr)); // FIXED ✔
        }

        else {
          data.append(key, value);
        }
      });

      if (project.type === "big" && imageFile) {
        data.append("image", imageFile);
      }

      const res = await fetch(`${backendUrl}/api/project/update/${id}`, {
        method: "PUT",
        credentials: "include",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        toast("Project updated successfully", "success");
        navigate("/admin/project/list");
      } else {
        toast(result.message, "error");
      }
    } catch (err) {
      toast("Failed to update project", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading project...</p>;
  if (!project) return null;

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg text-neutral-900 dark:text-neutral-100">
      <h1 className="text-2xl font-semibold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <label className="flex flex-col">
          Type
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          >
            <option value="big">Big</option>
            <option value="small">Small</option>
          </select>
        </label>

        <label className="flex flex-col">
          Title
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </label>

        <label className="flex flex-col">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </label>

        <label className="flex flex-col">
          Stack Icon (comma separated)
          <input
            name="stackIcon"
            value={formData.stackIcon}
            onChange={handleChange}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </label>

        <label className="flex flex-col">
          Tags (comma separated)
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </label>

        <label className="flex flex-col">
          Source URL
          <input
            name="sourceUrl"
            value={formData.sourceUrl}
            onChange={handleChange}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </label>

        <label className="flex flex-col">
          Demo URL
          <input
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </label>

        {project.type === "big" && (
          <label className="flex flex-col">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            />
          </label>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4 disabled:opacity-60"
        >
          {submitting ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default EditProject;