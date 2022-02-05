import React, { useState } from 'react';
import ReactPlayer from "react-player";
import { Modal } from "../../../components/common";


const videoModal = (props) => {


  const handleModalClose = () => {
    props.handleOnClose()
  }

  return (
    < Modal
      visible={props.status}
      closeButton={true}
      onClose={() => handleModalClose()}
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
        url={props.candidateVideoUrl}
        playing={true}
        controls={true}
      />
    </Modal >
  );
}

export default videoModal;
