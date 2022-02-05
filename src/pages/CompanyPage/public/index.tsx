import React from "react";

import CompanyQuote from "./components/About";
import CompanyVideos from "./components/Video";
import CompanyLeaders from "./components/Leaders";
import Recommendations from "./components/Recommendations";

const PublicHome = () => {
  return (
    <div className="company-page-profile-container">
      <CompanyQuote />
      <CompanyLeaders />
      <CompanyVideos />
      {/* <Recommendations /> */}
    </div>
  )
}

export default PublicHome;