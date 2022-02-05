/**
* API url end point group by modules
*
*/
const API_URLS = {

  // Auth
  emailVerificationCode: "/session/request-verification-code",
  candidateSignUp: "/session/sign-up/candidate",
  changePassword: "/session/change-password",
  forgotPassword: "/session/forgot-password",
  companySignUp: "/session/sign-up/company",
  resetPassword: "/session/reset-password",
  verifyUserEmail: "/session/verify",
  login: "/session/login",
  logout: "/session/logout",
  sessionProfile: "/session/profile",
  feedback: "/feedback",

  // Jobs


  // Candidate
  search: "/search-and-connect/search",
  searchAll: "/search-and-connect/search-all",
  sendInvitation: "/search-and-connect/send-connection",
  getCandidateProfile: "/candidates/profile/public",
  followCompany: "/search-and-connect/company-connection",
  getReceivedConnectionRequests: "/search-and-connect/connection-requests",
  updateCandidateConnection: "/search-and-connect/update-connection",
  connectionNotificationList: "/connection-notification",
  clearNotification: "/connection-notification",

  // Company
  jobs: "/jobs",
  public: "/open",
  people: "/people",
  jobPublicUrl: "/companies/profile/public/:slug/jobs",
  jobDetailsPublicUrl: "/jobs/details/:slug",
  peoplePublicUrl: "/companies/profile/public/:slug/people",
  currencies: "/currencies",
  jobTypes: "/job-types",
  companies: "/companies",
  jobLevels: "/job-levels",
  industries: "/industries",
  jobTitles: "/job-titles/",
  candidates: "/candidates/",
  departments: "/departments/",
  jobDepartments: "/job-departments",
  jobStatuses: "/job-statuses",
  assetUpload: "/asset-upload/",
  employeeSize: "/employee-size",
  salaryRanges: "/job-salary-ranges",
  jobApplications: "/job-applications/",
  videoStudio: "/video-studio",
  messages: "/messages",
};

export default API_URLS;
