import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      name: { type: String, required: true, trim: true },
      link: { type: String, trim: true, default: "" }
    },
    location: {
      name: { type: String, trim: true },
      link: { type: String, trim: true, default: "" }
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: mongoose.Schema.Types.Mixed,
      default: null, 
    },
    description: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", workSchema);
export default Work;