import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

// GET ALL JOBS 
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort, priority, isRemote } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobLocation: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by status
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  // Filter by type
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  // Filter by priority
  if (priority && priority !== "all") {
    queryObject.priority = priority;
  }
  // Filter by remote work
  if (isRemote && isRemote !== "all") {
    queryObject.isRemote = isRemote === "true";
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
    priority: "-priority createdAt",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const jobs = await Job.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({
      totalJobs,
      numOfPages,
      currentPage: page,
      jobs,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch jobs",
    });
  }
};


// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ job: updatedJob });
};

 // DELETE JOB
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    offer: stats.offer || 0,
    accepted: stats.accepted || 0,
    rejected: stats.rejected || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $group: { _id: "$priority", count: { $sum: 1 } } },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  priorityStats = priorityStats.reduce((acc, curr) => {
    const { _id: priority, count } = curr;
    acc[priority] = count;
    return acc;
  }, {});

  // Monthly applications for the last 12 months
  monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res
    .status(StatusCodes.OK)
    .json({ defaultStats, monthlyApplications, priorityStats });

  
  };
  
  export const getUpcomingInterviews = async (req, res) => {
    try {
      const upcomingInterviews = await Job.find({
        createdBy: req.user.userId,
        interviewDate: {
          $gte: new Date(),
          $lte: day().add(30, "day").toDate(),
        },
        jobStatus: { $in: ["interview", "offer"] },
      })
        .sort({ interviewDate: 1 })
        .limit(10);

      res.status(StatusCodes.OK).json({ upcomingInterviews });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Failed to fetch upcoming interviews",
      });
    }
  };
