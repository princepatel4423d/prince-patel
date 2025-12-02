import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !content || !category || !readTime || !image) {
      toast("Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("readTime", readTime);
      formData.append("image", image);

      const res = await fetch(`${backendUrl}/api/blog/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast("Blog created successfully", "success");
        navigate("/admin/blog/list");
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg text-neutral-900 dark:text-neutral-100">
      <h2 className="text-2xl font-semibold mb-6">Create New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-300 dark:border-neutral-700"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-300 dark:border-neutral-700"
            placeholder="Short description"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category *</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-300 dark:border-neutral-700"
            placeholder="e.g. Tech, Lifestyle"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-300 dark:border-neutral-700"
            placeholder="e.g. react, nodejs, mongodb"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Read Time (minutes) *</label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-300 dark:border-neutral-700"
            placeholder="e.g. 5"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content *</label>
          <JoditEditor
            className="text-black dark:text-black"
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Blog Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            border border-neutral-300 dark:border-neutral-700"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/blog/list")}
            className="px-4 py-2 rounded-lg 
            bg-neutral-300 dark:bg-neutral-700 
            text-neutral-900 dark:text-neutral-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg 
            bg-blue-600 text-white 
            hover:bg-blue-700
            disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;