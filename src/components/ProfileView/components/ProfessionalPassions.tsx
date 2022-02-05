import _ from "lodash";
import React from "react";

function _ProfessionalPassions({ candidateProfileData }: any) {
  return (
    <>
      <h1>Professional Passions</h1>
      <div className="profile-view-card mt-20 user-description">
        <h2 className="bold">Earlier years</h2>
        <p>{_.get(candidateProfileData, "profile.early_career", "")}</p>
        <h2 className="bold">Mid Journey</h2>
        <p>{_.get(candidateProfileData, "profile.mid_career", "")}</p>
        <h2 className="bold">Recent Career</h2>
        <p className="mb-0">{_.get(candidateProfileData, "profile.recent_life", "")}</p>
      </div>
    </>
  );
}

export default _ProfessionalPassions;
