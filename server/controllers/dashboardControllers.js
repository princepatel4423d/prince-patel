import Blog from "../models/blogModel.js";
import Project from "../models/projectModel.js";
import Work from "../models/workModel.js";
import Education from "../models/educationModel.js";
import SocialMedia from "../models/socialMediaModel.js";
import Milestone from "../models/milestoneModel.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // Counts
    const blogs = await Blog.countDocuments();
    const projects = await Project.countDocuments();
    const work = await Work.countDocuments();
    const educationCount = await Education.countDocuments();
    const socialLinksCount = await SocialMedia.countDocuments();
    const milestonesCount = await Milestone.countDocuments();

    // Latest entries (only blog, project, work)
    const latestBlog = await Blog.findOne().sort({ createdAt: -1 });
    const latestProject = await Project.findOne().sort({ createdAt: -1 });
    const latestWork = await Work.findOne().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      stats: {
        blogs,
        projects,
        work,
        education: educationCount,
        socialLinks: socialLinksCount,
        milestones: milestonesCount,
      },
      latest: {
        blog: latestBlog,
        project: latestProject,
        work: latestWork,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};