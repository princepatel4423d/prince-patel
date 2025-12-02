import express from "express";
import upload from "../middlewares/upload.js";
import adminAuth from "../middlewares/adminAuth.js"
import { 
  createBlog, 
  getAllBlogs, 
  getBlogBySlug, 
  getBlogById,
  updateBlog, 
  deleteBlog,
  getBlogByCategory,
  getBlogByTag,
  likeBlog,
  searchBlogs,
  getRecentBlogs
} from "../controllers/blogControllers.js";

const blogRouter = express.Router();

// Protected admin routes
blogRouter.post("/create", adminAuth, upload.single("image"), createBlog);
blogRouter.put("/update/:id", adminAuth, upload.single("image"), updateBlog);
blogRouter.delete("/delete/:id", adminAuth, deleteBlog);

// Public routes
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/slug/:slug", getBlogBySlug);
blogRouter.get("/id/:id", getBlogById);
blogRouter.get("/category/:category", getBlogByCategory);
blogRouter.get("/tag/:tag", getBlogByTag);
blogRouter.post("/like/:slug", likeBlog);
blogRouter.get("/search", searchBlogs);
blogRouter.get("/recent", getRecentBlogs);

export default blogRouter;