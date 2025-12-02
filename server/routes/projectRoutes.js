import express from "express";
import upload from "../middlewares/upload.js";
import adminAuth from "../middlewares/adminAuth.js"
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectControllers.js";

const projectRouter = express.Router();

// Protected admin routes
projectRouter.post("/create", adminAuth, upload.single("image"), createProject);
projectRouter.put("/update/:id", adminAuth, upload.single("image"), updateProject);
projectRouter.delete("/delete/:id", adminAuth, deleteProject);

// Public routes
projectRouter.get("/all", getAllProjects);
projectRouter.get("/:id", getProjectById);

export default projectRouter;
