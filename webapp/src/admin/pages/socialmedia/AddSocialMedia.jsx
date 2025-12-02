import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

const AddSocialMedia = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState(""); // comma separated
  const [icon, setIcon] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!platform || !username || !link || !icon) {
      toast("Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        platform,
        username,
        link,
        description,
        icon,
        isActive,
        sections: sections
          ? sections.split(",").map((s) => s.trim())
          : [],
      };

      const res = await fetch(`${backendUrl}/api/social/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast("Social media link created successfully", "success");
        navigate("/admin/social/list");
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg text-neutral-900 dark:text-neutral-100">
      <h2 className="text-2xl font-semibold mb-6">Add Social Media</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Platform */}
        <div>
          <label className="block font-medium mb-1">Platform *</label>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            placeholder="e.g. Instagram, LinkedIn, GitHub"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium mb-1">Username *</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            placeholder="@yourhandle"
            required
          />
        </div>

        {/* Link */}
        <div>
          <label className="block font-medium mb-1">Profile Link *</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            placeholder="https://profile.com/username"
            required
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block font-medium mb-1">Icon (URL or class) *</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            placeholder="e.g. https://cdn/icon.png OR bi-instagram"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            rows="3"
            placeholder="Short description (optional)"
          />
        </div>

        {/* Sections */}
        <div>
          <label className="block font-medium mb-1">Sections (comma separated)</label>
          <input
            type="text"
            value={sections}
            onChange={(e) => setSections(e.target.value)}
            className="w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            placeholder="header, footer, about"
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="w-5 h-5 accent-blue-600 dark:accent-blue-500"
          />
          <label className="font-medium">Active Status</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/social/list")}
            className="px-4 py-2 rounded-lg bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Add Social Media"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSocialMedia;