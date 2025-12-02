import express from "express";
import adminAuth from "../middlewares/adminAuth.js"
import {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation
} from "../controllers/educationControllers.js";

const educationRouter = express.Router();

// Protected admin routes
educationRouter.post("/create", adminAuth, createEducation);
educationRouter.put("/update/:id", adminAuth, updateEducation);
educationRouter.delete("/delete/:id", adminAuth, deleteEducation);

// Public routes
educationRouter.get("/all", getAllEducation);
educationRouter.get("/:id", getEducationById);

export default educationRouter;