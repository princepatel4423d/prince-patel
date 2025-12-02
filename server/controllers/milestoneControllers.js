import Milestone from "../models/milestoneModel.js";

export const createMilestone = async (req, res) => {
  try {
    const { title, description, category, priority, isActive } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const newMilestone = new Milestone({
      title,
      description,
      category,
      priority,
      isActive,
    });

    await newMilestone.save();

    return res.status(201).json({
      success: true,
      message: "Milestone created successfully",
      data: newMilestone,
    });
  } catch (error) {
    console.error("Create Milestone Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to create milestone.",
    });
  }
};

export const getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: milestones.length,
      data: milestones,
    });
  } catch (error) {
    console.error("Get All Milestones Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to fetch milestones.",
    });
  }
};

export const getMilestoneById = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found",
      });
    }

    res.status(200).json({
      success: true,
      data: milestone,
    });
  } catch (error) {
    console.error("Get Milestone By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to fetch milestone.",
    });
  }
};

export const updateMilestone = async (req, res) => {
  try {
    const { title, description, category, priority, isActive } = req.body;

    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found",
      });
    }

    milestone.title = title ?? milestone.title;
    milestone.description = description ?? milestone.description;
    milestone.category = category ?? milestone.category;
    milestone.priority = priority ?? milestone.priority;
    milestone.isActive = isActive ?? milestone.isActive;

    const updatedMilestone = await milestone.save();

    res.status(200).json({
      success: true,
      message: "Milestone updated successfully",
      data: updatedMilestone,
    });
  } catch (error) {
    console.error("Update Milestone Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to update milestone.",
    });
  }
};

export const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found",
      });
    }

    await milestone.deleteOne();

    res.status(200).json({
      success: true,
      message: "Milestone deleted successfully",
    });
  } catch (error) {
    console.error("Delete Milestone Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to delete milestone.",
    });
  }
};

export const toggleMilestoneStatus = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found",
      });
    }

    milestone.isActive = !milestone.isActive;
    await milestone.save();

    res.status(200).json({
      success: true,
      message: `Milestone is now ${
        milestone.isActive ? "Active" : "Inactive"
      }`,
    });
  } catch (error) {
    console.error("Toggle Milestone Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not toggle status.",
    });
  }
};