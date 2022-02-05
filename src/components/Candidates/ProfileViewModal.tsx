import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner, Modal, Button } from "./../common";
import ProfileForm from "./../../pages/CandidateProfile";
import { get, isEmpty } from "lodash";
import ProfileView from "../ProfileView/ProfileView";
import { rootReducersState } from "../../reducers";

const _ = { get, isEmpty };
// api call here

interface ProfileModalProps {
  children?: React.ReactNode;
  className?: string;

  visible: boolean;
  size?: "small" | "medium" | "large" | "x-large";
  //title?: React.ReactNode;
  closeButton?: boolean;
  closeOnBackDrop?: boolean;
  onClose: () => void;

  loading?: Boolean;
  loaderSize?: number;
  [key: string]: any;
}

const ProfileViewModal = ({ className, visible, size, closeButton, closeOnBackDrop, onClose, handleSubmitProfile, ...props }: ProfileModalProps) => {
  const [applyJobModal, setApplyJobModal] = useState(false);
  const {
    candidates: { isEditModeOn, isJobDescriptionModalOpen },
  } = useSelector(({ candidate }) => candidate);
  const [displayAppliedJobPrompt, setDisplayAppliedJobPrompt] = useState(false);
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const token = _.get(sessionReducer, "token", null);
  // useEffect(() => {
  //   setTokenData(getTokenUser());
  // }, []);
  const handleCloseModal = () => {
    setApplyJobModal(false);
    onClose();
  };
  const handleSubmitProfileButtonClick = () => {
    handleSubmitProfile();
    setDisplayAppliedJobPrompt(true);
  };
  return (
    <Modal className={className} visible={visible} size={size} closeButton={closeButton} closeOnBackDrop={closeOnBackDrop} onClose={handleCloseModal}>
      <Spinner visible={_.isEmpty(token)}>
        <div className="pb-5 profile-view-modal-body">
          {displayAppliedJobPrompt ? (
            <div className="successful-submit">
              <h2>Your profile was successfully submitted for this job.</h2>
              <p>Wishing you the best of luck!</p>
            </div>
          ) : (
            <div className="pt-15 pb-15 submit-application-container">
              <p className="title">Review Profile Information</p>
              <Button color="dark-pink" className="btn-submit-application" onClick={handleSubmitProfileButtonClick}>
                Submit my application
              </Button>
            </div>
          )}

          <div id="profile-view" className="modal-profile-view slim-scrollbar">
            {isJobDescriptionModalOpen && isEditModeOn ? <ProfileForm /> : <ProfileView showEditButton={true} />}
          </div>
        </div>
      </Spinner>
    </Modal>
  );
};

export default ProfileViewModal;
