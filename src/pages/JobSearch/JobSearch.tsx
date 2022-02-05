import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Radio, SelectNew as Select } from "../../components/common";
import _ from "lodash";
import moment from "moment";
import SearchBar from "./SearchBar";
import { getTokenUser } from "../../utils/appUser";
import { useDispatch, useSelector } from "react-redux";
import { jobListRequest, publicJobListRequest } from "../../reducers/job/jobs.reducer";
import { jobTypes, timeDurations } from "../../utils/appConstants";
import NoJobsFound from "../Jobs/components/noJobsFound";
import Card from "../../components/Jobs/Card";
import PaginationComponent from "../../components/common/Pagination";
import { scrollToTop } from "../../utils/helper";
import JobLoading from "./JobLoading";
import appRoutes from "../../routes/app.routes";

const JOB_TYPE_OPTIONS = [
  { label: jobTypes.FULL_TIME.title, value: `${jobTypes.FULL_TIME.id}` },
  { label: jobTypes.PART_TIME.title, value: `${jobTypes.PART_TIME.id}` },
  { label: jobTypes.CONTRACT.title, value: `${jobTypes.CONTRACT.id}` },
  { label: jobTypes.INTERNSHIP.title, value: `${jobTypes.INTERNSHIP.id}` },
];

const JOB_DURATION_OPTIONS = [
  { label: _.capitalize(timeDurations.ALL.title), value: `${timeDurations.ALL.id}` },
  { label: _.capitalize(timeDurations.MONTH.title), value: `${timeDurations.MONTH.id}` },
  { label: _.capitalize(timeDurations.WEEK.title), value: `${timeDurations.WEEK.id}` },
];

const defaultFilter = {
  page: 1,
  pageSize: 12,
  public: "1",
  archive: "0",
  jobType: jobTypes.FULL_TIME.id,
  jobDuration: timeDurations.ALL.id,
  from: null,
  to: null,
};

let searchDelay: any = null;

const _JobSearch = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { jobs } = useSelector(({ job }) => job);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(defaultFilter);
  /* Check if user is already logged in */
  const tokenData = getTokenUser();
  const role = _.get(tokenData, "role", "");
  /* Check logged in end. */
  // When the filter state updated, we will dispatch an action
  useEffect(() => {
    !_.isEmpty(tokenData) && role === "candidate" ? dispatch(jobListRequest(filter)) : dispatch(publicJobListRequest(filter));
  }, [filter]);
  const pagination = _.get(jobs, "pagination", {});
  const jobPostings = _.get(jobs, "data", []);
  const loading = _.get(jobs, "loading", true);

  const _handleJobTypeOption = (type: any) => {
    const jobType = parseInt(type);
    const param = { ...filter, page: 1, jobType };
    setPage(1);
    setFilter(param);
  };

  const _handleJobPostedOption = (_duration: any) => {
    const id = parseInt(_duration.value);
    const duration = _duration.label.toLowerCase();
    let fromDate = null;
    let toDate = null;

    if (duration === timeDurations.WEEK.title) {
      fromDate = moment().add(-7, "days").format("YYYY-MM-DD");
      toDate = moment().format("YYYY-MM-DD");
    } else if (duration === timeDurations.MONTH.title) {
      fromDate = moment().add(-1, "month").format("YYYY-MM-DD");
      toDate = moment().format("YYYY-MM-DD");
    }

    // Once the filter will update, action will be dispatched automatically
    setPage(1);
    setFilter({
      ...filter,
      page: 1,
      from: fromDate,
      to: toDate,
      jobDuration: id,
    });
  };

  const _handlePaginationChange = (value: number) => {
    setPage(value);
    const param = { ...filter, page: value };
    setFilter(param);
    scrollToTop();
  };

  const _handleSearch = (q: string) => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(async () => {
      const param = { ...filter, page: 1, q: q };
      setPage(1);
      setFilter(param);
    }, 1000);
  };

  const _handleJobHubRoute = () => history.push(appRoutes.candidateJobHub.path);

  return (
    <div className="job-search-wrapper">
      <div className="filter-wrapper">
        <div className="filter-row">
          <SearchBar handleSearch={_handleSearch} />
          <Button onClick={_handleJobHubRoute} variant="contained" color="primary">
            MY JOB HUB
          </Button>
        </div>
        <span className="separator" />
        <div className="filter-row">
          <div className="select-item">
            <Select
              name="recent"
              value={JOB_DURATION_OPTIONS.find((recent) => parseInt(recent.value) === filter.jobDuration)}
              options={JOB_DURATION_OPTIONS}
              placeholder="Select one"
              onChange={_handleJobPostedOption}
              externalLabel={{ label: "Relevant/Recent" }}
            />
          </div>
          <div className="select-item">
            <div>
              <label htmlFor="job-type">Job Type</label>
            </div>
            <Radio
              name="job-type"
              options={JOB_TYPE_OPTIONS}
              onChange={(e) => _handleJobTypeOption(e.target.value)}
              defaultValue={JOB_TYPE_OPTIONS.find((type) => parseInt(type.value) === filter.jobType).value}
            />
          </div>
        </div>
      </div>
      {_.isEmpty(jobPostings) && !loading ? (
        <NoJobsFound />
      ) : (
        <div className="list-wrapper">{loading ? <JobLoading /> : jobPostings.map((job) => <Card key={job.id} job={job} />)}</div>
      )}
      <div className="pagination-wrapper">
        <PaginationComponent
          count={_.get(pagination, "total", 0)}
          page={page}
          variant="outlined"
          color="secondary"
          onChange={(value) => _handlePaginationChange(value)}
        />
      </div>
    </div>
  );
};

export default _JobSearch;
