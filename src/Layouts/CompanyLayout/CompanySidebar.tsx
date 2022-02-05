import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/svg/Logo.svg";
import { ReactComponent as DashboardIcon } from "./../../assets/svg/company-dashboard.svg";
import { ReactComponent as CandidateIcon } from "./../../assets/svg/company-candidate.svg";

import { ReactComponent as JobIcon } from "./../../assets/svg/company-job.svg";
import { ReactComponent as PageIcon } from "./../../assets/svg/company-page.svg";

import { ReactComponent as AdminIcon } from "./../../assets/svg/company-admin.svg";
import { ReactComponent as MsgIcon } from "./../../assets/svg/company-msg.svg";

import { ReactComponent as SettingIcon } from "./../../assets/svg/company-setting.svg";
import { getCurrentTab } from "../../utils/helper";
import appRoutes from "../../routes/app.routes";

interface CompanySideBarProps {
  children?: any
}

const CompanySidebar = (prop: CompanySideBarProps) => {
  const { children } = prop;
  const currentSubTab = getCurrentTab(children);
  return (
    <div className="sidebar-wrap">
      <div className="sidebar-logo">
        <Logo/>
      </div>
      <div className="sidebar-menu-wrap">
          <ul className="side-menu top">
            <li>
              <Link key="link_dashboard" to={appRoutes.companyDashboard.path} className={`dashboard-menu ${ currentSubTab === 'dashboard' ? 'active' : '' }`}>
                  <DashboardIcon/>
                  <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link key="link_candidates" to={appRoutes.companyCandidates.path} className={`candidate-menu ${ currentSubTab === 'candidates' ? 'active' : '' }`}>
                  <CandidateIcon/>
                  <span>Candidates</span>
              </Link>
            </li>
            <li>
                <Link key="link_jobs" to={appRoutes.companyJobs.path} className={`job-menu ${ currentSubTab === 'jobs' ? 'active' : '' }`}>
                  <JobIcon/>
                  <span>Jobs</span>
                </Link>
            </li>
            <li>
                <Link key="link_page" to={appRoutes.companyPage.path} className={`page-menu ${ currentSubTab === 'page' ? 'active' : '' }`}>
                  <PageIcon/>
                  <span>Page</span>
                </Link>
            </li>
            <li>
                <Link key="link_admin" to={appRoutes.companyAdmins.path} className={`admin-menu ${ currentSubTab === 'admins' ? 'active' : '' }`}>
                  <AdminIcon/>
                  <span>Admins</span>
                </Link>
            </li>
            <li>
                <Link key="link_message" to={appRoutes.companyMessages.path} className={`message-menu ${ currentSubTab === 'messages' ? 'active' : '' }`}>
                  <MsgIcon/>
                  <span>Messages</span>
                </Link>
            </li>
          </ul>

          <ul className="side-menu bottom">
            <li>
              <Link key="link_setting" to={appRoutes.companySettings.path} className={`setting-menu ${ currentSubTab === 'settings' ? 'active' : '' }`}>
                <SettingIcon/>
                <span>Setting</span>
              </Link>
            </li>
          </ul>
      </div>
    </div>
  )
}

export default CompanySidebar;
