import express from "express";
import adminAuth from "../middlewares/adminAuth.js"
import {
  createSocialMedia,
  getAllSocialMedia,
  getSocialMediaById,
  updateSocialMedia,
  deleteSocialMedia,
  toggleSocialMediaStatus
} from "../controllers/socialMediaControllers.js";

const socialRouter = express.Router();

socialRouter.post("/create", adminAuth, createSocialMedia);
socialRouter.put("/update/:id", adminAuth, updateSocialMedia);
socialRouter.delete("/delete/:id", adminAuth, deleteSocialMedia);

socialRouter.get("/all", getAllSocialMedia);
socialRouter.get("/:id", getSocialMediaById);
socialRouter.patch("/:id/toggle", toggleSocialMediaStatus);

export default socialRouter;