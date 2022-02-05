import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Actions from "./components/Actions";

import ReactPlayer from "react-player";
import _ from "lodash";

import CandidateListBox from "./components/CandidateListBox";
import CandidateListBoxSkeleton from "./components/CandidateListBoxSkeleton";
import { Modal, Input, Button } from "../../../components/common";

import {
  companyCandidateApplicationsRequest, companyCandidatesToggleFavoriteReset, companyCandidateToggleFavoriteRequest, companyCandidateApplicationsUpdate,
  companyCandidateUpdateStatusRequest, companyCandidateUpdateStatusReset
} from "../../../reducers/company/companyCandidateApplications.reducer";

import ProfileView from "../../../components/ProfileView/ProfileView";
import NoCandidatesApplicationFound from "./components/NoCandidatesApplicationFound";
import appRoutes from "../../../routes/app.routes";
import { storeNewMessageInfo } from "../../../utils/helper";
import { tabChangeRequest } from "../../../reducers/company/tabChange.reducer";

interface IKeyValPair {
  key: string;
  value: string;
}

const favoriteObj: IKeyValPair = { key: "favorite", value: "Favorite" };
const unFavoriteObj: IKeyValPair = { key: "unfavorite", value: "Unfavorite" };

const defaultCandidateStatus: Array<IKeyValPair> = [
  { key: "move candidate to", value: "Move Candidate to" },
  { ...favoriteObj },
  { key: "qualified", value: "Qualified" },
  { key: "contacted", value: "Contacted" },
  { key: "screening", value: "Screening" },
  { key: "interviewed", value: "Interviewed" },
  { key: "hired", value: "Hired" },
  { key: "rejected", value: "Rejected" },
];

type RejectFormInputs = {
  rejectMessage: string;
};

interface IPagination {
  page: number;
  pageSize: number;
  q?: string;
  status?: string;
}

const defaultPagination: IPagination = {
  page: 1,
  pageSize: 20,
  q: "",
  status: ""
}

const CompanyCandidates = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [candidateVideoUrl, setCandidateVideoUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [candidateAnchorEl, setCandidateAnchorEl] = useState<null | HTMLElement>(null);
  const [candidateStatus, setCandidateStatus] = useState<Array<IKeyValPair>>(defaultCandidateStatus);
  const [selectedCandidate, setSelectedCandidate] = useState<any>({});
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const openStatusMenu = Boolean(candidateAnchorEl);

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [candidateSlug, setCandidateSlug] = useState<string>("");

  const { register, handleSubmit, errors, watch } = useForm<RejectFormInputs>();

  const companyReducer = useSelector(({ company }: any) => company);
  const totalPages: number = _.get(companyReducer, "candidateApplications.list.pagination.totalPages", 0);
  const loadingCandidates: boolean = _.get(companyReducer, "candidateApplications.list.loading", false);
  const candidateList: Array<any> = (_.get(companyReducer, "candidateApplications.list.data", []) || []);
  const updateStatusData = _.get(companyReducer, "candidateApplications.updateStatus.data", {});
  const updateStatusFlag = _.get(companyReducer, "candidateApplications.updateStatus.flag", null);
  const favoriteData = _.get(companyReducer, "candidateApplications.favorite.data", {});
  const favoriteFlag = _.get(companyReducer, "candidateApplications.favorite.flag", null);


  // Hook, mount
  useEffect(() => {

    // Set active tab status
    let status = getActiveTab();
    _.isEmpty(status) ? setActiveTab("all") : setActiveTab(status);
  }, []);

  useEffect(() => {
    dispatch(companyCandidateApplicationsRequest({
      ...pagination,
      status: getActiveTab()
    }));
  }, [pagination]);

  // Hook, favorite and unfavorite candidates
  useEffect(() => {

    if (favoriteFlag !== null) {

      const updatedList = candidateList.map(row => {

        if (row.application_id === favoriteData.applicationId) {
          return { ...row, favorite: (favoriteData.favoriteState === "favorite" ? "favorite" : "unfavorite") }
        }

        return row;
      });

      dispatch(companyCandidateApplicationsUpdate({ data: updatedList }));
      dispatch(companyCandidatesToggleFavoriteReset());
    }

  }, [favoriteFlag]);

  // Hook, Update Status of candidates
  useEffect(() => {

    if (updateStatusFlag !== null) {

      const updatedList = candidateList.map(row => {

        if (row.application_id === updateStatusData.applicationId) {
          const status = ((defaultCandidateStatus.find((row: IKeyValPair) => row.key === (updateStatusData.statusType || "")) || {}).key || "");
          return { ...row, status }
        }

        return row;
      });

      dispatch(companyCandidateApplicationsUpdate({ data: updatedList }));
      dispatch(companyCandidateUpdateStatusReset());
    }

  }, [updateStatusFlag]);

  const handleTabClick = (type: string) => {
    dispatch(tabChangeRequest({ tab: 'candidates', innerTab: type }));
    switch (type) {
      case "Favorite":
        history.push(appRoutes.companyCandidateFavorite.path);
        break;
      case "Qualified":
        history.push(appRoutes.companyCandidateQualified.path);
        break;
      case "Contacted":
        history.push(appRoutes.companyCandidateContacted.path);
        break;
      case "Screening":
        history.push(appRoutes.companyCandidateScreening.path);
        break;
      case "Interviewed":
        history.push(appRoutes.companyCandidateInterviewed.path);
        break
      case "Hired":
        history.push(appRoutes.companyCandidateHired.path);
        break;
      case "Rejected":
        history.push(appRoutes.companyCandidateRejected.path);
        break;
      default:
        history.push(appRoutes.companyCandidates.path);
        break;
    }
  };

  const getActiveTab = (): string => {
    let status = "all";
    let pathName: string[] = (_.get(history, "location.pathname", "") || "").split("/").filter(a => a);

    if (pathName.length === 3) {
      status = (pathName.pop() || "");
    }

    return status;
  }

  const handleButtonClick = (type: string, text: any) => {
    switch (type) {
      case "Search":
        setPagination({ ...pagination, q: text })
        break;
      case "All":
      case "Favorite":
      case "Qualified":
      case "Contacted":
      case "Screening":
      case "Interviewed":
      case "Hired":
      case "Rejected":
        handleTabClick(type);
      default:
        break;
    }
  };


  const handleOpenVideoModal = (details: any = {}): void => {

    const videoUrl = (details.profile_video || "");

    if (!_.isEmpty(videoUrl)) {
      setCandidateVideoUrl(videoUrl);
      setShowVideoModal(true);
    }
  }

  const handleCloseVideoModal = (): void => {
    setCandidateVideoUrl("");
    setShowVideoModal(false);
  }

  const handleOpenProfileModal = (details: any = {}): void => {

    const slug = (details.slug || "");

    if (!_.isEmpty(slug)) {
      setCandidateSlug(slug);
      setShowProfileModal(true);
    }
  }

  const handleCloseProfileModal = (): void => {
    setCandidateSlug("");
    setShowProfileModal(false);
  }

  const onFeedbackFormSubmit = (data: RejectFormInputs): void => {

    dispatch(companyCandidateUpdateStatusRequest({
      statusType: "rejected",
      applicationId: selectedCandidate.application_id,
      params: {
        reject_reason: data.rejectMessage
      }
    }));

    // Reset
    setSelectedCandidate({});
    setShowRejectModal(false);
  }

  const handleCloseRejectModal = (): void => {
    setSelectedCandidate({});
    setShowRejectModal(false);
  }

  const handleFavorite = (details: any = {}): void => {

    const favoriteState = (details.favorite === "favorite") ? "unfavorite" : "favorite";
    const applicationId = (details.application_id || 0);

    dispatch(companyCandidateToggleFavoriteRequest({ applicationId, favoriteState }));
  }

  const handleOpenStatusMenu = (event, details: any = {}) => {

    // Set menu
    let tmpCandidateStatus: Array<IKeyValPair> = [...defaultCandidateStatus];

    // Update Favorite and Unfavorite status
    const favoriteState = (details.favorite === "favorite") ? "favorite" : "unfavorite";

    if (favoriteState === "favorite") {
      tmpCandidateStatus[1] = { ...unFavoriteObj };
    } else if (favoriteState === "unfavorite") {
      tmpCandidateStatus[1] = { ...favoriteObj };
    }

    // Remove status apart from All and Favorites tab
    if (!["all", "favorite"].includes(activeTab)) {

      // Remove current Status
      tmpCandidateStatus = tmpCandidateStatus.filter((row: IKeyValPair) => row.key !== details.status);
    }

    setCandidateStatus(tmpCandidateStatus);
    setSelectedCandidate(details);

    // Open menu
    setCandidateAnchorEl(event.currentTarget);

  };

  const handleCloseStatusMenu = (option: IKeyValPair = { key: "", value: "" }) => {

    if (option.key === "rejected") {
      setShowRejectModal(true);
    } else if ((option.key === "favorite") || (option.key === "unfavorite")) {
      handleFavorite(selectedCandidate);
    } else if (option.key) {
      dispatch(companyCandidateUpdateStatusRequest({
        statusType: option.key,
        applicationId: selectedCandidate.application_id,
      }));
    }

    setCandidateAnchorEl(null);
  };

  const handleRedirectToMessages = (details) => {
    storeNewMessageInfo({
      slug: details.slug,
      userType: "candidate",
      uuid: details.candidate_id,
      first_name: details.first_name,
      last_name: details.last_name,
      profile_image: details.profile_image,
    });
    dispatch(tabChangeRequest({ tab: 'messages' }));
  }

  return (
    <>
      <Actions handleClick={handleButtonClick} {...props} />
      <div className="company-candidates">
        <Grid container>
          <Box width="100%" className="slim-scrollbar">
            {(loadingCandidates) ? (
              <CandidateListBoxSkeleton />
            ) : (
              <>
                {(candidateList.length > 0) ? (
                  (candidateList.map((item: any) => (
                    <CandidateListBox
                      details={item}
                      candidateStatus={candidateStatus}
                      handleFavorite={(details: any) => handleFavorite(details)}
                      handleOpenVideoModal={(details: any) => handleOpenVideoModal(details)}
                      handleOpenProfileModal={(details: any) => handleOpenProfileModal(details)}
                      handleOpenStatusMenu={(e, details: any) => handleOpenStatusMenu(e, details)}
                      handleRedirectToMessages={(details: any) => handleRedirectToMessages(details)}
                    />
                  )))
                ) : (
                  <NoCandidatesApplicationFound />
                )}
              </>
            )}
          </Box>
        </Grid>
      </div>

      {/* Video Player */}
      <Modal
        visible={showVideoModal}
        closeButton={true}
        onClose={() => handleCloseVideoModal()}
        closeButtonCross={true}
        size="large"
        className="youtube-video"
      >
        <ReactPlayer
          config={{
            youtube: {
              playerVars: { controls: 0, showInfo: 0 },
            },
          }}
          width="100%"
          height="80%"
          url={candidateVideoUrl}
          playing={true}
          controls={true}
        />
      </Modal>

      {/* Candidate Profile */}
      <Modal
        visible={showProfileModal}
        closeButton={true}
        onClose={() => handleCloseProfileModal()}
        closeButtonCross={true}
        size="x-large"
        className="profile-modal candidate-modal-wrap slim-scrollbar"
      >
        <ProfileView
          showEditButton={false}
          showShareButton={false}
          slug={candidateSlug}
        />
      </Modal>

      {/* Candidate Reject Modal */}
      <Modal
        visible={showRejectModal}
        closeButton={true}
        onClose={() => handleCloseRejectModal()}
        closeButtonCross={true}
        size="medium"
        className="reject-modal"
      >
        <form noValidate onSubmit={handleSubmit(onFeedbackFormSubmit)}>
          <Typography className="feedback-heading" variant="h6">Add Generic Feedback for Rejected Candidate</Typography>
          <Typography className="feedback-subheading" variant="subtitle1">
            Personalize feedback for
            <span className="rejected-name ml-3" >
              {(selectedCandidate.first_name || "")} {(selectedCandidate.last_name || "")}
            </span>
          </Typography>
          <p className="feedback-requirements">
            Feedback are visible to the candidate.<br></br>
            Please personalize your feedback for a better experience over a generic rejection message.
          </p>

          <Input
            name="rejectMessage"
            placeholder="Add Your Reason for declining connection"
            className="feedback-form"
            multiline={true}
            externalLabel={{ label: "Feedback" }}
            validationObj={errors}
            inputRef={register({
              required: {
                value: true,
                message: "Please enter rejection feedback",
              },
              maxLength: {
                value: 150,
                message: "Maximum text length exceeded",
              },
            })}
          />
          <div className="btn-grp">
            <Button type="submit" variant="contained" className="primary-btn reject-add-btn">Add</Button>
            <Button variant="outlined" color="transparent" className="btn-transparent reject-cancel-btn" onClick={() => { handleCloseRejectModal() }}>Cancel</Button>
          </div>
        </form>
      </Modal>
      <Menu
        id="status-menu"
        className="candidate-status-menu-wrap"
        anchorEl={candidateAnchorEl}
        keepMounted
        open={openStatusMenu}
        onClose={() => handleCloseStatusMenu()}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        {candidateStatus.map((option, key) => (
          <MenuItem key={key} onClick={() => handleCloseStatusMenu(option)}>
            {option.value}
            {(option.key === "rejected") && (
              <span className="feedback-btn" title="Feedback are visible to the candidate.">Feedback</span>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default CompanyCandidates;
