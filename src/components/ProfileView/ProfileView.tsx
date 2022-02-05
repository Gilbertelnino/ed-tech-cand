import _, { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import copyToClipboard from "copy-to-clipboard";
import Education from "./components/Education";
import ProfessionalPassions from "./components/ProfessionalPassions";
import ProfileHeader from "./components/ProfileHeader";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import { fetchCandidatePublicProfile } from "../../services/candidate.services";
import { rootReducersState } from "../../reducers";
import { fetchSessionDataRequest } from "../../reducers/auth/session.reducer";
import { deleteVideoRequest } from "../../reducers/candidate/candidate.reducer";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import appRoutes from "../../routes/app.routes";
import { FlashMessage } from "../common";
import ProfileShareModal from "./components/ProfileShareModal";
import DeleteVideoModal from "./components/DeleteVideoModal";
interface Iprops {
  slug?: string;
  showEditButton?: boolean;
  showShareButton?: boolean;
  showDeleteButton?: boolean;
}
const ProfileView = (props: Iprops) => {
  const history = useHistory();
  const params = useParams();
  const [publicPage, setPublicPage] = useState(false);
  const [candidateProfileData, setCandidateProfileData] = useState({});
  const [publicProfileLink, setPublicProfileLink] = useState("");
  const [profileShareModal, setProfileShareModal] = useState(false);
  const [sureAboutVideoDelete, setSureAboutVideoDelete] = useState(false);
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenData = _.get(sessionReducer, "currentUser", {});
  const dispatch = useDispatch();

  const publicProfileRoute = useRouteMatch({
    path: appRoutes.candidatePublicProfile.path,
    strict: true,
  });

  useEffect(() => {
    (async function () {
      if (_.isEmpty(publicProfileRoute) && !_.get(props, "slug", "")) {
        // Candidate view with Auth
        setPublicPage(false);
        dispatch(fetchSessionDataRequest());
      } else {
        // for the case of fetching profile through slug
        let slug = "";
        let profileData = {};
        if (_.get(props, "slug", "")) {
          setPublicPage(false);
          slug = _.get(props, "slug", "");
        } else {
          setPublicPage(true);
          slug = _.get(params, "slug", "");
        }
        try {
          const result = await fetchCandidatePublicProfile(slug);
          const checkData = _.get(result, "data.email", "");
          if (!_.isEmpty(checkData)) {
            profileData = _.get(result, "data", {});
          }
        } catch (error) {
          profileData = {};
        }

        // Set token profile found successfully
        if (Object.keys(profileData).length > 0) {
          setCandidateProfileData(profileData);
        } else {
          // No profile found
          if (publicPage) history.push(appRoutes.home.path);
        }
      }
    })();
  }, []);

  // set candidate profile data Hook
  useEffect(() => {
    if (!_.isEmpty(tokenData)) {
      setCandidateProfileData(tokenData);
      const profileLink = appRoutes.candidatePublicProfile.generatePath(_.get(tokenData, "slug", ""));
      setPublicProfileLink(profileLink);
    }
  }, []);

  const _copyProfileLink = () => {
    const profileLink = appRoutes.candidatePublicProfile.generateFullPath(_.get(tokenData, "slug", ""));
    copyToClipboard(profileLink);
    FlashMessage("Copied profile link");
  };

  const _handleDeleteVideo = () => {
    dispatch(deleteVideoRequest());
    setTimeout(() => {
      setSureAboutVideoDelete(false);
      dispatch(fetchSessionDataRequest());
    }, 1000);
  };

  const _handleEditClick = () => {
    history.push(appRoutes.candidateProfile.path);
  };
  return (
    <div className={`profile-view-wrapper ${publicPage && "mt-95"}`}>
      <div className="mb-15">
        <div className="d-flex justify-content-between">
          <h1>
            {_.get(candidateProfileData, "first_name", "")} {_.get(candidateProfileData, "last_name", "")} -{" "}
            {capitalize(_.get(candidateProfileData, "gender", ""))}
          </h1>
          <h2 className="bold">{_.get(candidateProfileData, "profile.work_status", "")}</h2>
        </div>
        <div className="d-flex justify-content-between mt-8">
          <h2>{_.get(candidateProfileData, "profile.job_title", "")}</h2>
          <h2>{_.get(candidateProfileData, "profile.job_location", "")}</h2>
        </div>
      </div>
      <div className="profile-view-card mb-50">
        <ProfileHeader
          _handleEditClick={_handleEditClick}
          candidateProfileData={candidateProfileData}
          _copyProfileLink={_copyProfileLink}
          showEditButton={props.showEditButton}
          showShareButton={props.showShareButton}
          showDeleteButton={props.showDeleteButton}
          setProfileShareModal={() => setProfileShareModal(true)}
          setSureAboutVideoDelete={() => setSureAboutVideoDelete(true)}
          publicPage={publicPage}
        />
      </div>
      <ProfessionalPassions candidateProfileData={candidateProfileData} />
      {!_.isEmpty(_.get(candidateProfileData, "experiences", [])) && <WorkExperience experiences={_.get(candidateProfileData, "experiences", [])} />}
      {!_.isEmpty(_.get(candidateProfileData, "projects", [])) && <Projects projects={_.get(candidateProfileData, "projects", [])} />}
      {!_.isEmpty(_.get(candidateProfileData, "skills", [])) && <Skills skills={_.get(candidateProfileData, "skills", [])} />}
      {!_.isEmpty(_.get(candidateProfileData, "education", [])) && <Education educations={_.get(candidateProfileData, "education", [])} />}
      <ProfileShareModal
        publicProfileLink={publicProfileLink}
        open={profileShareModal}
        onClose={() => setProfileShareModal(false)}
        copyProfileLink={_copyProfileLink}
      />
      <DeleteVideoModal open={sureAboutVideoDelete} onClose={() => setSureAboutVideoDelete(false)} handleDelete={_handleDeleteVideo} />
    </div>
  );
};

export default ProfileView;
