import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Tag = () => {
  const { backendUrl } = useContext(AppContext);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/all`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch blogs");

        // Extract unique tags
        const uniqueTags = [...new Set(data.blogs.flatMap(blog => blog.tags || []))];
        setTags(uniqueTags);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [backendUrl]);

  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-white">All Tags</h1>

      {loading && <p className="text-center text-gray-600">Loading tags...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {!loading && !error && tags.length === 0 && (
        <p className="text-center text-gray-600">No tags found.</p>
      )}

      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;