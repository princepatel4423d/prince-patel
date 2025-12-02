import Work from "../models/workModel.js";

export const createWork = async (req, res) => {
  try {
    const {
      title,
      role,
      company,
      location,
      startDate,
      endDate,
      description,
      techStack,
    } = req.body;

    if (!title || !role || !company?.name || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Title, role, company name, and start date are required",
      });
    }

    const newWork = new Work({
      title,
      role,
      company,
      location,
      startDate,
      endDate,
      description,
      techStack,
    });

    await newWork.save();

    res.status(201).json({
      success: true,
      message: "Work/Experience added successfully",
      work: newWork,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, works });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res
        .status(404)
        .json({ success: false, message: "Work not found" });
    }
    res.status(200).json({ success: true, work });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res
        .status(404)
        .json({ success: false, message: "Work not found" });
    }

    const {
      title,
      role,
      company,
      location,
      startDate,
      endDate,
      description,
      techStack,
    } = req.body;

    if (title) work.title = title;
    if (role) work.role = role;
    if (company) work.company = company;
    if (location) work.location = location;
    if (startDate) work.startDate = startDate;
    if (endDate !== undefined) work.endDate = endDate;
    if (description) work.description = description;
    if (techStack) work.techStack = techStack;

    await work.save();

    res.status(200).json({
      success: true,
      message: "Work/Experience updated successfully",
      work,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res
        .status(404)
        .json({ success: false, message: "Work not found" });
    }

    await work.remove();

    res.status(200).json({
      success: true,
      message: "Work/Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};