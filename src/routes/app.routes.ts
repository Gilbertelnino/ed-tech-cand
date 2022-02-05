// Define Application's all routes here, Make sure they are grouped by with their parent

import { getAppDomain } from "../utils/helper";

export const adminPrefix: string = "admin";
export const companyPrefix: string = "employer";
export const candidatePrefix: string = "c";
export const candidateProfilePrefix: String = "profile";

const appDomainFull = getAppDomain({ protocol: true });
const appDomain = getAppDomain();


const appRoutes = {

  defaultUIPage: {
    title: "UI Page",
    path: "/ui-elements-employ-her-default-layout"
  },
  companyUIPage: {
    title: "UI Page",
    path: "/ui-elements-employ-her-company-layout"
  },

  // Home Routes
  home: {
    title: "Home",
    path: "/"
  },
  userLogin: {
    title: "Log In",
    path: "/login"
  },
  userSignUp: {
    title: "Sign Up",
    path: "/sign-up"
  },
  userVerify: {
    title: "Verify",
    path: "/verify/:token",
    generatePath: (token: string = "") => `/verify/${token}`
  },
  userForgotPassword: {
    title: "Forgot Password",
    path: "/forgot-password"
  },
  userResetPassword: {
    title: "Reset Your Password",
    path: "/reset-password/:token"
  },
  privacyPolicy: {
    title: "Privacy policy",
    path: "/privacy-hub/:tab",
    generatePath: () => "/privacy-hub/privacy-policy"
  },
  termsOfService: {
    title: "Terms of Service",
    path: "/privacy-hub/:tab",
    generatePath: () => "/privacy-hub/terms-of-service"
  },
  cookiePolicy: {
    title: "Cookie Policy",
    path: "/privacy-hub/:tab",
    generatePath: () => "/privacy-hub/cookie-policy"
  },
  contactUs: {
    title: "Contact Us",
    path: "/contact-us"
  },
  jobDetail:{
    title: "Job detail",
    path: '/jobs/:slug',
    generatePath:(slug:string)=>`${window.location.protocol}//${window.location.host}/jobs/${slug}`
  },
  candidatePublicProfile: {
    path: `/${candidateProfilePrefix}/view/:slug`,
    generatePath: (slug: string) => `${appDomain}${candidateProfilePrefix}/view/${slug}`,
    generateFullPath: (slug: string) => `${appDomainFull}${candidateProfilePrefix}/view/${slug}`,
  },
  // Company Routes
  companyDashboard: {
    title: "Company",
    path: `/${companyPrefix}/dashboard`
  },
  companyBasicInfo: {
    title: "Basic Info",
    path: `/${companyPrefix}/basic-info`
  },
  companyAdminInviteBasicInfo: {
    title: "Basic Info",
    path: `/${companyPrefix}/admin-basic-info/:token`
  },
  companyCandidates: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates`
  },
  companyCandidates2: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/view`
  },
  companyCandidateFavorite: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/favorite`
  },
  companyCandidateQualified: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/qualified`
  },
  companyCandidateInterviewed: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/interviewed`
  },
  companyCandidateContacted: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/contacted`
  },
  companyCandidateScreening: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/screening`
  },
  companyCandidateHired: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/hired`
  },
  companyCandidateRejected: {
    title: "Candidates",
    path: `/${companyPrefix}/candidates/rejected`
  },
  companyJobs: {
    title: "Jobs",
    path: `/${companyPrefix}/jobs`
  },
  companyJobsArchive: {
    title: "Jobs",
    path: `/${companyPrefix}/jobs/archive`
  },
  companyJobsDrafts: {
    title: "Jobs",
    path: `/${companyPrefix}/jobs/drafts`
  },
  companyPage: {
    title: "Page",
    path: `/${companyPrefix}/page`
  },
  companyPageHome: {
    title: "Page",
    path: `/${companyPrefix}/page/home`
  },
  companyPagePeople: {
    title: "Page",
    path: `/${companyPrefix}/page/people`
  },
  companyPageJobs: {
    title: "Page",
    path: `/${companyPrefix}/page/jobs`
  },
  companyPageNews: {
    title: "Page",
    path: `/${companyPrefix}/page/news`
  },
  companyPageEvents: {
    title: "Page",
    path: `/${companyPrefix}/page/events`
  },
  companyPublicPage: {
    title: "Page",
    path: `/${companyPrefix}/profile/view/:slug`
  },
  companyPublicPageHome: {
    title: "Page",
    path: `/${companyPrefix}/profile/home/:slug`,
    generatePath: (slug: string) => `${appDomainFull}${companyPrefix}/profile/home/${slug}`
  },
  companyPublicPagePeople: {
    title: "Page",
    path: `/${companyPrefix}/profile/people/:slug`,
    generatePath: (slug: string) => `${appDomainFull}${companyPrefix}/profile/people/${slug}`
  },
  companyPublicPageJobs: {
    title: "Page",
    path: `/${companyPrefix}/profile/jobs/:slug`,
    generatePath: (slug: string) => `${appDomainFull}${companyPrefix}/profile/jobs/${slug}`
  },
  companyPublicPageNews: {
    title: "Page",
    path: `/${companyPrefix}/profile/news/:slug`
  },
  companyPublicPageEvents: {
    title: "Page",
    path: `/${companyPrefix}/profile/events/:slug`
  },
  companyAdmins: {
    title: "Jobs",
    path: `/${companyPrefix}/admins`
  },
  companyAdminsInHouse: {
    title: "Jobs",
    path: `/${companyPrefix}/admins/in-house`
  },
  companyAdminsAgencies: {
    title: "Jobs",
    path: `/${companyPrefix}/admins/agencies`
  },
  companyMessages: {
    title: "Messages",
    path: `/${companyPrefix}/messages`
  },
  // companyMessageCandidates: {
  //   title: "Messages",
  //   path: `/${companyPrefix}/messages/candidates`
  // },
  // companyMessageAdmins: {
  //   title: "Messages",
  //   path: `/${companyPrefix}/messages/admins`
  // },
  // companyMessageMessageRequests: {
  //   title: "Messages",
  //   path: `/${companyPrefix}/messages/message-requests`
  // },
  companySettings: {
    title: "Settings",
    path: `/${companyPrefix}/settings`
  },

  //Search and Connect
  searchAndConnect: {
    title: "Search And Connect",
    path: `/${candidatePrefix}/search-and-connect`
  },

  connectionNotifications: {
    title: "Notifications",
    path: `/notifications`
  },

  // Admin

  // Candidates
  candidateProfile: {
    title: "createProfile",
    path: `/${candidateProfilePrefix}`
  },

  candidateVideos: {
    title: "Video Studio",
    path: "/video-studio"
  },

  candidateCreateVideo: {
    title: "Create Video",
    path: "/video-studio/create"
  },
  candidateEditVideo: {
    title: "Edit Video",
    path: "/video-studio/edit/:id"
  },
  candidateMessages: {
    title: "Messages",
    altPath: `/messages`,
    path: `/messages/:chatRoom?`
  },

  jobLists: {
    title: "jobLists",
    path: `/${candidateProfilePrefix}/jobs-list`
  },
  candidateProfileView: {
    title: "Candidate Profile",
    path: `/${candidateProfilePrefix}/view`
  },
  companyHome: {
    title: "Company Home",
    path: `${companyPrefix}/test-home`
  },

  // Candidate Job Search
  candidateJobSearch: {
    title: "Careers",
    path: `/${candidatePrefix}/jobs`
  },

  candidateConnections: {
    title: "Connections",
    path: `/${candidatePrefix}/connections`
  },
  candidateJobHub:{
    title:"Job hub",
    path:`/${candidatePrefix}/job-hub`
  },
  // Etc...
  // anonymous: {
  //   title: "anonymous",
  //   path: `/*`
  // }

  notFoundError: {
    title: "Not Found",
    path: `/errors/not-found`
  },
  internalError: {
    title: "Internal Server",
    path: `/errors/internal-server`
  },
  unauthorizedError: {
    title: "Unauthorized Error",
    path: `/errors/unauthorized`
  },


}



export default appRoutes;
