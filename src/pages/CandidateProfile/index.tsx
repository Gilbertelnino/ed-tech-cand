import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MainProfile from "./MainProfile";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCandidateRequest,
  uploadCandidateFileRequest,
  candidateReset,
  setEditModeOn,
  getCandidateProfileDetailRequest,
} from "../../../src/reducers/candidate/candidate.reducer";
import MainProfileSkeleton from "./MainProfileSkeleton";
import appRoutes from "../../routes/app.routes";
import { get, isEmpty } from "lodash";
import { rootReducersState } from "../../reducers";
import { fetchSessionDataRequest } from "../../reducers/auth/session.reducer";

const _ = { get, isEmpty };

const CandidateProfile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [profileData, setCandidateProfileData] = useState({});

  const {
    candidates: {
      loading,
      updateflag: updateflag,
      errors: jobErrors,
      uploadLoading: isUploading,
      imageUrl: picturePath,
      isEditModeOn,
      isJobDescriptionModalOpen,
      data: profileDetail,
    },
  } = useSelector(({ candidate }: any) => candidate);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenData = _.get(sessionReducer, "currentUser", {});

  useEffect(() => {
    dispatch(fetchSessionDataRequest());
  }, []);

  // set candidate profile data Hook
  useEffect(() => {
    if (!_.isEmpty(tokenData)) {
      setCandidateProfileData(tokenData);
    }
  }, [tokenData]);

  // Update candidate success Hook
  useEffect(() => {
    if (updateflag === true) {
      if (isJobDescriptionModalOpen) {
        dispatch(setEditModeOn(false));
      } else {
        history.push(_.get(appRoutes, "candidateProfileView.path", "/"));
      }
      dispatch(candidateReset());
    }
  }, [updateflag]);

  const createOrSaveProfile = (profile) => {
    dispatch(updateCandidateRequest(profile));
  };

  return (
    <div className="main-profile-wrapper">
      {!_.isEmpty(profileData) ? (
        <MainProfile
          profile={profileData}
          createOrSaveProfile={createOrSaveProfile}
          loading={loading}
          isUploading={isUploading}
          picturePath={picturePath}
        />
      ) : (
        <MainProfileSkeleton />
      )}
    </div>
  );
};
export default CandidateProfile;
