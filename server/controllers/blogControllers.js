import blogModel from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      tags,
      readTime,
    } = req.body;

    if (!title || !description || !content || !category || !readTime) {
      return res.json({
        success: false,
        message: "Must be provide required fields",
      });
    }

    if (!req.file) {
      return res.json({
        success: false,
        message: "Blog image is required",
      });
    }

    const slug = generateSlug(title);

    const existingBlog = await blogModel.findOne({ slug });
    if (existingBlog) {
      return res.json({
        success: false,
        message: "blog already exists",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
    });

    const newBlog = new blogModel({
      title,
      slug,
      description,
      content,
      category,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      readTime,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
    });

    await newBlog.save();

    res.json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ date: -1 });

    return res.json({
      success: true,
      blogs
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await blogModel.findOne({ slug });

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.json({
      success: true,
      blog
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      content,
      category,
      tags,
      readTime
    } = req.body;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    let updatedSlug = blog.slug;

    if (title && title !== blog.title) {
      updatedSlug = generateSlug(title);

      const existingSlug = await blogModel.findOne({
        slug: updatedSlug,
        _id: { $ne: id }
      });

      if (existingSlug) {
        return res.json({
          success: false,
          message: "A blog with this title already exists",
        });
      }
    }

    let updatedImage = blog.image;

    if (req.file) {
      await cloudinary.uploader.destroy(blog.image.public_id);

      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs"
      });

      updatedImage = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url
      };
    }

    blog.title = title ?? blog.title;
    blog.slug = updatedSlug;
    blog.description = description ?? blog.description;
    blog.content = content ?? blog.content;
    blog.category = category ?? blog.category;
    blog.tags = tags ? tags.split(",").map(tag => tag.trim()) : blog.tags;
    blog.readTime = readTime ?? blog.readTime;
    blog.image = updatedImage;

    await blog.save();

    return res.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.image && blog.image.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    await blogModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const blogs = await blogModel.find({ category }).sort({ date: -1 });

    return res.json({
      success: true,
      blogs
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const getBlogByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    const blogs = await blogModel.find({ tags: tag }).sort({ date: -1 });

    return res.json({
      success: true,
      blogs
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await blogModel.findOne({ slug });
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found"
      });
    }

    blog.likes += 1;
    await blog.save();

    return res.json({
      success: true,
      likes: blog.likes,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;

    const blogs = await blogModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ]
    });

    return res.json({
      success: true,
      blogs,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const getRecentBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ date: -1 }).limit(5);

    return res.json({
      success: true,
      blogs,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};
