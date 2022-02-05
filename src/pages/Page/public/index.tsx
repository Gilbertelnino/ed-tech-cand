import React from "react";

import CompanyQuote from "./components/about";
import CompanyVideos from "./components/video";
import CompanyLeaders from "./components/leaders";
import Recommendations from "./components/recommendations";

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