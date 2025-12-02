import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const BlogList = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/blog/all`);
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (error) {
      toast("Error fetching blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`${backendUrl}/api/blog/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast("Blog deleted", "success");
        fetchBlogs();
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Failed to delete blog", "error");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-8">
        <h1 className="text-3xl font-semibold">Blogs</h1>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg 
            bg-neutral-100 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100 
            border border-neutral-300 dark:border-neutral-700 
            w-full md:w-64"
          />

          <button
            onClick={() => navigate("/admin/blog/add")}
            className="flex items-center gap-2 
            bg-blue-600 text-white px-4 py-2 rounded-lg 
            hover:bg-blue-700 transition"
          >
            <FiPlus size={18} />
            Create Blog
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-neutral-900 
              rounded-2xl shadow-lg overflow-hidden 
              flex flex-col w-full 
              hover:shadow-xl transition-shadow duration-200 
              border border-neutral-200 dark:border-neutral-800"
            >
              <img
                src={blog.image?.url || ""}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    {blog.category}
                  </p>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    Tags: {blog.tags.join(", ")}
                  </p>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Read Time: {blog.readTime} min
                  </p>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                    flex-1 flex items-center justify-center gap-1 transition"
                    onClick={() => navigate(`/admin/blog/edit/${blog._id}`)}
                  >
                    <FiEdit size={16} /> Edit
                  </button>

                  <button
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                    flex-1 flex items-center justify-center gap-1 transition
                    disabled:opacity-60"
                    onClick={() => deleteBlog(blog._id)}
                    disabled={deletingId === blog._id}
                  >
                    {deletingId === blog._id ? (
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
      )}
    </div>
  );
};

export default BlogList;