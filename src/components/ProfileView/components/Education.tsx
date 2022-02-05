import _ from "lodash";
import React from "react";
import { formatDate } from "../../../utils/helper";

interface IEducation {
  educations: [];
}

function Education({ educations }: IEducation) {
  return (
    <>
      <h1>Education</h1>
      <div className="profile-view-card mt-20 user-description">
        <div>
          {educations.map((education: any) => (
            <>
              <div className="item-1">
                <h2 className="bold">{_.get(education, "institute_name", "")}</h2>
                <p>{_.get(education, "field_of_study", "")} </p>
              </div>
              <div className="item-2">
                <h2 className="bold">{_.get(education, "field_of_study", "")}</h2>
                <p>
                  {formatDate(_.get(education, "degree_from", ""))} -
                  {education.is_present === 1 ? "Present" : formatDate(_.get(education, "degree_from", ""))}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Education;
