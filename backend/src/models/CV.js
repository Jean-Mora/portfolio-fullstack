import mongoose from "mongoose";

const CVSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      bio: String,
      about: String,
      email: { type: String, required: true },
      phone: String,
      github: String,
      linkedin: String,
      portfolio: String,
    },

    skills: [String],

    experience: [
      {
        position: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
        achievements: [String],
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    projects: [
      {
        name: String,
        description: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("CV", CVSchema);
