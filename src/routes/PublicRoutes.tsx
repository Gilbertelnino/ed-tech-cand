import React from 'react';
import { Switch } from 'react-router-dom';

import DefaultLayout from "../pages/layouts/Default";
import RoutesContainer from './RoutesContainer';
import CompanyLayout from "../pages/layouts/Company";
import BasicLayout from "../pages/layouts/BasicLayout/index";
import Home from './../pages/Home/index';
import Auth from './../pages/Auth/index';

import People from './../pages/People';
import JobsGrid from './../pages/Jobs/components/grid';
import Page from './../pages/Page';
import appRoutes from './app.routes';
import VerifyUser from '../pages/Auth/VerifyUser';
import PrivacyPolicyHub from "../pages/Home/PrivacyPolicyHub";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import ContactUs from "../pages/ContactUs/index";
import CandidateProfileView from "../pages/CandidateProfile/Profile/index";
import CandidateLayout from "../pages/layouts/Candidate/index";
import CompanyNews from './../pages/News';
import CompanyEvents from './../pages/Events';
import JobSearch from "../pages/JobSearch/index";
import PageNotFound from "../components/ErrorPages/NotFound";
import CompanyBasicInfo from "../pages/Company/components/BasicInfo";
import JobDetail from '../pages/JobDetail';
import DefaultLayoutNew from "../Layouts/DefaultLayout";
import CompanyLayoutNew from "../Layouts/CompanyLayout";
import UIElements from "../pages/UIElements/index";
import NotFoundError from '../pages/Errors/NotFoundError';
import UnauthorizedError from '../pages/Errors/UnauthorizedError';
import InternalError from '../pages/Errors/InternalError'
import AuthLayout from '../Layouts/AuthLayout';

const routes = [
  {
    path: appRoutes.home.path,
    exact: true, component: Home, layout: DefaultLayout
  },
  {
    path: appRoutes.privacyPolicy.path,
    exact: true, component: PrivacyPolicyHub, layout: DefaultLayout
  },
  {
    path: appRoutes.userLogin.path,
    exact: true, component: Auth, layout: AuthLayout
  },
  {
    path: appRoutes.userSignUp.path,
    exact: true, component: Auth, layout: AuthLayout
  },
  {
    path: appRoutes.userVerify.path,
    exact: true, component: VerifyUser, layout: DefaultLayout
  },
  {
    path: appRoutes.userForgotPassword.path,
    exact: true, component: ForgotPassword, layout: AuthLayout
  },
  {
    path: appRoutes.userResetPassword.path,
    exact: true, component: ResetPassword, layout: AuthLayout
  },
  {
    path: appRoutes.contactUs.path,
    exact: true, component: ContactUs, layout: DefaultLayout
  },
  {
    path: appRoutes.companyPublicPage.path,
    exact: true, component: Page, layout: CompanyLayout
  },
  {
    path: appRoutes.companyPublicPageHome.path,
    exact: true, component: Page, layout: CompanyLayout
  },
  {
    path: appRoutes.companyPublicPagePeople.path,
    exact: true, component: People, layout: CompanyLayout
  },
  {
    path: appRoutes.companyPublicPageJobs.path,
    exact: true, component: JobsGrid, layout: CompanyLayout
  },
  {
    path: appRoutes.companyPublicPageNews.path,
    exact: true, component: CompanyNews, layout: CompanyLayout
  },
  {
    path: appRoutes.companyPublicPageEvents.path,
    exact: true, component: CompanyEvents, layout: CompanyLayout
  },
  {
    path: appRoutes.candidatePublicProfile.path,
    exact: true, component: CandidateProfileView, layout: DefaultLayoutNew
  },
  {
    path: appRoutes.candidateJobSearch.path,
    exact: true, component: JobSearch, layout: DefaultLayoutNew
  },
  {
    path: appRoutes.companyAdminInviteBasicInfo.path,
    exact: true, component: CompanyBasicInfo, layout: BasicLayout, access: { level: "company" }
  },
  {
    path: appRoutes.jobDetail.path,
    exact: true,
    component: JobDetail,
    layout: DefaultLayoutNew
  },
  {
    path: appRoutes.internalError.path,
    exact: true, component: InternalError, layout: DefaultLayoutNew
  },
  {
    path: appRoutes.unauthorizedError.path,
    exact: true, component: UnauthorizedError, layout: DefaultLayoutNew
  },
  {
    path: appRoutes.notFoundError.path,
    exact: true, component: NotFoundError, layout: DefaultLayoutNew
  },
  // {
  //   path: appRoutes.anonymous.path,
  //   exact: true, component: PageNotFound, layout: CandidateLayout
  // },
]

export default () => {

  return (
    <Switch>
      {
        routes.map((route, i) => (
          <RoutesContainer key={i} {...route} />
        ))
      }
    </Switch>
  );

};
