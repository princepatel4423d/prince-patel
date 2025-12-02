import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";

const AddProject = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [type, setType] = useState("small");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stackIcon, setStackIcon] = useState("");
  const [tags, setTags] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !type) {
      toast("Type, title, and description are required", "error");
      return;
    }
    if (type === "big" && !image) {
      toast("Image is required for big projects", "error");
      return;
    }

    const stackIconArray = stackIcon.split(",").map(i => i.trim()).filter(Boolean);
    const tagsArray = tags.split(",").map(i => i.trim()).filter(Boolean);

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("type", type);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("stackIcon", JSON.stringify(stackIconArray));
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("sourceUrl", sourceUrl);
      formData.append("demoUrl", demoUrl);
      if (image) formData.append("image", image);

      const res = await fetch(`${backendUrl}/api/project/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast("Project created successfully", "success");
        navigate("/admin/project/list");
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg text-neutral-900 dark:text-neutral-100">
      <h2 className="text-2xl font-semibold mb-4">Add Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Type */}
        <div>
          <label className="block font-medium mb-1">Type *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
          >
            <option value="small">Small</option>
            <option value="big">Big</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="Project title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            rows="4"
            placeholder="Project description"
            required
          />
        </div>

        {/* Stack Icons */}
        <div>
          <label className="block font-medium mb-1">Stack Icons (comma separated)</label>
          <input
            type="text"
            value={stackIcon}
            onChange={(e) => setStackIcon(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="react, nodejs, tailwind"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="portfolio, personal"
          />
        </div>

        {/* Source URL */}
        <div>
          <label className="block font-medium mb-1">Source URL</label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="https://github.com/username/project"
          />
        </div>

        {/* Demo URL */}
        <div>
          <label className="block font-medium mb-1">Demo URL</label>
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="https://project-demo.com"
          />
        </div>

        {/* Image for Big Project */}
        {type === "big" && (
          <div>
            <label className="block font-medium mb-1">Project Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/project/list")}
            className="px-4 py-2 rounded-lg bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProject;