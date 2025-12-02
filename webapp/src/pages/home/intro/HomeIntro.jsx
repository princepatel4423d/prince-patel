import React, { useEffect, useState, useContext } from "react";
import Profile from "./Profile";
import ProfileCard from "./ProfileCard";
import { AppContext } from "@/context/AppContext";

const MainIntro = () => {
  const { backendUrl } = useContext(AppContext);
  const username = "princepatel4423d";
  const [totals, setTotals] = useState({ stars: 0, forks: 0 });
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await res.json();
        const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const forks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        setTotals({ stars, forks });
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
      }
    };

    const fetchLatestPost = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/blog/recent`);
        const data = await res.json();
        if (data.success && data.blogs.length > 0) {
          setLatestPost(data.blogs[0]);
        } else {
          setLatestPost(null);
        }
      } catch (err) {
        console.error("Failed to fetch recent blog posts:", err);
      }
    };

    fetchTotals();
    fetchLatestPost();
  }, [backendUrl]);

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_23rem] py-16">
      <Profile latestPost={latestPost} />
      <div className="md:sticky md:top-24">
        <ProfileCard username={username} totals={totals} />
      </div>
    </div>
  );
};

export default MainIntro;