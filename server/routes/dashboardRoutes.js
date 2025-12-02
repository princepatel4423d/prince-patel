import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import { getAdminDashboard } from "../controllers/dashboardControllers.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/data", adminAuth, getAdminDashboard);

export default dashboardRouter;