import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";

const EditWork = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    role: "",
    company: { name: "", link: "" },
    location: { name: "", link: "" },
    startDate: "",
    endDate: "",
    endDateType: "date", // 'date', 'Present', 'Ongoing'
    descriptionItem: "",
    description: [],
    techItem: "",
    techStack: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateNested = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  const addDescription = () => {
    if (!formData.descriptionItem.trim()) return;
    setFormData({
      ...formData,
      description: [...formData.description, formData.descriptionItem.trim()],
      descriptionItem: "",
    });
  };

  const removeDescription = (index) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  const addTech = () => {
    if (!formData.techItem.trim()) return;
    setFormData({
      ...formData,
      techStack: [...formData.techStack, formData.techItem.trim()],
      techItem: "",
    });
  };

  const removeTech = (index) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index),
    });
  };

  const fetchWork = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/work/${id}`);
      const data = await res.json();

      if (data.success) {
        const w = data.work;

        // Determine endDateType
        let endDateType = "date";
        if (w.endDate === "Present" || w.endDate === "Ongoing") {
          endDateType = w.endDate;
        }

        setFormData({
          title: w.title || "",
          role: w.role || "",
          company: {
            name: w.company?.name || "",
            link: w.company?.link || "",
          },
          location: {
            name: w.location?.name || "",
            link: w.location?.link || "",
          },
          startDate: w.startDate ? w.startDate.substring(0, 10) : "",
          endDate: endDateType === "date" && w.endDate ? w.endDate.substring(0, 10) : "",
          endDateType: endDateType,
          description: w.description || [],
          techStack: w.techStack || [],
          descriptionItem: "",
          techItem: "",
        });
      } else {
        toast("Work data not found", "error");
        navigate("/admin/work/list");
      }
    } catch (err) {
      toast("Failed to load work data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.role || !formData.company.name || !formData.startDate) {
      toast("Required fields are missing", "error");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/work/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          role: formData.role,
          company: formData.company,
          location: formData.location,
          startDate: formData.startDate,
          endDate:
            formData.endDateType === "date"
              ? formData.endDate || null
              : formData.endDateType,
          description: formData.description,
          techStack: formData.techStack,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast("Work updated successfully", "success");
        navigate("/admin/work/list");
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Failed to update work experience", "error");
    }
  };

  if (loading)
    return (
      <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg text-neutral-900 dark:text-neutral-100">
      <h1 className="text-3xl font-semibold mb-6">Edit Work / Experience</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title (e.g., Full Stack Developer)"
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          required
        />

        {/* Role */}
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., Intern, Senior Developer)"
          value={formData.role}
          onChange={handleChange}
          className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          required
        />

        {/* Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company.name}
            onChange={(e) => updateNested("company", "name", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            required
          />
          <input
            type="text"
            placeholder="Company Link (optional)"
            value={formData.company.link}
            onChange={(e) => updateNested("company", "link", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Location (City/Country)"
            value={formData.location.name}
            onChange={(e) => updateNested("location", "name", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
          <input
            type="text"
            placeholder="Location Link (optional)"
            value={formData.location.link}
            onChange={(e) => updateNested("location", "link", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </div>

        {/* Dates with dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            required
          />

          <div className="flex gap-2">
            <input
              type="date"
              name="endDate"
              value={formData.endDateType === "date" ? formData.endDate : ""}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              disabled={formData.endDateType !== "date"}
              className="flex-1 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            />
            <select
              value={formData.endDateType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDateType: e.target.value,
                  endDate: e.target.value !== "date" ? e.target.value : formData.endDate,
                })
              }
              className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            >
              <option value="date">Select Date</option>
              <option value="Present">Present</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium mb-1 block text-neutral-900 dark:text-neutral-100">Description</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="descriptionItem"
              placeholder="Add a description point"
              value={formData.descriptionItem}
              onChange={handleChange}
              className="flex-1 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            />
            <button
              type="button"
              onClick={addDescription}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>

          <ul className="mt-2 space-y-2">
            {formData.description.map((d, index) => (
              <li
                key={index}
                className="flex justify-between bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg border border-neutral-300 dark:border-neutral-700"
              >
                <span>{d}</span>
                <button
                  onClick={() => removeDescription(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="font-medium mb-1 block text-neutral-900 dark:text-neutral-100">Tech Stack</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="techItem"
              placeholder="Add a technology"
              value={formData.techItem}
              onChange={handleChange}
              className="flex-1 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            />
            <button
              type="button"
              onClick={addTech}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <ul className="mt-2 flex flex-wrap gap-2">
            {formData.techStack.map((t, index) => (
              <li
                key={index}
                className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg flex items-center gap-2"
              >
                {t}
                <button
                  onClick={() => removeTech(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Update Work
        </button>
      </form>
    </div>
  );
};

export default EditWork;