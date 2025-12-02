import React, { useState, useEffect, useContext } from "react";
import BlogCard from "./components/BlogCard";
import { AppContext } from "@/context/AppContext";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Banner from "@/components/common/Banner";

const Blog = () => {
  const { backendUrl } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/all`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        if (data.success) setBlogs(data.blogs);
        else throw new Error(data.message || "Failed to fetch blogs");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  // Extract unique categories and tags
  useEffect(() => {
    const cats = [...new Set(blogs.map((b) => b.category))];
    const tags = [...new Set(blogs.flatMap((b) => b.tags || []))];
    setCategories(cats);
    setTagsList(tags);
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory = selectedCategory
      ? b.category === selectedCategory
      : true;

    const matchesTag = selectedTag ? b.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <>
      {/* Banner / Hero */}
      <section className="max-w-4xl mx-auto text-center py-12">
        <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
          The Blog
        </p>
        <h1 className="text-4xl text-black dark:text-white sm:text-5xl md:text-6xl font-normal leading-tight mb-2">
          Words remembered, <br />
          within{" "}
          <span className="font-playfair bg-linear-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text italic">
            the pensieve
          </span>
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A collection of my latest thoughts, tutorials, and stories — crafted
          to inspire, inform, and spark new ideas.
        </p>
      </section>

      {/* Main Content: Blogs + Sidebar */}
      <div className="py-12">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left: Blogs (80%) */}
          <div className="md:w-4/5">
            {loading && <p className="text-center text-gray-600">Loading blogs...</p>}
            {error && <p className="text-center text-red-600">Error: {error}</p>}
            {!loading && !error && filteredBlogs.length === 0 && (
              <p className="text-center text-gray-600">No blogs found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!loading && !error &&
                filteredBlogs.map((post) => (
                  <BlogCard key={post.slug} blog={post} />
                ))
              }
            </div>
          </div>

          {/* Right: Sidebar (20%) */}
          <div className="md:w-1/5 mt-8 md:mt-0">
            <div className="sticky top-20 space-y-6">
              {/* Search Bar */}
              <div>
                <label htmlFor="search" className="sr-only">Search Blogs</label>
                <div className="relative text-gray-600 dark:text-gray-300">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 focus:outline-none focus:ring focus:ring-blue-400 dark:text-white"
                  />
                </div>
              </div>

              {/* Dedicated Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/blog/categories"
                  className="text-center text-sm font-semibold px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-blue-500 hover:text-white transition"
                >
                  All Categories
                </Link>
                <Link
                  to="/blog/tags"
                  className="text-center text-sm font-semibold px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-green-500 hover:text-white transition"
                >
                  All Tags
                </Link>
              </div>

              {/* Categories Filter */}
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white mt-6">Categories</h3>
              <ul className="space-y-2">
                <li
                  key="all"
                  onClick={() => setSelectedCategory("")}
                  className={`cursor-pointer text-sm ${!selectedCategory ? "font-semibold text-blue-600" : "text-gray-700 dark:text-gray-300"}`}
                >
                  All
                </li>
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer text-sm ${selectedCategory === cat ? "font-semibold text-blue-600" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>

              {/* Tags Filter */}
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white mt-6">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span
                  key="all"
                  onClick={() => setSelectedTag("")}
                  className={`cursor-pointer px-3 py-1 rounded-full text-sm ${!selectedTag ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200"}`}
                >
                  All
                </span>
                {tagsList.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => setSelectedTag(tag)}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm ${selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200"}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Blog;