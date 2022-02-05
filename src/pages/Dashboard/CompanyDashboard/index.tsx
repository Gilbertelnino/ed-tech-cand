import React, { useEffect } from 'react';
import {
  EmailRounded as MailOutlineIcon, MoveToInbox as MoveToInboxIcon, StarRounded as StarBorderIcon
} from '@material-ui/icons';

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';

import { fetchCompanyDashboardTilesRequest } from "../../../reducers/dashboard/companyDashboard.reducer"
import appRoutes from "../../../routes/app.routes";
import { tabChangeRequest } from "../../../reducers/company/tabChange.reducer";

export default function Dashboard() {

  const dispatch = useDispatch();
  const history = useHistory();

  const dashboardReducer = useSelector(({ dashboard }: any) => dashboard);
  const companyReducer = useSelector(({ company }: any) => company);

  const tilesData = _.get(dashboardReducer, "company.tiles.data", {})
  const companyName = _.get(companyReducer, "companyProfile.data.companyProfile.company_name", "");

  useEffect(() => {

    dispatch(fetchCompanyDashboardTilesRequest());

  }, []);

  const getPluralize = (num) => num > 1 ? "s" : "";

  const redirectTo = (redirectTo = "jobs") => {

    if (redirectTo === "jobs") {
      dispatch(tabChangeRequest({ tab: 'jobs' }));
    } else if (redirectTo === "draftJobs") {
      dispatch(tabChangeRequest({ tab: 'jobs', innerTab: 'drafts' }));
      history.push(appRoutes.companyJobsDrafts.path);
    } else if (redirectTo === "archiveJobs") {
      dispatch(tabChangeRequest({ tab: 'jobs', innerTab: 'archive' }));
      history.push(appRoutes.companyJobsArchive.path);
    } else if (redirectTo === "totalApplicants") {
      dispatch(tabChangeRequest({ tab: 'candidates'}));
    } else if (redirectTo === "interviewedApplicants") {
      dispatch(tabChangeRequest({ tab: 'candidates', innerTab: 'interviewed' }));
      history.push(appRoutes.companyCandidateInterviewed.path);
    }
  }

  return (
    <div className={"page-dashboard"}>
      <div className="welcome-text">
        <h2>Welcome<span className="pink-text"> {companyName} </span> </h2>
        <p>Daily insights and analytics on jobs, applicants and interviews.</p>
      </div>

      <Grid item xs={12} container spacing={3} direction="row" justify="space-between" alignItems="flex-start">
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
          <div className="dashboard-tile job-posted">
            <div className="d-tile-intro">
              <div className="icon cursor-pointer" onClick={() => redirectTo("jobs")}>
                <MailOutlineIcon />
              </div>
              <div className="data">
                <h3 className="cursor-pointer" onClick={() => redirectTo("jobs")}>{(_.get(tilesData, "totalJobs", 0) || 0)}</h3>
                <p className="cursor-pointer" onClick={() => redirectTo("jobs")}>Job Posted</p>
              </div>
            </div>
            <div className="d-tile-detail job-posted-count">
              <div className="count">
                <h4 className="cursor-pointer" onClick={() => redirectTo("draftJobs")}>{(_.get(tilesData, "draftJobs", 0) || 0)}</h4>
                <p className="cursor-pointer" onClick={() => redirectTo("draftJobs")}>Draft Job{getPluralize(_.get(tilesData, "draftJobs", 0) || 0)}</p>
              </div>
              <div className="count">
                <h4 className="cursor-pointer" onClick={() => redirectTo("archiveJobs")}>{(_.get(tilesData, "archiveJobs", 0) || 0)}</h4>
                <p className="cursor-pointer" onClick={() => redirectTo("archiveJobs")}>Archive Job{getPluralize(_.get(tilesData, "archiveJobs", 0) || 0)}</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >

          <div className="dashboard-tile applied-candidate">
            <div className="d-tile-intro">
              <div className="icon cursor-pointer" onClick={() => redirectTo("totalApplicants")}>
                <MoveToInboxIcon />
              </div>
              <div className="data">
                <h3 className="cursor-pointer" onClick={() => redirectTo("totalApplicants")}>{(_.get(tilesData, "totalApplicants", 0) || 0)}</h3>
                <p className="cursor-pointer" onClick={() => redirectTo("totalApplicants")}>Total Applicants</p>
              </div>
            </div>
            <div className="d-tile-detail">
              <div className="count">
                <p>Evaluate candidates that have applied for jobs</p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >

          <div className="dashboard-tile scheduled-interview">
            <div className="d-tile-intro">
              <div className="icon cursor-pointer" onClick={() => redirectTo("interviewedApplicants")}>
                <StarBorderIcon />
              </div>
              <div className="data">
                <h3 className="cursor-pointer" onClick={() => redirectTo("interviewedApplicants")}>{(_.get(tilesData, "interviewedApplicants", 0) || 0)}</h3>
                <p className="cursor-pointer" onClick={() => redirectTo("interviewedApplicants")}>Scheduled Interview</p>
              </div>
            </div>
            <div className="d-tile-detail scheduled-interview">
              <div className="count">
                <p>View all scheduled interviews</p>
              </div>
            </div>
          </div>

        </Grid>
      </Grid>
    </div>
  );
}
