import _ from "lodash";
import React from "react";

interface IWorkExperiences {
  experiences: [];
}

function WorkExperience({ experiences }: IWorkExperiences) {
  return (
    <>
      <h1>Work Experience</h1>
      <div className="profile-view-card mt-20 user-description">
        {experiences.map((experience) => (
          <>
            <h2 className="bold">{_.get(experience, "job_position", "")}</h2>
            <p className="mb-0">{_.get(experience, "description", "")}</p>
          </>
        ))}
      </div>
    </>
  );
}

export default WorkExperience;
