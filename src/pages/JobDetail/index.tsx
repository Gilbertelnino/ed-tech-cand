import React, { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getJobRequest, jobDetailReset } from "../../reducers/job/jobs.reducer";
import JobDetailHeader from "./components/JobDetailHeader";
import NotFoundPage from "../../components/ErrorPages/NotFound";
import { Skeleton } from "@material-ui/lab";
import { rootReducersState } from "../../reducers";
import { getCandidateJobApplicationsRequest } from "../../reducers/candidate/candidate.reducer";

function JobDetail({
  match: {
    params: { slug },
  },
}) {
  const jobApplicationsLoading = useSelector((state: rootReducersState) => _.get(state, "candidate.candidates.jobApplications.loading", false));
  const dispatch = useDispatch();
  const {
    jobs: { detailLoading, detail },
  } = useSelector(({ job }) => job);

  useEffect(() => {
    // Needed to check whether the candidate has already applied to or saved this job
    dispatch(getCandidateJobApplicationsRequest({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getJobRequest({ jobSlug: slug, isPublic: true }));
    // On umount reset job detail
    return () => {
      dispatch(jobDetailReset());
    };
  }, [dispatch, slug]);

  if (_.isEmpty(detail) && !detailLoading) return <NotFoundPage />;

  return (
    <div className="job-detail-wrapper">
      <div className="job-detail-content">
        <JobDetailHeader loading={detailLoading || jobApplicationsLoading} {...detail} />
        <span className="separator" />
        <div className="job-detail-content-details">
          {detailLoading || jobApplicationsLoading ? (
            <div className="loading">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: _.get(detail, "description", ""),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
