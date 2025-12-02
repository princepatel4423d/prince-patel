import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

const AddMilestone = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState(2); // default Medium
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      toast("Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        category,
        priority,
        isActive,
      };

      const res = await fetch(`${backendUrl}/api/milestone/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast("Milestone created successfully", "success");
        navigate("/admin/milestone/list");
      } else {
        toast(data.message, "error");
      }
    } catch (err) {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg 
                text-neutral-900 dark:text-neutral-100 
                border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-semibold mb-6">Add Milestone</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg 
                   bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-900 dark:text-neutral-100 
                   border border-neutral-300 dark:border-neutral-700"
            placeholder="Enter milestone title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg 
                   bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-900 dark:text-neutral-100 
                   border border-neutral-300 dark:border-neutral-700"
            rows="3"
            placeholder="Optional description"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category *</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg 
                   bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-900 dark:text-neutral-100 
                   border border-neutral-300 dark:border-neutral-700"
            placeholder="Enter category"
            required
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block font-medium mb-1">Priority *</label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full p-2 rounded-lg 
                   bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-900 dark:text-neutral-100 
                   border border-neutral-300 dark:border-neutral-700"
            required
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="w-5 h-5 accent-blue-600"
          />
          <label className="font-medium">Active Status</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/milestone/list")}
            className="px-4 py-2 rounded-lg 
                   bg-neutral-300 dark:bg-neutral-700 
                   text-neutral-900 dark:text-neutral-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg 
                   bg-blue-600 text-white hover:bg-blue-700 
                   disabled:opacity-70"
          >
            {loading ? "Creating..." : "Add Milestone"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMilestone;