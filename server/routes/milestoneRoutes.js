import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  createMilestone,
  getAllMilestones,
  getMilestoneById,
  updateMilestone,
  deleteMilestone,
  toggleMilestoneStatus,
} from "../controllers/milestoneControllers.js";

const milestoneRouter = express.Router();

// Protected admin routes
milestoneRouter.post("/create", adminAuth, createMilestone);
milestoneRouter.put("/update/:id", adminAuth, updateMilestone);
milestoneRouter.delete("/delete/:id", adminAuth, deleteMilestone);

// Public routes
milestoneRouter.patch("/:id/toggle", toggleMilestoneStatus);
milestoneRouter.get("/all", getAllMilestones);
milestoneRouter.get("/:id", getMilestoneById);

export default milestoneRouter;