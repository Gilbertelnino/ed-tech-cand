import React from "react";
import { ReactComponent as CopyIcon } from "../../../assets/svg/copy-icon.svg";
import { ReactComponent as PlayVideoText } from "../../assets/svg/play-video-text.svg";
import { IconButton } from "@material-ui/core";
import { Modal } from "../../common";

function ProfileShareModal({ open, onClose, copyProfileLink, publicProfileLink }) {
  return (
    <Modal title="Share Candidate Profile" visible={open} className="profile-modal share-profile-modal" onClose={() => onClose()}>
      <div className="shareable-link-wrapper">
        <p>Copy the link to share this video profile with recruiting or hiring professionals</p>
        <h2>Profile Link</h2>
        <div className="shareable-link">
          <span className="generate-link"> {publicProfileLink} </span>
          <IconButton className="copy-button" aria-label="fileCopy" onClick={(e) => copyProfileLink()}>
            <CopyIcon />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileShareModal;
