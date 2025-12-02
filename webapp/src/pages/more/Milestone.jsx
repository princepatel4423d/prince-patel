import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { FaCheckCircle, FaFire, FaBolt, FaLeaf } from "react-icons/fa";
import Banner from "@/components/common/Banner";

const Milestone = () => {
    const { backendUrl } = useContext(AppContext);
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${backendUrl}/api/milestone/all`);
                if (response.data && response.data.success) {
                    setMilestones(response.data.data);
                } else {
                    setError("Failed to fetch milestones.");
                }
            } catch (err) {
                console.error("Error fetching milestones:", err);
                setError("Server error. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMilestones();

    }, [backendUrl]);

    if (loading) return <p className="text-center py-6">Loading milestones...</p>;
    if (error) return <p className="text-red-500 text-center py-6">{error}</p>;

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 1:
                return <FaFire className="text-red-500" size={24} />;
            case 2:
                return <FaBolt className="text-yellow-500" size={24} />;
            case 3:
                return <FaLeaf className="text-green-500" size={24} />;
            default:
                return null;
        }
    };

    return (<div className="space-y-12 max-w-4xl mx-auto">
        {/* Header */} <section className="text-center"> <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400 mb-3">
            My Bucket List </p> <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4">
                Exploring <br /> <span className="font-playfair bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-600 text-transparent bg-clip-text italic">
                    dreams & goals </span> </h1> <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                A curated collection of experiences, adventures, and aspirations I aim to fulfill in my lifetime — each chosen with intent, excitement, and a deep sense of wonder. </p> </section>

        {/* Milestone List */}
        <div className="grid gap-6 md:grid-cols-2">
            {milestones.map((m) => (
                <div
                    key={m._id}
                    className={`relative flex items-center gap-4 p-5 rounded-2xl border transition hover:shadow-lg ${m.isActive
                            ? "border-gray-200 dark:border-neutral-700"
                            : "border-green-400 bg-green-50 dark:bg-green-900/20"
                        }`}
                >
                    {/* Overlay for completed */}
                    {!m.isActive && (
                        <div className="absolute inset-0 bg-green-50 dark:bg-green-900/20 rounded-2xl z-0" />
                    )}

                    {/* Priority Icon */}
                    <div className="z-10">{getPriorityIcon(m.priority)}</div>

                    <div className="flex-1 z-10">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {m.title}
                        </p>
                        {m.description && (
                            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                                {m.description}
                            </p>
                        )}
                        {m.category && (
                            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                Category: {m.category}
                            </p>
                        )}
                    </div>

                    {/* Completed Check */}
                    {!m.isActive && (
                        <div className="z-10 flex flex-col items-center">
                            <FaCheckCircle size={24} className="text-green-500 mb-1" />
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                                Completed
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <Banner />
    </div>
    );
};

export default Milestone;