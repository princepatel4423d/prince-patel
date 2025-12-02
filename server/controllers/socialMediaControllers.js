import SocialMedia from "../models/socialMediaModel.js";

export const createSocialMedia = async (req, res) => {
  try {
    const { platform, username, link, description, sections, isActive, icon } = req.body;

    if (!platform || !username || !link || !icon) {
      return res.status(400).json({ success: false, message: "Platform, username, link, and icon are required" });
    }

    const newSocial = new SocialMedia({
      platform,
      username,
      link,
      description: description || "",
      sections: sections || [],
      isActive: isActive !== undefined ? isActive : true,
      icon
    });

    await newSocial.save();

    res.status(201).json({ success: true, message: "Social media link created successfully", data: newSocial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSocialMedia = async (req, res) => {
  try {
    const socialMediaLinks = await SocialMedia.find().sort({ platform: 1 });
    res.status(200).json({ success: true, data: socialMediaLinks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSocialMediaById = async (req, res) => {
  try {
    const social = await SocialMedia.findById(req.params.id);
    if (!social) return res.status(404).json({ success: false, message: "Social media link not found" });
    res.status(200).json({ success: true, data: social });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSocialMedia = async (req, res) => {
  try {
    const { platform, username, link, description, sections, isActive, icon } = req.body;

    const social = await SocialMedia.findById(req.params.id);
    if (!social) return res.status(404).json({ success: false, message: "Social media link not found" });

    social.platform = platform !== undefined ? platform : social.platform;
    social.username = username !== undefined ? username : social.username;
    social.link = link !== undefined ? link : social.link;
    social.description = description !== undefined ? description : social.description;
    social.sections = sections !== undefined ? sections : social.sections;
    social.isActive = isActive !== undefined ? isActive : social.isActive;
    social.icon = icon !== undefined ? icon : social.icon;

    await social.save();

    res.status(200).json({ success: true, message: "Social media link updated successfully", data: social });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSocialMedia = async (req, res) => {
  try {
    const social = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!social) return res.status(404).json({ success: false, message: "Social media link not found" });

    res.status(200).json({ success: true, message: "Social media link deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleSocialMediaStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const social = await SocialMedia.findById(id);
    if (!social)
      return res.status(404).json({ success: false, message: "Not found" });

    social.isActive = !social.isActive;
    await social.save();

    return res.status(200).json({
      success: true,
      message: `Social media is now ${social.isActive ? "Active" : "Inactive"}`,
      data: social,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};