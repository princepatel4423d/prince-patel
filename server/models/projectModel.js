import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["big", "small"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    stackIcon: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    sourceUrl: {
      type: String,
      default: "",
      trim: true,
    },
    demoUrl: {
      type: String,
      default: "",
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
