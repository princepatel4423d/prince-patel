import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";

const EducationList = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/education/all`);
      const data = await res.json();
      if (data.success) setEducations(data.education);
      else toast(data.message, "error");
    } catch (error) {
      toast("Failed to fetch education entries", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`${backendUrl}/api/education/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast("Education entry deleted", "success");
        fetchEducations();
      } else toast(data.message, "error");
    } catch (error) {
      toast("Failed to delete education entry", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEducations = educations.filter(
    (edu) =>
      edu.title.toLowerCase().includes(search.toLowerCase()) ||
      edu.institute.name.toLowerCase().includes(search.toLowerCase()) ||
      edu.location.name.toLowerCase().includes(search.toLowerCase()) ||
      edu.degree.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-8">
        <h1 className="text-3xl font-semibold">Education</h1>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search education..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-900 dark:text-neutral-100 
                   placeholder-neutral-500 dark:placeholder-neutral-400
                   w-full md:w-64"
          />

          <button
            onClick={() => navigate("/admin/education/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FiPlus size={18} /> Add Education
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">
          Loading education entries...
        </p>
      ) : filteredEducations.length === 0 ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">
          No education entries found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEducations.map((edu) => (
            <div
              key={edu._id}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 
                     text-neutral-900 dark:text-neutral-100"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{edu.title}</h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  {edu.degree} @ {edu.institute.name}
                </p>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Location: {edu.location.name}
                </p>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  Duration: {edu.startDate ? new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "N/A"} to {edu.endDate ? (isNaN(Date.parse(edu.endDate)) ? edu.endDate : new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })) : "Present"}
                </p>

                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {edu.description.join(", ")}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                         flex-1 flex items-center justify-center gap-1"
                  onClick={() => navigate(`/admin/education/edit/${edu._id}`)}
                >
                  <FiEdit size={16} /> Edit
                </button>

                <button
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                         flex-1 flex items-center justify-center gap-1"
                  onClick={() => handleDelete(edu._id)}
                  disabled={deletingId === edu._id}
                >
                  {deletingId === edu._id ? (
                    "Deleting..."
                  ) : (
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

export default EducationList;