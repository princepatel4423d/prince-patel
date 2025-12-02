import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    sections: {
      type: [String],
      default: [], // e.g., ["header", "footer", "about"]
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
export default SocialMedia;