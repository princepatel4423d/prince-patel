import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import JoditEditor from "jodit-react";

const EditBlog = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      setInitialLoading(true);
      const res = await fetch(`${backendUrl}/api/blog/id/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        const blog = data.blog;
        setTitle(blog.title);
        setDescription(blog.description);
        setCategory(blog.category);
        setTags(blog.tags.join(", "));
        setReadTime(blog.readTime);
        setContent(blog.content);
      } else {
        toast(data.message, "error");
        navigate("/admin/blog/list");
      }
    } catch (error) {
      toast("Failed to fetch blog", "error");
      navigate("/admin/blog/list");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !content || !category || !readTime) {
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
      if (image) formData.append("image", image);

      const res = await fetch(`${backendUrl}/api/blog/update/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast("Blog updated successfully", "success");
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

  if (initialLoading) return <p className="text-center p-6">Loading blog...</p>;

  return (
    <div className="w-full p-6 
    bg-white dark:bg-neutral-900 
    text-neutral-900 dark:text-neutral-100 
    rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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

        {/* Description */}
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

        {/* Category */}
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

        {/* Tags */}
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

        {/* Read Time */}
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

        {/* Content */}
        <div >
          <label className="block font-medium mb-1">Content *</label>
          <JoditEditor className="text-black dark:text-black" value={content} onChange={(newContent) => setContent(newContent)} />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100 
            border border-neutral-300 dark:border-neutral-700"
          />

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Leave empty to keep existing image
          </p>
        </div>

        {/* Buttons */}
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
            bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;