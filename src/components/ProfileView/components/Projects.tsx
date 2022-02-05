import _ from "lodash";
import React from "react";

interface IProjects {
  projects: [];
}

function Projects({ projects }: IProjects) {
  return (
    <>
      <h1>Projects</h1>
      <div className="profile-view-card mt-20 user-description">
        {projects.map((project) => (
          <>
            <h2 className="bold">
              {_.get(project, "title", "")} | {_.get(project, "link", "")}
            </h2>
            <p className="mb-0">{_.get(project, "description", "")}</p>
          </>
        ))}
      </div>
    </>
  );
}

export default Projects;
