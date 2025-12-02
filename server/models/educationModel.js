import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    institute: {
      name: { type: String, required: true, trim: true },
      link: { type: String, trim: true },
    },

    location: {
      name: { type: String, required: true, trim: true },
      link: { type: String, trim: true },
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: [String],
      default: [],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: mongoose.Schema.Types.Mixed,
      default: "Present",
    }
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
export default Education;
