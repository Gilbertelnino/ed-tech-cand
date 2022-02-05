import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";
import unknownProfile from "../../../../assets/images/unknownProfile.jpeg";
import { ReactComponent as MoreVert } from '../../../../assets/svg/more-vertical.svg';
import { ReactComponent as SmallCirlce } from '../../../../assets/svg/small-circle.svg';
import UserAvatar from "../../../../components/common/UserAvatar";
import {
  Star as StarFillIcon,
  StarOutline as StarEmptyIcon,
  PlayArrow as PlayArrowIcon
} from '@material-ui/icons';
import { Grid, Box } from "@material-ui/core";
import { Button } from "../../../../components/common";
import { getInitialLetter, JSONParse } from "../../../../utils/helper";
import { useHistory } from "react-router-dom";
import appRoutes from "../../../../routes/app.routes";

interface ICandidateListBox {
  details: object;
  handleFavorite?: (data) => void;
  handleOpenVideoModal?: (data) => void;
  handleOpenProfileModal?: (data) => void;
  handleOpenStatusMenu?: (e, data) => void;
  handleRedirectToMessages?: (data) => void;
  [key: string]: any;
}

const CandidateListBox = (props: ICandidateListBox) => {
  const history = useHistory();
  const candidateDetails: any = _.get(props, "details", {});


  const _handleFavorite = (): void => {
    const { handleFavorite } = props;

    if (typeof handleFavorite === "function") {
      handleFavorite(candidateDetails);
    }
  }

  const _handleOpenStatusMenu = (e): void => {
    const { handleOpenStatusMenu } = props;

    if (typeof handleOpenStatusMenu === "function") {
      handleOpenStatusMenu(e, candidateDetails);
    }
  }

  const _handleOpenProfileModal = (): void => {
    const path = appRoutes.candidatePublicProfile.generateFullPath(candidateDetails.slug);
    window.open(path, '_blank');
  }

  const _handleOpenVideoModal = (): void => {
    const { handleOpenVideoModal } = props;

    if (typeof handleOpenVideoModal === "function") {
      handleOpenVideoModal(candidateDetails);
    }
  }

  const _renderUserLocation = (): string => {

    const jobTitle = (candidateDetails.job_title || "");
    const workStatus = (candidateDetails.work_status || "");
    const jobLocationJson: any = JSONParse((candidateDetails.job_location_json || ""));
    const city = (jobLocationJson.city || "");

    return [jobTitle, city, workStatus].filter(a => a).join(" | ");
  }

  const _handleRedirectToMessages = () => {
    const { handleRedirectToMessages } = props;

    if (typeof handleRedirectToMessages === "function") {
      handleRedirectToMessages(candidateDetails)
    }
  }

  return (
    <div className="candidate-preview" >
      <Grid item xs={12} sm={2} md={2} lg={1} className="user-image" >
        <UserAvatar
          size="md"
          className="cursor-pointer"
          src={_.get(candidateDetails, "profile_image", { unknownProfile })}
          variant="circle"
          onClick={() => _handleOpenProfileModal()}
        >
          {/* Fallback initial letters of candidate */}
          <span className="text-black">{getInitialLetter(`${candidateDetails.first_name} ${candidateDetails.last_name}`)}</span>
        </UserAvatar>
        {!_.isEmpty(candidateDetails.profile_video) && (
          <PlayArrowIcon className="play-icon cursor-pointer" onClick={() => _handleOpenVideoModal()} />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={10} className="user-detail-preview">
        <div className="user-heading">
          <Box className="candidate-info-cluster">
            <span
              className="user-name cursor-pointer text-capitalize"
              onClick={() => _handleOpenProfileModal()}
            >
              {candidateDetails.first_name}{" "}{candidateDetails.last_name}
            </span>
            {(candidateDetails.favorite === "favorite") ? (
              <StarFillIcon color="secondary" className="cursor-pointer fav-star-icon" onClick={() => _handleFavorite()} />
            ) : (
              <StarEmptyIcon color="secondary" className="cursor-pointer fav-star-icon" onClick={() => _handleFavorite()} />
            )}
            {!_.isEmpty(candidateDetails.status) && (
              <label className={`candidate-${(candidateDetails.status || "").toLowerCase()} text-capitalize`}>{candidateDetails.status}</label>
            )}
            {/* <MoreHorizontalIcon className="more-icon cursor-pointer" onClick={(e) => _handleOpenStatusMenu(e)} /> */}
          </Box>
          <Box className="user-location">
            {_renderUserLocation()}
          </Box>
        </div>
        <div className="user-values">
          <SmallCirlce className="user-values-dot" /><span className="d-block">Applied on <span className="font-bold-500">{moment(candidateDetails.applied_at).format("Do MMM YYYY")}</span></span>
          <SmallCirlce className="user-values-dot" /><span className="d-block mt-2">Applied for <span className="font-bold-500">{candidateDetails.job_title}</span></span>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={1} className="message">
        <Button variant="outlined" className="btn-small btn-small-transparant btn-message" onClick={() => _handleRedirectToMessages()}>Message</Button>
      </Grid>
        <MoreVert className="more-icon cursor-pointer" onClick={(e) => _handleOpenStatusMenu(e)} />
    </div>
  )
}
export default CandidateListBox;
