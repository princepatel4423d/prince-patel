import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/formatDate";
import { IoTimeOutline } from "react-icons/io5";
import { BsTag } from "react-icons/bs";
import { assets } from "@/assets/assets";

const BlogPost = () => {
  const { slug } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const headings = useMemo(() => {
    if (!post?.content) return [];
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = post.content;

    const headingElements = tempDiv.querySelectorAll("h2, h3");
    return Array.from(headingElements).map((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      }
      return {
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      let current = null;
      for (let heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top <= 100) current = heading.id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  useEffect(() => {
    if (!slug) {
      setError("No blog slug provided.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/slug/${slug}`);
        if (!res.ok) throw new Error(`Failed to fetch blog: ${res.statusText}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Blog not found");

        if (data.blog?.content) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = data.blog.content;
          tempDiv.querySelectorAll("h2, h3").forEach((heading) => {
            if (!heading.id) {
              heading.id = heading.textContent
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
            }
          });
          data.blog.content = tempDiv.innerHTML;
        }

        setPost(data.blog);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, backendUrl]);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        Loading blog...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 text-red-600 dark:text-red-400 font-semibold">
        {error}
      </div>
    );

  if (!post) return null;

  const imageUrl =
    post.image?.url &&
      (post.image.url.startsWith("http") || post.image.url.startsWith("https"))
      ? post.image.url
      : `${backendUrl}/${post.image?.url?.replace(/^\/+/, "")}`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* Blog Content */}
      <div className="w-full lg:w-[80%]">
        <article>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl text-gray-700 dark:text-gray-300 font-bold mb-3">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
            {post.description}
          </p>

          {/* Mobile TOC */}
          <div className="my-6 block lg:hidden">
            <h2 className="font-semibold text-lg">Table of Contents</h2>
            <nav className="relative border-l border-neutral-300 dark:border-neutral-600 pl-4 mt-3">
              {headings.length === 0 && (
                <p className="text-sm text-neutral-500">No sections found</p>
              )}
              {headings.map(({ id, text, level }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block mb-2 transition-colors hover:text-blue-500 ${activeId === id
                    ? "text-blue-600 font-semibold"
                    : "text-neutral-700 dark:text-neutral-300"
                    } ${level === 3 ? "ml-4 text-sm" : "ml-0 text-base font-medium"}`}
                >
                  <span className="relative">
                    {text}
                    {activeId === id && (
                      <span className="absolute -left-5 top-0.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Author Section */}
          <div className="flex items-center justify-between space-x-3 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={assets.aboutImage}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Prince Patel
                </span>
                <span className="text-neutral-800 dark:text-neutral-400 text-sm">
                  {formatDate(post.date)}
                </span>
              </div>
            </div>

            {/* Right: Read Time + Category */}
            <div className="flex flex-col space-y-1 text-sm">
              {/* Read Time */}
              <div className="flex justify-end items-center gap-2">
                <span className="text-neutral-800 dark:text-neutral-400">
                  {post.readTime} min read
                </span>
                <IoTimeOutline size={18} className="text-neutral-700 dark:text-neutral-300" />
              </div>

              {/* Category */}
              <div className="flex justify-end items-center gap-2">
                <span className="text-neutral-800 dark:text-neutral-400">
                  {post.category}
                </span>
                <BsTag size={18} className="text-neutral-700 dark:text-neutral-300" />
              </div>
            </div>
          </div>


          {/* Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-neutral-100 dark:border-neutral-900 mb-4"
            />
          )}

          {/* Full Content */}
          {post.content && (
            <div
              className="text-neutral-700 dark:text-neutral-300 text-lg prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </article>
      </div>

      {/* Desktop TOC */}
      <aside className="w-[20%] hidden lg:block">
        <div className="sticky top-20 space-y-3">
          <h2 className="font-semibold text-lg">Table of Contents</h2>
          <nav className="relative border-l border-neutral-300 dark:border-neutral-600 pl-4 mt-3">
            {headings.length === 0 && (
              <p className="text-sm text-neutral-500">No sections found</p>
            )}
            {headings.map(({ id, text, level }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`block mb-2 transition-colors hover:text-blue-500 ${activeId === id
                  ? "text-blue-600 font-semibold"
                  : "text-neutral-700 dark:text-neutral-300"
                  } ${level === 3 ? "ml-4 text-sm" : "ml-0 text-base font-medium"}`}
              >
                <span className="relative">
                  {text}
                  {activeId === id && (
                    <span className="absolute -left-5 top-0.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default BlogPost;