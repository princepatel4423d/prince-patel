import express from "express";
import adminAuth from "../middlewares/adminAuth.js"
import {
    createWork,
    getAllWorks,
    getWorkById,
    updateWork,
    deleteWork,
} from "../controllers/workControllers.js";

const workRouter = express.Router();

// Protected admin routes
workRouter.post("/create", adminAuth, createWork);
workRouter.put("/:id", adminAuth, updateWork);
workRouter.delete("/:id", adminAuth, deleteWork);

// Public routes
workRouter.get("/all", getAllWorks);
workRouter.get("/:id", getWorkById);

export default workRouter;