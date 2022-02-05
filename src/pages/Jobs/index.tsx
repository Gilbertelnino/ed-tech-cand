import * as React from "react";
import JobList from "./components/list";

const jobs = (props) => (
  <div className="page-jobs">
    <div className="jobs-wrapper">
      <div className="job-content">
        <div className="job-list">
          <JobList {...props} />
        </div>
      </div>
    </div>
  </div>
);
export default jobs;
