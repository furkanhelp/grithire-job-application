import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobSortBy: {
      type: String,
      enum: Object.values(JOB_SORT_BY),
      default: JOB_SORT_BY.NEWEST_FIRST,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      required: [true, "Job location is required"],
      default: "my city",
    },
    jobDescription: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    salary: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    requirements: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    benefits: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    contactEmail: {
      type: String,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    applicationUrl: {
      type: String,
      trim: true,
    },
    applicationDeadline: {
      type: Date,
    },
    interviewDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


JobSchema.index({ createdBy: 1, jobStatus: 1 });
JobSchema.index({ createdBy: 1, createdAt: -1 });

export default mongoose.model("Job", JobSchema);
