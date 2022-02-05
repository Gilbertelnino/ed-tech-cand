import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import appRoutes from "../../routes/app.routes";
import SearchBar from "../JobSearch/SearchBar";
import JobLoading from "../JobSearch/JobLoading";
import NoJobsFound from "../Jobs/components/noJobsFound";
import Card from "../../components/Jobs/Card";
import { Button, Radio, Tabs } from "../../components/common";
import PaginationComponent from "../../components/common/Pagination";
import { jobTypes } from "../../utils/appConstants";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateJobApplicationsRequest } from "../../reducers/candidate/candidate.reducer";
import { scrollToTop } from "../../utils/helper";
import TrackJobStepper from "./components/TrackJobStepper";

const JOB_TYPE_OPTIONS = [
  { label: jobTypes.FULL_TIME.title, value: `${jobTypes.FULL_TIME.id}` },
  { label: jobTypes.PART_TIME.title, value: `${jobTypes.PART_TIME.id}` },
  { label: jobTypes.CONTRACT.title, value: `${jobTypes.CONTRACT.id}` },
  { label: jobTypes.INTERNSHIP.title, value: `${jobTypes.INTERNSHIP.id}` },
];

const TABS = [
  {
    id: 1,
    label: "Saved Jobs",
    value: "saved",
  },
  {
    id: 2,
    label: "Applied Jobs",
    value: "applied",
  },
];

const defaultFilter = {
  page: 1,
  pageSize: 12,
  jobType: jobTypes.FULL_TIME.id,
};
let searchDelay: any = null;

const JobHub = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const appliedPagination = useSelector((state) => _.get(state, "candidate.candidates.jobApplications.appliedPagination", {}));
  const savedPagination = useSelector((state) => _.get(state, "candidate.candidates.jobApplications.savedPagination", {}));
  const appliedJobs = useSelector((state) => _.get(state, "candidate.candidates.jobApplications.data.applied", []));
  const savedJobs = useSelector((state) => _.get(state, "candidate.candidates.jobApplications.data.saved", []));
  const loading = useSelector((state) => _.get(state, "candidate.candidates.jobApplications.loading", false));
  const [activeTab, setActiveTab] = useState<any>(TABS[1]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(defaultFilter);
  const [activeJobApplicationStatus, setActiveJobStatus] = useState(0);

  useEffect(() => {
    dispatch(getCandidateJobApplicationsRequest(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    // On tab change reset the filter
    setFilter(defaultFilter);
  }, [activeTab]);

  const _handleJobTypeOption = (type: any) => {
    const jobType = parseInt(type);
    const param = { ...filter, page: 1, jobType };
    setPage(1);
    setFilter(param);
  };

  const _handleSearch = (q: string) => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(async () => {
      const param = { ...filter, page: 1, q: q };
      setPage(1);
      setFilter(param);
    }, 1000);
  };

  const _handlePaginationChange = (value: number) => {
    setPage(value);
    const param = { ...filter, page: value };
    setFilter(param);
    scrollToTop();
  };

  const _handleJobListingRoute = () => history.push(appRoutes.candidateJobSearch.path);

  const _handleActiveJobApplicationStatus = (status: number) => {
    setActiveJobStatus(status);
  };

  const jobPostings = activeTab.id === 2 ? appliedJobs : savedJobs;
  const pagination = activeTab.id === 2 ? appliedPagination : savedPagination;
  return (
    <div className="job-hub-wrapper">
      <div className="filter-wrapper">
        <div className="filter-row">
          <Tabs tabs={TABS} active={activeTab} setActive={setActiveTab} />
          <Button onClick={_handleJobListingRoute} variant="contained" color="secondary">
            Job Listings
          </Button>
        </div>
        {/* Temporarily hidden until further instructions */}
        {/* <span className="separator" />
        <div className={`filter-row ${activeTab.id === 2 && "justify-content-center"}`}>
          <div className="select-item">
            <SearchBar className={activeTab.id === 2 ? "apply-search-bar" : ""} handleSearch={_handleSearch} />
          </div>
          {activeTab.id === 1 && (
            <div className="select-item">
              <div>
                <label htmlFor="job-type">Job Type</label>
              </div>
              <Radio
                name="job-type"
                options={JOB_TYPE_OPTIONS}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => _handleJobTypeOption(e.target.value)}
                defaultValue={JOB_TYPE_OPTIONS.find((type) => parseInt(type.value) === filter.jobType)?.value}
              />
            </div>
          )}
        </div> */}
      </div>
      {activeTab.id === 2 && (
        <div className="stepper-wrapper">
          <h2>Track Your applied Jobs</h2>
          <TrackJobStepper applicationStatus={activeJobApplicationStatus - 1} />
        </div>
      )}
      {_.isEmpty(jobPostings) && !loading ? (
        <NoJobsFound />
      ) : (
        <div className="list-wrapper">
          {loading ? (
            <JobLoading />
          ) : (
            jobPostings.map((data: any) => (
              <Card
                showStatus={activeTab.id === 2} /**For only Applied jobs show status*/
                candidateStatus={_.get(data, "candidate_status", 1)}
                applicationStatus={_.get(data, "application_status", 1)}
                key={data.id}
                onClick={_handleActiveJobApplicationStatus}
                rejectionReason={_.get(data, "reject_reason", "")}
                job={{ ...data.job, createdBy: { companyProfile: data.company }, created_at: _.get(data, "created_at", "") }}
              />
            ))
          )}
        </div>
      )}
      <div className="pagination-wrapper">
        <PaginationComponent
          count={_.get(pagination, "totalPages", 0)}
          page={page}
          variant="outlined"
          color="secondary"
          onChange={(value) => _handlePaginationChange(value)}
        />
      </div>
    </div>
  );
};

export default JobHub;
