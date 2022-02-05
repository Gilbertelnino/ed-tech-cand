import React, { useState } from "react";
import Modal from "./../common/Modal";
import Button from "./../common/Button";
import UserAvatar from "./../common/UserAvatar";
import ProfileViewModal from "./../Candidates/ProfileViewModal";
import { useSelector, useDispatch } from "react-redux";
import { applyJobRequest } from "../../reducers/candidate/candidate.reducer";
import { get, forEach, isEmpty } from "lodash";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { verifyToken } from "../../utils/appUser";
import { useHistory } from "react-router";
import appRoutes from "../../routes/app.routes";
import { AttachMoney as AttachMoneyIcon, Business as BusinessIcon, LocationOn as LocationOnIcon } from '@material-ui/icons';
import { rootReducersState } from "../../reducers";

const _ = { get, forEach, isEmpty };
interface JobDescriptionProps {
  children?: React.ReactNode;
  className?: string;

  details?: any;

  visible: boolean;
  size?: "small" | "medium" | "large" | "x-large";
  title?: React.ReactNode;
  closeButton?: boolean;
  closeOnBackDrop?: boolean;
  onClose: () => void;

  loading?: Boolean;
  loaderSize?: number;
  [key: string]: any;
}

const DescriptionModal = ({
  details,
  className,
  visible,
  size,
  closeButton,
  closeOnBackDrop,
  onClose,
  ...props
}: JobDescriptionProps) => {

  const history = useHistory();

  //	const [displayBetaPrompt, setDisplayBetaPrompt] = useState(false);
  const [openProfileViewModal, setOpenProfileViewModal] = useState(false);
  const [displayAppliedJobPrompt, setDisplayAppliedJobPrompt] = useState(false);
  const dispatch = useDispatch();

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const token = _.get(sessionReducer, "token", null);
  const currentUser = _.get(sessionReducer, "currentUser", {});

  // some sort of a flag that says a user has applied to job

  const handleCloseModal = () => {
    onClose();
    //	setDisplayBetaPrompt(false);
    //setDisplayAppliedJobPrompt(false);
  };

  const handleApplyJobButtonClick = () => {
    setOpenProfileViewModal(true);
  };

  const handleSubmitProfile = () => {
    const jobId = _.get(details, "id", 0);
    setDisplayAppliedJobPrompt(true);
    dispatch(applyJobRequest(jobId));
  };
  const role = _.get(currentUser, "role", '');
  const salaryTerm = _.get(details, "salary_term", 'per_hour') === "per_hour" ? 'per hour' : 'annual';
  const currencyCode = _.get(details, "currency.code", 'USD');
  return (
    <>
      <Modal
        className={className}
        visible={visible}
        size={size}
        closeButton={closeButton}
        closeOnBackDrop={closeOnBackDrop}
        onClose={handleCloseModal}
      >
        <div className="beta">
          {displayAppliedJobPrompt && (
            <div className="temp-beta-prompt">
              <div className="note">
                <h3>Your profile was successfully submitted for this job.</h3>
                <p>Wishing you the best of luck!</p>
              </div>
              <hr />
            </div>
          )}
        </div>
        <div>
          <Button className="modal-close-btn my-0" onClick={handleCloseModal}>
            <CloseRoundedIcon fontSize="small" className="model-close-icon" />
          </Button>
        </div>
        <div className="job-modal">
          <div className="job-posting-info">
            <div className="job-posting-info-intro">
              <div className="basic">
                <div className="job-title">{_.get(details, "title", "")}</div>
                <div className="company-name"> <BusinessIcon />
                  {_.get(details, "createdBy.companyProfile.company_name", "")}
                </div>
                <div className="job-location"><LocationOnIcon />
                  {_.get(details, "location", "")}
                </div>
                <div className="job-salary"> <AttachMoneyIcon />
                  {`${currencyCode} ${_.get(details, "min_salary", "0")} - ${_.get(details, "max_salary", "0")} ${salaryTerm}`}
                </div>
              </div>
              <div className="company-logo">
                <UserAvatar
                  size="md"
                  color="light-gray-color"
                  className="company-logo"
                  src={_.get(details, "createdBy.company_logo", "")}
                  alt={_.get(details, "createdBy.companyProfile.company_name", "")}
                  variant="square"
                />
              </div>
            </div>
            <div className="job-posting-detail-wrapper">
              <div className="job-description-wrap">
                <h3>Description</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: _.get(details, "description", ""),
                  }}
                  className="job-description slim-scrollbar"
                >
                  {/* {truncateCharacters(description, 300)} */}
                </div>
              </div>

              <div className="buttons">
                {(token) ? (
                  !_.isEmpty(currentUser) && role === "candidate" && (
                    <Button
                      className="apply-button"
                      onClick={handleApplyJobButtonClick}
                      disabled={!_.isEmpty(_.get(details, "jobApplications", [])) || displayAppliedJobPrompt ? true : false}
                      color={displayAppliedJobPrompt ? "light-green" : "dark-pink"}
                    >
                      {!_.isEmpty(_.get(details, "jobApplications", [])) || displayAppliedJobPrompt ? "Applied" : "Apply Now"}
                    </Button>
                  )
                ) : (
                  <Button
                    className="apply-button"
                    onClick={() => history.push(appRoutes.userLogin.path)}
                    color={"dark-pink"}
                  >
                    Login to Apply
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ProfileViewModal
        className="profile-view-modal"
        visible={openProfileViewModal}
        size="x-large"
        closeButton={true}
        onClose={() => setOpenProfileViewModal(false)}
        handleSubmitProfile={handleSubmitProfile}
      />
    </>
  );
};

export default DescriptionModal;
