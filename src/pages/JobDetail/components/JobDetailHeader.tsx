import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Typography, Avatar } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import { formatDate } from "../../../utils/helper";
import Button from "../../../components/common/Button";
import UserAvatar from "../../../components/common/UserAvatar";
import { ReactComponent as Experience } from "../images/experience.svg";
import { ReactComponent as Level } from "../images/level.svg";
import { ReactComponent as Department } from "../images/department.svg";
import { ReactComponent as Employment } from "../images/employment.svg";
import { ReactComponent as Salary } from "../images/salary.svg";
import ProfileViewModal from "../../../components/Candidates/ProfileViewModal";
import { useDispatch, useSelector } from "react-redux";
import { applyJobRequest, saveJobRequest } from "../../../reducers/candidate/candidate.reducer";
import { rootReducersState } from "../../../reducers";

interface IJobDetailHeader {
  company_image: string;
  company_name: string;
  job_department_title: string;
  min_experience: string;
  max_experience: string;
  job_level_title: string;
  job_type_title: string;
  location: string;
  max_salary: number;
  min_salary: number;
  posted_on: string;
  salary_term: string;
  title: string;
  currency: string;
  loading?: boolean;
}

const SKELETON_WIDTH = 350;

const JobDetailHeader: React.FC<IJobDetailHeader> = ({ loading, company_image, company_name, location, posted_on, title, ...rest }) => {
  const jobApplicationsApplied = useSelector((state: rootReducersState) => _.get(state, "candidate.candidates.jobApplications.data.applied", []));
  const jobApplicationsSaved = useSelector((state: rootReducersState) => _.get(state, "candidate.candidates.jobApplications.data.saved", []));
  const [openProfileViewModal, setOpenProfileViewModal] = useState(false);
  const dispatch = useDispatch();
  const INFO_ITEMS = useMemo(
    () => [
      {
        id: 1,
        name: "Experience",
        icon: Experience,
        value:
          _.isEmpty(_.get(rest, "min_experience")) || _.isEmpty(_.get(rest, "max_experience"))
            ? "-"
            : `${_.get(rest, "min_experience", "")}-${_.get(rest, "max_experience", "")} Years`,
      },
      {
        id: 2,
        name: "Level",
        icon: Level,
        value: _.get(rest, "job_level_title", "-"),
      },
      {
        id: 3,
        name: "Department",
        icon: Department,
        value: _.get(rest, "job_department_title", "-"),
      },
      {
        id: 4,
        name: "Employment",
        icon: Employment,
        value: _.get(rest, "job_type_title", "-"),
      },
      {
        id: 5,
        name: "Salary",
        icon: Salary,
        value:
          _.isUndefined(rest.min_salary) || _.isUndefined(rest.max_salary)
            ? "-"
            : `${_.get(rest, "currency", "")}${_.get(rest, "min_salary", "")}-${_.get(rest, "max_salary", "")}`,
      },
    ],
    [rest]
  );

  useEffect(() => {
    // Hook to remove the modal form after the user has submitted the application
    if (jobApplicationsApplied.filter((jobApplication: any) => jobApplication.job.id === _.get(rest, "id", 0)).length > 0)
      setOpenProfileViewModal(false);
  }, [jobApplicationsApplied, rest]);

  const _handleSubmitProfile = () => {
    const jobId = _.get(rest, "id", 0);
    dispatch(applyJobRequest(jobId));
  };

  const _handleSaveJob = () => {
    const jobId = _.get(rest, "id", 0);
    dispatch(saveJobRequest(jobId));
  };

  const _hasApplied = useCallback(
    () => jobApplicationsApplied.filter((jobApplication: any) => jobApplication.job.id === _.get(rest, "id", 0)).length > 0,
    [jobApplicationsApplied, rest]
  );

  const _hasSaved = useCallback(
    () => jobApplicationsSaved.filter((jobApplication: any) => jobApplication.job.id === _.get(rest, "id", 0)).length > 0,
    [jobApplicationsSaved, rest]
  );

  return (
    <div className="job-detail-header">
      <div className="upper">
        <div className="logo">
          {loading ? (
            <Skeleton variant="circle" />
          ) : !_.isEmpty(company_image) ? (
            <UserAvatar src={company_image} />
          ) : (
            <Avatar>{company_name.charAt(0).toUpperCase()}</Avatar>
          )}
        </div>
        <div className="content">
          <div>
            {loading ? (
              <Skeleton width={SKELETON_WIDTH} variant="text" />
            ) : (
              <Typography className="title" variant="h3">
                {title}
              </Typography>
            )}

            <div className="d-flex company-details">
              {loading ? (
                <Skeleton width={SKELETON_WIDTH / 2} />
              ) : (
                <>
                  <LocationOn />
                  <p className="name">{company_name}</p>
                  <p className="location">
                    {location}
                    {_.get(rest, "is_remote", "0") === "1" && "(Remote)"}
                  </p>
                </>
              )}
            </div>
            <div className="posted">
              {loading ? (
                <Skeleton width={SKELETON_WIDTH / 3} />
              ) : (
                <p>
                  <strong>Posted on: </strong>
                  {formatDate(posted_on)}
                </p>
              )}
            </div>
          </div>
          <div>
            {loading ? (
              <Skeleton variant="rect" width={130} height={40} />
            ) : (
              <Button
                disabled={_hasApplied()}
                onClick={() => setOpenProfileViewModal(true)}
                color="primary"
                className="apply-now"
                variant="contained"
              >
                {_hasApplied() ? "Applied" : "Apply Now"}
              </Button>
            )}
            {loading ? (
              <Skeleton variant="rect" width={160} height={40} />
            ) : (
              <Button disabled={_hasSaved()} onClick={() => _handleSaveJob()} color="secondary" className="save" variant="outlined">
                {_hasSaved() ? "Saved" : "SAVE FOR LATER"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="info">
        {INFO_ITEMS.map(({ id, name, icon: Icon, value }) => {
          return (
            <div key={id} className="item">
              <div>
                {loading ? <Skeleton variant="circle" /> : <Icon />}
                {loading ? <Skeleton variant="text" /> : name}
              </div>
              {loading ? <Skeleton variant="text" width={80} /> : <p>{value}</p>}
            </div>
          );
        })}
      </div>
      <ProfileViewModal
        className="profile-view-modal"
        visible={openProfileViewModal}
        size="x-large"
        onClose={() => setOpenProfileViewModal(false)}
        handleSubmitProfile={_handleSubmitProfile}
      />
    </div>
  );
};

export default JobDetailHeader;
