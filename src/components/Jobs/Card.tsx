import React from "react";
import HelpIcon from "@material-ui/icons/Help";
import { formatDate } from "./../../utils/helper";
import _ from "lodash";
import appRoutes from "../../routes/app.routes";
import UserAvatar from "../common/UserAvatar";
import { companyApplicationStatuses } from "../../utils/appConstants";
import { Tooltip } from "@material-ui/core";

interface JobPostingProps {
  className?: string;
  job: any;
  showStatus?: boolean;
  candidateStatus?: number;
  applicationStatus?: number;
  rejectionReason?: string;
  onClick?: (status: any) => void | null;
}

const Card = ({ className, job, showStatus, candidateStatus, applicationStatus, rejectionReason, onClick }: JobPostingProps) => {
  const openInNewTab = (url: any) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleRouting = () => openInNewTab(appRoutes.jobDetail.generatePath(_.get(job, "slug", "")));

  const getCandidateJobStatus = () => {
    let status = { id: null, title: "" };
    Object.values(companyApplicationStatuses).forEach((obj: any) => {
      if (obj.id === candidateStatus) {
        status = obj;
      }
    });
    return status;
  };
  const _handleOnClick = () => {
    if (onClick) onClick(applicationStatus);
    else handleRouting();
  };
  return (
    <div onClick={_handleOnClick} className="job-item">
      <div className="job-item-header">
        <div className="avatar">
          {!_.isEmpty(_.get(job, "createdBy.company_logo", "")) ? (
            <UserAvatar src={_.get(job, "createdBy.company_logo", "")} />
          ) : (
            <UserAvatar>{_.get(job, "createdBy.companyProfile.company_name", "").charAt(0).toUpperCase()}</UserAvatar>
          )}
        </div>
        <div className="meta">
          <h4>{_.get(job, "title", "")}</h4>
          <div>
            <p className="meta-company">{_.get(job, "createdBy.companyProfile.company_name", "")}</p>
            <p className="meta-location">{_.get(job, "location", "")}</p>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: _.get(job, "description", ""),
        }}
        className="job-item-content"
      ></div>
      <div className="job-item-footer">
        <div className="status">
          {showStatus && (
            <>
              <label className={getCandidateJobStatus().title.toLowerCase()}>{getCandidateJobStatus().title}</label>
              {/* For rejected status 6 */}
              {getCandidateJobStatus().id === 6 && (
                <Tooltip title={rejectionReason!} placement="top">
                  <HelpIcon />
                </Tooltip>
              )}
            </>
          )}
        </div>
        <p>Posted on {formatDate(_.get(job, "created_at", ""))}</p>
      </div>
    </div>
  );
};

export default Card;
