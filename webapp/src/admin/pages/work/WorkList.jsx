import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";

const WorkList = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/work/all`);
      const data = await res.json();
      if (data.success) setWorks(data.works);
      else toast(data.message, "error");
    } catch {
      toast("Failed to fetch work experience", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${backendUrl}/api/work/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        toast("Experience deleted", "success");
        fetchWorks();
      } else toast(data.message, "error");
    } catch {
      toast("Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = works.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.role.toLowerCase().includes(search.toLowerCase()) ||
      w.company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">Work / Experience</h1>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search work..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 w-full md:w-64 border border-neutral-300 dark:border-neutral-700"
          />

          <button
            onClick={() => navigate("/admin/work/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FiPlus size={18} /> Add Work
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">No entries found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div
              key={w._id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-2xl p-6 flex flex-col text-neutral-900 dark:text-neutral-100"
            >
              <h3 className="text-xl font-semibold mb-1">{w.title}</h3>

              <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                {w.role} @{" "}
                <a
                  href={w.company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline text-blue-600 dark:text-blue-400"
                >
                  {w.company.name}
                </a>
              </p>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                {formatDate(w.startDate)} to{" "}
                {w.endDate === "Present" || w.endDate === "Ongoing"
                  ? w.endDate
                  : w.endDate
                    ? formatDate(w.endDate)
                    : "Present"}
              </p>

              {/* Description */}
              {w.description.length > 0 && (
                <ul className="text-sm list-disc ml-5 space-y-1 mb-4">
                  {w.description.slice(0, 3).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/admin/work/edit/${w._id}`)}
                  className="flex-1 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex justify-center items-center gap-1"
                >
                  <FiEdit size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(w._id)}
                  disabled={deletingId === w._id}
                  className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex justify-center items-center gap-1"
                >
                  {deletingId === w._id ? "Deleting..." : (
                    <>
                      <FiTrash2 size={16} /> Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkList;