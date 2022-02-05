import React from "react";
import { Switch } from "react-router-dom";
import RoutesContainer from "./RoutesContainer";
import appRoutes from "./app.routes";
//import CompanyLayout from "../pages/layouts/Company";
import CompanyLayout from "../Layouts/CompanyLayout";
import DefaultLayout from "../pages/layouts/Default";
import CandidateLayout from "../pages/layouts/Candidate";
import DefaultLayoutNew from '../Layouts/DefaultLayout';

import CompanyDashboard from "./../pages/Dashboard/CompanyDashboard";
import Candidates from "./../pages/Candidates";
//import Jobs from "./../pages/Jobs";
import Jobs from "./../pages/CompanyJobs";
import Page from "./../pages/Page";
//import People from "./../pages/People";
import People from "./../pages/CompanyPeople";
import Messages from "./../pages/Messages";
import Settings from "./../pages/Settings";
import CandidateProfile from "./../pages/CandidateProfile";
import CandidateProfileView from "./../pages/CandidateProfile/Profile";
import CandidatesListing from "./../pages/Company/index";
import searchAndConnect from "./../pages/SearchAndConnect";
import JobsGrid from "./../pages/Jobs/components/grid";
import CandidateVideos from "../pages/videoStudio/index"
import CandidateCreateVideo from "../pages/videoStudio/components/CreateVideo"
import jobLists from "../pages/candidateJobs";
import CompanyBasicInfo from "../pages/Company/components/BasicInfo";
import BasicLayout from "../pages/layouts/BasicLayout/index";
import CompanyHomePage from "./../pages/CompanyHome";
import CompanyCandidates from "../pages/CompanyAdminPages/CompanyCandidates/index";
import CompanyAdmins from "./../pages/CompanyAdmins";
import CompanyNews from "./../pages/News";
import CompanyEvents from "./../pages/Events";
import CandidateConnections from "./../pages/CandidateConnections";
import ConnectionNotifications from "./../pages/CandidateNotifications";
import JobHub from "../pages/JobHub";

const routes = [
  {
    path: appRoutes.companyDashboard.path,
    exact: true, component: CompanyDashboard, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyHome.path,
    exact: true, component: CompanyHomePage, layout: DefaultLayout, secured: false
  },
  // {
  //   path: appRoutes.companyCandidates2.path, // temp use by Anju
  //   exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  // },
  {
    path: appRoutes.companyCandidates.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateFavorite.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateQualified.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateInterviewed.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateHired.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateRejected.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateContacted.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyCandidateScreening.path,
    exact: true, component: CompanyCandidates, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyJobs.path,
    exact: true, component: Jobs, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyJobsArchive.path,
    exact: true, component: Jobs, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyJobsDrafts.path,
    exact: true, component: Jobs, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyPage.path,
    exact: true, component: Page, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyPageHome.path,
    exact: true, component: Page, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyPagePeople.path,
    exact: true, component: People, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyPageJobs.path,
    exact: true, component: JobsGrid, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyPageNews.path,
    exact: true, component: CompanyNews, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyPageEvents.path,
    exact: true, component: CompanyEvents, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyAdmins.path,
    exact: true, component: CompanyAdmins, layout: CompanyLayout, access: { level: "company" }
  },
  {
    path: appRoutes.companyMessages.path,
    exact: true, component: Messages, layout: CompanyLayout, access: { level: "company" }
  },
  // {
  //   path: appRoutes.companyMessageCandidates.path,
  //   exact: true, component: Messages, layout: CompanyLayout, access: { level: "company" }
  // },
  // {
  //   path: appRoutes.companyMessageAdmins.path,
  //   exact: true, component: Messages, layout: CompanyLayout, access: { level: "company" }
  // },
  // {
  //   path: appRoutes.companyMessageMessageRequests.path,
  //   exact: true, component: Messages, layout: CompanyLayout, access: { level: "company" }
  // },
  // {
  //   path: appRoutes.companySettings.path,
  //   exact: true, component: Settings, layout: CompanyLayout, access: { level: "company" }
  // },
  {
    path: appRoutes.companyBasicInfo.path,
    exact: true, component: CompanyBasicInfo, layout: BasicLayout, access: { level: "company" }
  },
  {
    path: appRoutes.candidateProfile.path,
    exact: true, component: CandidateProfile, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.searchAndConnect.path,
    exact: true, component: searchAndConnect, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.jobLists.path,
    exact: true, component: jobLists, layout: CandidateLayout, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateProfileView.path,
    exact: true, component: CandidateProfileView, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateVideos.path,
    exact: true, component: CandidateVideos, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateCreateVideo.path,
    exact: true, component: CandidateCreateVideo, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateEditVideo.path,
    exact: true, component: CandidateCreateVideo, layout: DefaultLayout, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateConnections.path,
    exact: true, component: CandidateConnections, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.connectionNotifications.path,
    exact: true, component: ConnectionNotifications, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateMessages.path,
    exact: true, component: Messages, layout: DefaultLayoutNew, access: { level: "candidate" }
  },
  {
    path: appRoutes.candidateJobHub.path,
    exact: true, component: JobHub, layout: DefaultLayoutNew, access: {level: "candidate"}
  }
]

export default () => {

  return (
    <Switch>
      {
        routes.map((route, i) => (
          <RoutesContainer key={i} private={true} {...route} />
        ))
      }
    </Switch>
  );

};
