import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Category = () => {
  const { backendUrl } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/all`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch blogs");

        // Extract unique categories
        const uniqueCategories = [...new Set(data.blogs.map(blog => blog.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [backendUrl]);

  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-white">All Categories</h1>

      {loading && <p className="text-center text-gray-600">Loading categories...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {!loading && !error && categories.length === 0 && (
        <p className="text-center text-gray-600">No categories found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="block p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg text-center text-neutral-800 dark:text-neutral-200 font-semibold"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;