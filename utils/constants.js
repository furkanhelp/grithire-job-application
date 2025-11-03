export const JOB_STATUS = {
  PENDING: "pending",
  INTERVIEW: "interview",
  OFFER: "offer",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
};

export const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERNSHIP: "internship",
  CONTRACT: "contract",
  REMOTE: "remote",
  HYBRID: "hybrid",
};

export const JOB_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const JOB_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
  PRIORITY: "priority",
  STATUS: "status",
};


export const JOB_REMOTE = {
  ONSITE: "false",
  REMOTE: "true",
};

// Display labels for better UX
export const JOB_REMOTE_LABELS = {
  [JOB_REMOTE.ONSITE]: "On-site",
  [JOB_REMOTE.REMOTE]: "Remote",
};

export const JOB_PRIORITY_LABELS = {
  [JOB_PRIORITY.LOW]: "Low",
  [JOB_PRIORITY.MEDIUM]: "Medium",
  [JOB_PRIORITY.HIGH]: "High",
};

export const JOB_STATUS_LABELS = {
  [JOB_STATUS.PENDING]: "Pending",
  [JOB_STATUS.INTERVIEW]: "Interview",
  [JOB_STATUS.OFFER]: "Offer",
  [JOB_STATUS.ACCEPTED]: "Accepted",
  [JOB_STATUS.DECLINED]: "Declined",
  [JOB_STATUS.REJECTED]: "Rejected",
  [JOB_STATUS.WITHDRAWN]: "Withdrawn",
};

export const JOB_TYPE_LABELS = {
  [JOB_TYPE.FULL_TIME]: "Full Time",
  [JOB_TYPE.PART_TIME]: "Part Time",
  [JOB_TYPE.INTERNSHIP]: "Internship",
  [JOB_TYPE.CONTRACT]: "Contract",
  [JOB_TYPE.REMOTE]: "Remote",
  [JOB_TYPE.HYBRID]: "Hybrid",
};

export const JOB_SORT_BY_LABELS = {
  [JOB_SORT_BY.NEWEST_FIRST]: "Newest",
  [JOB_SORT_BY.OLDEST_FIRST]: "Oldest",
  [JOB_SORT_BY.ASCENDING]: "A-Z",
  [JOB_SORT_BY.DESCENDING]: "Z-A",
  [JOB_SORT_BY.PRIORITY]: "Priority",
  [JOB_SORT_BY.STATUS]: "Status",
};