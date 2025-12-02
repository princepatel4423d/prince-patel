import React, { useEffect, useState } from 'react';
import {
    FaGithub,
    FaStar,
    FaUser,
    FaMusic,
    FaMicrophone,
} from 'react-icons/fa';
import { IoMdMusicalNote } from "react-icons/io";

const StatGrid = () => {
    const [githubStars, setGithubStars] = useState(null);
    const [githubFollowers, setGithubFollowers] = useState([]);
    const [totalPlays, setTotalPlays] = useState(null);
    const [topArtist, setTopArtist] = useState('Arijit Singh');
    const [totalArtists, setTotalArtists] = useState(null);

    // Dynamic age
    const birthDate = new Date('2005-04-23');
    const today = new Date();
    const age =
        today.getFullYear() -
        birthDate.getFullYear() -
        (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ? 1
            : 0);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const username = 'princepatel4423d';
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const repos = await reposRes.json();
                const stars = Array.isArray(repos)
                    ? repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
                    : 0;
                setGithubStars(stars);

                const followersRes = await fetch(`https://api.github.com/users/${username}/followers`);
                const followers = await followersRes.json();
                setGithubFollowers(Array.isArray(followers) ? followers : []);
            } catch (err) {
                console.error('GitHub data fetch error:', err);
            }
        };

        const fetchLastFmData = async () => {
            try {
                const username = 'princep4423d';
                const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

                const infoRes = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`
                );
                const infoData = await infoRes.json();
                const playCount = parseInt(infoData.user?.playcount || 0);
                const artistCount = parseInt(infoData.user?.artist_count || 0);
                setTotalPlays(playCount);
                setTotalArtists(artistCount);
            } catch (err) {
                console.error('Last.fm fetch error:', err);
            }
        };

        fetchGitHubData();
        fetchLastFmData();
    }, []);

    return (
        <div className="grid grid-cols-1 min-[300px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 pb-10">
            <StatCard
                icon={<FaUser size={18} className="text-neutral-700 dark:text-neutral-300" />}
                label="My Age"
                value={age}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
            />

            <StatCard
                icon={<FaStar size={18} className="text-yellow-500 dark:text-yellow-400" />}
                label="GitHub Stars"
                value={githubStars !== null ? githubStars.toLocaleString() : '...'}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
            />

            <StatCard
                icon={<FaGithub size={18} className="text-neutral-900 dark:text-neutral-100" />}
                label="GitHub Followers"
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
            >
                <div className="flex items-center space-x-1 mt-1">
                    {githubFollowers.slice(0, 6).map((follower, i) => (
                        <img
                            key={i}
                            src={follower.avatar_url}
                            alt={follower.login}
                            className="w-6 h-6 rounded-full border-2 border-white dark:border-neutral-900 -ml-2 first:ml-0"
                        />
                    ))}
                    {githubFollowers.length > 6 && (
                        <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                            +{(githubFollowers.length - 6).toLocaleString()}
                        </span>
                    )}
                </div>
            </StatCard>

            <StatCard
                icon={<FaMusic size={18} className="text-neutral-700 dark:text-neutral-300" />}
                label="Scrobbles"
                value={totalPlays !== null ? totalPlays.toLocaleString() : '...'}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
            />

            <StatCard
                icon={<FaMicrophone size={18} className="text-neutral-700 dark:text-neutral-300" />}
                label="Artists Listened"
                value={totalArtists !== null ? totalArtists.toLocaleString() : '...'}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
            />

            <StatCard
                icon={<IoMdMusicalNote size={18} className="text-neutral-700 dark:text-neutral-300" />}
                label="Favourite Artist"
                value={topArtist}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
            />
        </div>
    );
};

const StatCard = ({ icon, label, value, children }) => (
    <div
        className="bg-white dark:bg-neutral-900 rounded-xl p-3 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200"
    >
        <p className="text-xs sm:text-sm flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            {icon} {label}
        </p>
        {children ? (
            children
        ) : (
            <p className="text-sm sm:text-base md:text-xl font-medium mt-1 text-neutral-900 dark:text-neutral-100">
                {value}
            </p>
        )}
    </div>
);

export default StatGrid;