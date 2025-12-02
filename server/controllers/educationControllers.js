import Education from "../models/educationModel.js";

export const createEducation = async (req, res) => {
  try {
    const { title, institute, location, degree, description, startDate, endDate } = req.body;

    if (!title || !institute || !institute.name || !location || !location.name || !degree || !startDate) {
      return res.status(400).json({ success: false, message: "Required fields are missing." });
    }

    const newEducation = await Education.create({
      title,
      institute,
      location,
      degree,
      description: description || [],
      startDate,
      endDate,
    });

    res.status(201).json({ success: true, message: "Education created successfully.", education: newEducation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEducation = async (req, res) => {
  try {
    const educations = await Education.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, education: educations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findById(id);

    if (!education) {
      return res.status(404).json({ success: false, message: "Education not found." });
    }

    res.status(200).json({ success: true, education });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, institute, location, degree, description, startDate, endDate } = req.body;

    const updatedEducation = await Education.findByIdAndUpdate(
      id,
      {
        title,
        institute,
        location,
        degree,
        description,
        startDate,
        endDate,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({ success: false, message: "Education not found." });
    }

    res.status(200).json({ success: true, message: "Education updated successfully.", education: updatedEducation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEducation = await Education.findByIdAndDelete(id);

    if (!deletedEducation) {
      return res.status(404).json({ success: false, message: "Education not found." });
    }

    res.status(200).json({ success: true, message: "Education deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
