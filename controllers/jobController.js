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
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Job not found",
      });
    }

    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    console.error("Get job error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch job",
    });
  }
};

// EDIT JOB
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if job exists and belongs to user
    const job = await Job.findOne({ _id: id, createdBy: req.user.userId });

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({ job: updatedJob });
  } catch (error) {
    console.error("Update job error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: error.message,
    });
  }
};

 // DELETE JOB
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

//STATS
export const showStats = async (req, res) => {
  try {
    // 1. Basic status counts
    let stats = await Job.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: "$jobStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // 2. Job type distribution
    let jobTypeStats = await Job.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: "$jobType",
          count: { $sum: 1 },
        },
      },
    ]);

    // 3. Priority distribution
    let priorityStats = await Job.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    // 4. Remote vs On-site
    let remoteStats = await Job.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: "$isRemote",
          count: { $sum: 1 },
        },
      },
    ]);

    // 5. Monthly applications (last 12 months for more data)
    let monthlyApplications = await Job.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 12, // Last 12 months for more data points
      },
    ]);

    // 6. Application success rate (interview/offer/accepted vs total)
    const totalJobs = await Job.countDocuments({
      createdBy: new mongoose.Types.ObjectId(req.user.userId),
    });

    const successfulJobs = await Job.countDocuments({
      createdBy: new mongoose.Types.ObjectId(req.user.userId),
      jobStatus: { $in: ["interview", "offer", "accepted"] },
    });

    const successRate = totalJobs > 0 ? (successfulJobs / totalJobs) * 100 : 0;

    // 7. Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await Job.countDocuments({
      createdBy: new mongoose.Types.ObjectId(req.user.userId),
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Format the data
    const defaultStats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const jobTypeDistribution = jobTypeStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const priorityDistribution = priorityStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const remoteDistribution = remoteStats.reduce((acc, curr) => {
      const key = curr._id ? "remote" : "onsite";
      acc[key] = curr.count;
      return acc;
    }, {});

    // Format monthly applications
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;

        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YYYY");

        return { date, count };
      })
      .reverse();

    res.status(StatusCodes.OK).json({
      defaultStats,
      monthlyApplications,
      additionalStats: {
        totalJobs,
        successRate: Math.round(successRate),
        recentActivity,
        jobTypeDistribution,
        priorityDistribution,
        remoteDistribution,
        successfulJobs,
        responseRate:
          totalJobs > 0 ? Math.round((successfulJobs / totalJobs) * 100) : 0,
        averageApplicationsPerMonth:
          monthlyApplications.length > 0
            ? Math.round(
                monthlyApplications.reduce((sum, item) => sum + item.count, 0) /
                  monthlyApplications.length
              )
            : 0,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: error.message,
    });
  }
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
