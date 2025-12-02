import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

const MilestoneList = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch milestones
  const fetchMilestones = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/milestone/all`);
      const data = await res.json();
      if (data.success) setMilestones(data.data);
      else toast(data.message, "error");
    } catch (err) {
      toast("Failed to fetch milestones", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  // Delete milestone
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this milestone?")) return;
    try {
      const res = await fetch(`${backendUrl}/api/milestone/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast("Deleted successfully", "success");
        setMilestones(milestones.filter((m) => m._id !== id));
      } else {
        toast(data.message, "error");
      }
    } catch (err) {
      toast("Something went wrong", "error");
    }
  };

  // Toggle active
  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/milestone/${id}/toggle`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        toast(data.message, "success");
        fetchMilestones();
      } else {
        toast(data.message, "error");
      }
    } catch (err) {
      toast("Failed to update status", "error");
    }
  };

  return (
    <div className="w-full text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Milestones</h2>
        <button
          onClick={() => navigate("/admin/milestone/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {loading && (
        <p className="text-center py-5 text-neutral-600 dark:text-neutral-400">
          Loading...
        </p>
      )}

      {!loading && milestones.length === 0 && (
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          No milestones found.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          milestones.map((milestone) => (
            <div
              key={milestone._id}
              className="p-4 rounded-xl shadow-lg 
                     bg-white dark:bg-neutral-900 
                     border border-neutral-200 dark:border-neutral-800 
                     flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>

                <p className="mb-2 text-neutral-700 dark:text-neutral-300">
                  {milestone.description || "No description"}
                </p>

                <p className="mb-2">
                  <span className="font-medium">Category:</span> {milestone.category}
                </p>

                <p className="mb-2">
                  <span className="font-medium">Priority:</span>{" "}
                  {milestone.priority === 1
                    ? "High"
                    : milestone.priority === 2
                      ? "Medium"
                      : "Low"}
                </p>

                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${milestone.isActive
                        ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white"
                        : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white"
                      }`}
                  >
                    {milestone.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/admin/milestone/edit/${milestone._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleToggle(milestone._id)}
                  className={`px-3 py-1 rounded-lg text-white ${milestone.isActive
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {milestone.isActive ? "Disable" : "Enable"}
                </button>

                <button
                  onClick={() => handleDelete(milestone._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MilestoneList;