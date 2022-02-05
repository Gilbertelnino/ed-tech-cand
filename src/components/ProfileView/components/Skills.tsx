import _ from "lodash";
import React from "react";

interface ISkills {
  skills: [];
}

function Skills({ skills }: ISkills) {
  return (
    <>
      <h1>Skills</h1>
      <div className="profile-view-card mt-20 user-description skills-wrapper">
        {skills.map((skill) => (
          <span>{_.get(skill, "title", "")}</span>
        ))}
      </div>
    </>
  );
}

export default Skills;
