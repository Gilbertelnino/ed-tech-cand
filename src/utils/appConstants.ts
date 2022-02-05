
export const REDUX_STORE_NAME = "EH65X19P";

export const fetchSessionIgnoreList = ["/profile/view", "/profile"];

export const userRoles = {
  ADMIN_ROLE: {
    id: 1,
    title: "admin"
  },
  CANDIDATE_ROLE: {
    id: 2,
    title: "candidate"
  },
  COMPANY_ROLE: {
    id: 3,
    title: "company"
  }
}

export const companyUserAccessLevel = {
  SUPER_ADMIN: {
    id: 1,
    title: "Super admin"
  },
  CONTENT_ADMIN: {
    id: 2,
    title: "Content admin"
  },
  ANALYST: {
    id: 3,
    title: "Analyst"
  }
}


/**
 * Use common statuses across the Application, Mainly use for Active and Inactive flag
 *
 */
export const commonStatuses = {
  ACTIVE: {
    id: 1,
    title: "active"
  },
  INACTIVE: {
    id: 2,
    title: "inactive"
  }
}

/* job types */

export const jobTypes = {
  PART_TIME: {
    id: 1,
    title: "Part-time"
  },
  FULL_TIME: {
    id: 2,
    title: "Full-time"
  },
  CONTRACT: {
    id: 3,
    title: "Contract"
  },
  INTERNSHIP: {
    id: 4,
    title: "Internship"
  },
}

export const timeDurations = {
  WEEK: {
    id: 1,
    title: "week"
  },
  MONTH: {
    id: 2,
    title: "month"
  },
  ALL: {
    id: 3,
    title: "all"
  }
}

export const WorkStatusType = [
  { label: "US Citizen", value: "US Citizen" },
  { label: "Foreign National", value: "Foreign National" },
  { label: "CW 1", value: "CW 1" },
  { label: "CW 2", value: "CW 2" },
  { label: "E1", value: "E1" },
  { label: "E2", value: "E2" },
  { label: "E2 C", value: "E2 C" },
  { label: "E3", value: "E3" },
  { label: "EAD", value: "EAD" },
  { label: "H1 B", value: "H1 B" },
  { label: "H1 B2", value: "H1 B2" },
  { label: "H3", value: "H3" },
  { label: "I", value: "I" },
  { label: "L1 A", value: "L1 A" },
  { label: "L1 B", value: "L1 B" },
  { label: "L2", value: "L2" },
  { label: "O1", value: "O1" },
  { label: "O2", value: "O2" },
  { label: "O3", value: "O3" },
  { label: "OPT", value: "OPT" },
  { label: "P1 A", value: "P1 A" },
  { label: "P1 B", value: "P1 B" },
  { label: "P3", value: "P3" },
  { label: "P4", value: "P4" },
  { label: "Q1", value: "Q1" },
  { label: "R1", value: "R1" },
  { label: "R2", value: "R2" },
  { label: "TN", value: "TN" },
  { label: "TD", value: "TD" }
]

export const ImageTypes = [".jpg", "jpeg", ".png"];

/**
 * Job applications company status
 *
 */
export const companyApplicationStatuses = {
  QUALIFIED: {
    id: 1,
    title: "qualified",
  },
  CONTACTED: {
    id: 2,
    title: "contacted",
  },
  SCREENING: {
    id: 3,
    title: "screening",
  },
  INTERVIEWED: {
    id: 4,
    title: "interviewed",
  },
  HIRED: {
    id: 5,
    title: "hired",
  },
  REJECTED: {
    id: 6,
    title: "rejected",
  },
};

/**
 * Job application statuses
 *
 */
export const jobApplicationStatuses = {
  APPLIED: {
    id: 1,
    title: "applied",
  },
  SAVED: {
    id: 2,
    title: "saved",
  },
};

/**
 * Candidate Favorite or not boolean
 *
 */
export const candidateFavoriteStatus = {
  FAVORITE: {
    id: 1,
    title: "favorite",
  },
  UNFAVORITE: {
    id: 2,
    title: "unfavorite",
  },
};

export const CandidateColors = {
  DEEP_PINK: "#FF0990",
  LIGHT_PINK: "#FFCCCC",
  HIRED_COLOR: "#C2EE99",
  REJECTED_COLOR: "#1966DD",
}

export const FileTypes: { [key: string]: string } = {
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
}

export const ImageMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
export const VideoMimeTypes = ['video/mp4', 'video/quicktime'];

/**
 * Job salary term
 *
 */
export const jobSalaryTerms = [
  {
    value: "per_hour",
    label: "Per Hour"
  },
  {
    value: "annually",
    label: "Annual"
  }
]

/**
 * All the MB conversion are made in bytes
 *
 */
export const bytesMb = {
  "mb_1": 1048576,
  "mb_2": 2097152,
  "mb_3": 3145728,
  "mb_4": 4194304,
  "mb_5": 5242880,
  "mb_10": 10485760,
  "mb_30": 31457280,
  "mb_50": 52428800,
};

/**
 * How many video can be uploaded by candidate
 *
 */
export const FINAL_VIDEO_DURATION_LIMIT = 60; // seconds
export const VIDEO_STUDIO_UPLOAD_LIMIT = 3;
export const VIDEO_STUDIO_FILE_ADD_LIMIT = 4;
export const MIN_VIDEO_DURATION_SEC = 5;
export const VIDEO_THUMB_BAR_WIDTH = 900;
export const ALLOW_VIDEO_MIN_HEIGHT = 576;
export const ALLOW_VIDEO_MIN_WIDTH = 720;
