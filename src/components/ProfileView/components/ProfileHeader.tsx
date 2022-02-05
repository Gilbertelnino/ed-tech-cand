import _ from "lodash";
import React from "react";
import ReactPlayer from "react-player";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import { ReactComponent as DeleteIcon } from "../icons/delete_icon.svg";
import { ReactComponent as LinkIcon } from "../icons/link_icon.svg";
import { ReactComponent as PenIcon } from "../icons/pen_icon.svg";

interface IProfileHeader {
  _copyProfileLink: () => void;
  candidateProfileData: any;
  _handleEditClick: () => void;
  showEditButton?: boolean;
  showShareButton?: boolean;
  showDeleteButton?: boolean;
  setProfileShareModal: () => void;
  setSureAboutVideoDelete: () => void;
  publicPage?: boolean;
}

const VideoPlaceHolder = () => (
  <div className="video-placeholder-wrapper">
    <ImageIcon />
  </div>
);

const PlayIcon = () => (
  <div className="play-icon">
    <PlayArrowOutlinedIcon />
  </div>
);

function _ProfileHeader({
  candidateProfileData,
  _handleEditClick,
  showEditButton,
  showShareButton,
  showDeleteButton,
  setProfileShareModal,
  setSureAboutVideoDelete,
  publicPage,
}: IProfileHeader) {
  return (
    <div className="profile-view-header">
      <div className="video-wrapper">
        <div className="video-player-wrapper" >
            {_.isEmpty(_.get(candidateProfileData, "profile.profile_video", "")) ? (
              <VideoPlaceHolder />
            ) : (
              <ReactPlayer controls playIcon={<PlayIcon />} className="video-player-inner-wrapper"  url={_.get(candidateProfileData, "profile.profile_video", "")} />
            )}
        </div>
        {!publicPage && (
          <div className="action">
            {showDeleteButton && (
              <div className="action-item">
                <div onClick={setSureAboutVideoDelete} className="action-item-icon">
                  <DeleteIcon />
                </div>
                <div className="action-item-label bottom">Delete video</div>
              </div>
            )}
            {showShareButton && (
              <div className="action-item">
                <div className="action-item-label top">Share profile</div>
                <div onClick={setProfileShareModal} className="action-item-icon">
                  <LinkIcon />
                </div>
              </div>
            )}
            {showEditButton && (
              <div className="action-item">
                <div onClick={_handleEditClick} className="action-item-icon">
                  <PenIcon />
                </div>
                <div className="action-item-label bottom">Edit profile</div>
              </div>
            )}
          </div>
        )}
        <div className={`about ${publicPage && "mt-30"}`}>
          <span className="about-quote">“</span>
          <p>{_.get(candidateProfileData, "profile.personal_values", "")}</p>
          <span className="about-quote">“</span>
        </div>
      </div>
    </div>
  );
}

export default _ProfileHeader;
