import React from "react";
import { Link } from 'react-router-dom';
import appRoutes from "../../routes/app.routes";

const CompanyHeader = () => {


  return (
    <>
      <div className="company-header-wrap">
        <div className="nav-link" id="responsive-navbar-nav">
          <div className="justify-content-end w-100 navLinks navbar-nav">
            <div className="nav-item">
              <Link to={appRoutes.home.path}>Home</Link>
            </div>
            <div className="nav-item">
              <Link to={appRoutes.candidateJobSearch.path} >Careers</Link>
            </div>
          </div>
        </div>
        <div className="user-detail">
          {/* put user detail here */}
        </div>
      </div>

    </>
  )
}

export default CompanyHeader;
