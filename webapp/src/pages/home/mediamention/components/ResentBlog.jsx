import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import { formatDate } from '@/utils/formatDate';

const ResentBlog = () => {
  const { backendUrl } = useContext(AppContext);
  const [latestPost, setLatestPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      setLoadingPost(true);
      setErrorPost(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/recent`);
        if (!res.ok) throw new Error(`Failed to fetch latest blog post: ${res.statusText}`);
        const data = await res.json();
        if (data.success && data.blogs.length > 0) {
          setLatestPost(data.blogs[0]);
        } else {
          setLatestPost(null);
        }
      } catch (err) {
        setErrorPost(err.message || 'Failed to load latest blog post');
      } finally {
        setLoadingPost(false);
      }
    };

    fetchLatestPost();
  }, [backendUrl]);

  if (loadingPost) {
    return (
      <div className="p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-start bg-white dark:bg-neutral-950">
        <div className="w-full sm:w-1/2 shrink-0">
          <div className="w-full h-auto rounded-lg bg-gray-200 dark:bg-neutral-700 animate-pulse" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-between space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-neutral-600 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 dark:bg-neutral-600 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-300 dark:bg-neutral-600 rounded w-5/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (errorPost || !latestPost) {
    return (
      <div className="p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-start bg-white dark:bg-neutral-950">
        <div className="w-full sm:w-1/2 shrink-0">
          <div className="text-red-600 dark:text-red-400 p-2">{errorPost || 'No recent blog found'}</div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/blog/post/${latestPost.slug}`}
      className="p-2 border border-neutral-100 dark:border-neutral-900 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-start hover:scale-95 transition duration-500 cursor-pointer bg-white dark:bg-neutral-950"
      role="button"
      tabIndex={0}
    >
      <div className="w-full sm:w-1/2 shrink-0">
        <img
          src={
            latestPost?.image?.url
              ? latestPost.image.url
              : 'https://img.freepik.com/free-photo/online-blog_53876_123696.jpg'
          }
          alt={latestPost?.title || 'Latest Blog Thumbnail'}
          className="w-full h-40 sm:h-full max-h-40 sm:max-h-48 rounded-lg object-cover"
          loading="lazy"
        />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col justify-between">
        <h3 className="text-base font-semibold line-clamp-2 text-neutral-900 dark:text-neutral-100">{latestPost.title}</h3>
        <p className="text-sm mt-1 line-clamp-2 text-neutral-700 dark:text-neutral-300">{latestPost.description}</p>
        <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mt-3">
          <span>{formatDate(latestPost.date)}</span>
          <span>{latestPost.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
};

export default ResentBlog;