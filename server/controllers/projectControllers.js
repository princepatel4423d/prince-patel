import Project from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createProject = async (req, res) => {
  try {
    const { type, title, description, stackIcon, tags, sourceUrl, demoUrl, likes, date } = req.body;

    if (!type || !title || !description) {
      return res.status(400).json({ success: false, message: "Type, title, and description are required" });
    }

    const newProjectData = {
      type,
      title,
      description,
      stackIcon: stackIcon ? JSON.parse(stackIcon) : [],
      tags: tags ? JSON.parse(tags) : [],
      sourceUrl: sourceUrl || "",
      demoUrl: demoUrl || "",
      likes: likes || 0,
      date: date || Date.now(),
    };

    if (type === "big") {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Image is required for big projects" });
      }

      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });

      newProjectData.image = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
      };
    }

    const newProject = new Project(newProjectData);
    await newProject.save();

    res.status(201).json({ success: true, message: "Project created successfully", data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    const {
      type,
      title,
      description,
      stackIcon,
      tags,
      sourceUrl,
      demoUrl,
      likes,
      date,
    } = req.body;

    project.type = type || project.type;
    project.title = title || project.title;
    project.description = description || project.description;

    // 🔥 FIX: Always parse arrays correctly
    project.stackIcon = stackIcon ? JSON.parse(stackIcon) : project.stackIcon;
    project.tags = tags ? JSON.parse(tags) : project.tags;

    project.sourceUrl = sourceUrl || project.sourceUrl;
    project.demoUrl = demoUrl || project.demoUrl;
    project.likes = likes !== undefined ? likes : project.likes;
    project.date = date || project.date;

    if (project.type === "big" && req.file) {
      project.image = {
        public_id: req.file.public_id,
        url: req.file.url,
      };
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};