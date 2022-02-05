import React, { useState } from "react";
import { Link } from 'react-router-dom';
import appRoutes from './../../../routes/app.routes';
import _ from "lodash";
import { ReactComponent as ToggleIcon } from '../../../assets/svg/toggle-icon.svg';
import UserProfileIcon from "../../../components/common/UserProfileIcon";
import HeaderSearchBar from "../../SearchAndConnect/components/HeaderSearchBar";
import { verifyToken } from "../../../utils/appUser";
import { getCurrentTab } from "../../../utils/helper";
import { rootReducersState } from "../../../reducers";
import { useSelector } from "react-redux";


const Header = (props) => {
  const { children } = props;
  const currentPage = getCurrentTab(children);
  const currentModule = getCurrentTab(children, false, true);
  const checkPage = _.isUndefined(currentPage) ? _.isUndefined(currentModule) ? '' : currentModule : currentPage;
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenUser = _.get(sessionReducer, "currentUser", {});
  const userRole = _.get(tokenUser, "role", "");

  const [openHumberger, setOpen] = useState(false);

  const handleCollapse = () => {
    setOpen(!openHumberger);
  }

  return (
    <>
      {(!_.isEmpty(tokenUser) && userRole === "candidate") && <HeaderSearchBar />}
      <div className="Header-style">
        <nav className="Header-style navbar navbar-expand-lg">
          <span className="navBrand navbar-brand">
            <Link to={"/"}>
              <h1 className="employ">employ<span>HER</span></h1>
            </Link>
            <p className="navBrand navbrand-tagline">creating <span>HER</span> pathway to success</p>
          </span>
          <button aria-controls="responsive-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed" onClick={() => handleCollapse()}>
            <span className="navbar-toggler-icon">
              <ToggleIcon />
            </span>
          </button>
          <div className={`navbar-collapse ${openHumberger ? 'open' : ''} `} id="responsive-navbar-nav">
            <div className="justify-content-end w-100 navLinks navbar-nav">
              <div className={`ml-md-5 nav-item ${checkPage === 'jobs' && 'active-nav'}`}>
                <Link to={appRoutes.candidateJobSearch.path}>{appRoutes.candidateJobSearch.title}</Link>
              </div>
              {(userRole === "candidate") && (
                <div className={`ml-md-5 nav-item  ${checkPage === 'messages' ? 'active-nav' : ''}`}>
                  <Link to={appRoutes.candidateMessages.altPath}>{appRoutes.candidateMessages.title}</Link>
                </div>
              )}
              <UserProfileIcon />
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header;
