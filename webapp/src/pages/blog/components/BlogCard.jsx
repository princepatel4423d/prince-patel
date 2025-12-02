import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { formatDate } from "@/utils/formatDate";
import { AppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const BlogCard = ({ blog, small }) => {
  const { backendUrl } = useContext(AppContext);

  if (!blog) return null;

  const imageUrl =
    blog.image?.url ||
    assets.placeholderImage ||
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div
      className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden flex flex-col ${small ? "max-w-sm" : ""
        }`}
    >
      {/* Blog Image */}
      <img
        src={imageUrl}
        alt={blog.title}
        className={small ? "w-full h-32 object-cover" : "w-full h-48 object-cover"}
      />

      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <Link
          to={`/blog/post/${blog.slug}`}
          className={`font-semibold hover:underline mb-2 ${small ? "text-md text-neutral-900 dark:text-white" : "text-lg text-neutral-900 dark:text-white"
            }`}
        >
          {blog.title}
        </Link>

        {/* Description */}
        {!small && (
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
            {blog.description.length > 120
              ? blog.description.slice(0, 120) + "..."
              : blog.description}
          </p>
        )}

        {/* Tags */}
        {!small && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {blog.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full text-xs text-neutral-700 dark:text-neutral-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Date, Read Time & Like */}
        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mt-auto">
          <span className="flex items-center gap-1">
            <IoCalendarOutline className="inline-block" size={14} />
            {formatDate(blog.date)}
          </span>

          <span className="flex items-center gap-1">
            <FiClock className="inline-block" size={14} />
            {blog.readTime} min read
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;