import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

const SocialMediaList = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [socialList, setSocialList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch social media
  const fetchSocialMedia = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/social/all`);
      const data = await res.json();

      if (data.success) {
        setSocialList(data.data);
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await fetch(`${backendUrl}/api/social/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast("Deleted successfully", "success");
        setSocialList(socialList.filter((item) => item._id !== id));
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Something went wrong", "error");
    }
  };

  // Toggle active status
  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/social/${id}/toggle`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        toast(data.message, "success");
        fetchSocialMedia();
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Failed to update status", "error");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Social Media List</h2>

        <button
          onClick={() => navigate("/admin/social/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-neutral-500 dark:text-neutral-300 py-5">Loading...</p>
      )}

      {/* Empty */}
      {!loading && socialList.length === 0 && (
        <p className="text-center text-neutral-600 dark:text-neutral-400 py-5">
          No social media links found.
        </p>
      )}

      {/* Responsive Cards Grid */}
      {!loading && socialList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialList.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{item.platform}</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{item.username}</p>
                </div>

                {/* Status badge */}
                <span
                  className={`px-2 py-1 text-xs rounded-lg font-medium ${item.isActive
                      ? "bg-green-600 text-white dark:bg-green-700 dark:text-white"
                      : "bg-red-600 text-white dark:bg-red-700 dark:text-white"
                    }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Sections */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-1 text-neutral-900 dark:text-neutral-100">Sections:</p>
                {item.sections.length > 0 ? (
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item.sections.join(", ")}
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">None</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => navigate(`/admin/social/edit/${item._id}`)}
                  className="flex-1 px-3 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleToggle(item._id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-white ${item.isActive
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {item.isActive ? "Disable" : "Enable"}
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMediaList;