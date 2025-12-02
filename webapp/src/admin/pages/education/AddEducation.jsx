import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";

const AddEducation = () => {
  const { backendUrl } = useContext(AppContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    institute: { name: "", link: "" },
    location: { name: "", link: "" },
    degree: "",
    descriptionItem: "",
    description: [],
    startDate: "",
    endDate: "",
    endDateType: "date",
  });

  // Normal change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update nested field like institute.name
  const updateNested = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  // Add description line
  const addDescription = () => {
    if (!formData.descriptionItem.trim()) return;
    setFormData({
      ...formData,
      description: [...formData.description, formData.descriptionItem.trim()],
      descriptionItem: "",
    });
  };

  // Remove description
  const removeDescription = (index) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.institute.name || !formData.location.name || !formData.degree || !formData.startDate) {
      toast("Required fields are missing", "error");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/education/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          institute: formData.institute,
          location: formData.location,
          degree: formData.degree,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDateType === "date" ? formData.endDate : formData.endDateType,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast("Education added successfully", "success");
        navigate("/admin/education/list");
      } else {
        toast(data.message, "error");
      }
    } catch (error) {
      toast("Failed to add education", "error");
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg text-neutral-900 dark:text-neutral-100">
      <h1 className="text-3xl font-semibold mb-6">Add Education</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Education Title (e.g., Bachelor of Science)"
          value={formData.title}
          onChange={handleChange}
          className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          required
        />

        {/* Degree */}
        <input
          type="text"
          name="degree"
          placeholder="Degree (e.g., B.Tech, M.Sc)"
          value={formData.degree}
          onChange={handleChange}
          className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          required
        />

        {/* Institute */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Institute Name"
            value={formData.institute.name}
            onChange={(e) => updateNested("institute", "name", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            required
          />
          <input
            type="text"
            placeholder="Institute Link (optional)"
            value={formData.institute.link}
            onChange={(e) => updateNested("institute", "link", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Location (City / Country)"
            value={formData.location.name}
            onChange={(e) => updateNested("location", "name", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            required
          />
          <input
            type="text"
            placeholder="Location Link (optional)"
            value={formData.location.link}
            onChange={(e) => updateNested("location", "link", e.target.value)}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          {/* Start Date */}
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700"
            required
          />

          {/* End Date with dropdown */}
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Add Education
        </button>
      </form>
    </div>
  );
};

export default AddEducation;