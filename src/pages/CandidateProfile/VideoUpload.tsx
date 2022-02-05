import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { VideoUploader } from "./VideoUploader";
import { Modal, FlashMessage, Button } from "../../components/common";
import { FormLabel, Grid, Typography, Box } from "@material-ui/core";
import videoSampleImage1 from "../../assets/images/videoSampleImage1.jpg";
import videoSampleImage2 from "../../assets/images/videoSampleImage2.png";
import videoSampleImage3 from "../../assets/images/videoSampleImage3.png";
import VideoQuestions from "./commonUI/VideoQuestions";
import { ReactComponent as Readprompt } from "../../assets/svg/read-prompts.svg";
import { deleteVideoRequest } from "../../reducers/candidate/candidate.reducer";

const VideoUpload: React.FunctionComponent<any> = (props) => {
  //const [videoModal, setVideoModal] = useState(false);
  const dispatch = useDispatch();
  const { profileVideoUrl, totalVideos, isUploading } = props;
  const [demoVideoModal, setDemoVideoModal] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [demoUrl, setDemoUrl] = useState("");
  const [sureAboutVideoDelete, setSureAboutVideoDelete] = useState(false);
  const [videoValidationMessage, setVideoValidationMessage] = useState("");
  const [userVideoUrl, setUserVideoUrl] = useState("");
  // video validation needs to be completed.
  // add scroll feauture in the modal

  const [videoProgressPercentage, setVideProgressPercentage] = useState(10);
  const {
    candidates: { loading, deleteflag: videoDeleteFlag },
  } = useSelector(({ candidate }) => candidate);

  // Delete video success Hook
  useEffect(() => {
    if (videoDeleteFlag === true) {
      handleDeleteModalClose();
      _setUserVideoUrl("");
    }
  }, [videoDeleteFlag]);

  // set candidate profile video url hook
  useEffect(() => {
    if (profileVideoUrl) {
      _setUserVideoUrl(profileVideoUrl);
    }
  }, [profileVideoUrl]);

  const handleDelete = () => {
    dispatch(deleteVideoRequest());
  };
  const openDeleteModal = () => {
    setSureAboutVideoDelete(true);
  };
  const handleDeleteModalClose = () => {
    setSureAboutVideoDelete(false);
  };

  const _toggleModal = () => {
    setDemoVideoModal((prev) => !prev);
  };
  const _setUserVideoUrl = (srcURL: string) => {
    setUserVideoUrl(srcURL);
  };
  const _toggleDemoModal = (url) => {
    setDemoVideoModal((prev) => !prev);
    setDemoUrl(url);
  };
  const _toggleInstructionModal = () => {
    setInstructionModal((prev) => !prev);
  };
  const _setVideoValidation = (msg: string) => {
    setVideoValidationMessage(msg);
  };
  const _VideoModalContainer = () => {
    return (
      <Modal
        visible={demoVideoModal}
        closeButton={true}
        onClose={() => {
          _toggleModal();
        }}
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
          url={demoUrl}
          playing={true}
          controls={true}
        />
      </Modal>
    );
  };
  const getVideoDeleteModal = () => {
    return (
      <Modal visible={sureAboutVideoDelete} size="medium" title=" " className="video-delete-modal" closeButton={sureAboutVideoDelete} onClose={handleDeleteModalClose} closeOnBackDrop={sureAboutVideoDelete}>
        <Grid container xs={12} className="video-delete-modal-wrapper">
          <Grid item spacing={2} xs={12} className="delete-video-lable-wrapper">
            <Typography variant="h3" gutterBottom className="text-center delete-video-lable">
              <b> Delete </b> this video?
            </Typography>
          </Grid>
          <Grid item spacing={2} xs={12} className="text-center action-button-wrapper">
            <Button disabled={loading} className="primary-btn btn-transparent dlt-btn delete-video-no" onClick={() => handleDeleteModalClose()} >No</Button>
            <Button loading={loading} className="primary-btn dlt-btn delete-video-yes" onClick={() => handleDelete()} >Yes</Button>
          </Grid>
        </Grid>
      </Modal>
    );
  };
  const _UserVideoContainer = (videoUrl) => {
    return (
      <div className="video-user-upload">
        <ReactPlayer
          width="100%"
          height="100%"
          url={videoUrl}
          playing={false}
          controls={true}
        />
      </div>
    );
  };
  const _resetVideoPercentage = () => {
    setVideProgressPercentage(0);
  };
  return (
    <Box
      display="flex"
      alignItems="stretch"
      justifyContent="center"
      className="video-upload-sec"
    >
      <Box display="flex" flexDirection="column" className="sample-videos">
        <FormLabel color="primary">Watch the Demo</FormLabel>
        <div className="video-thumbnail-wrap">
          <div className="video-thumbnail">
            <img
              className="image-position-video"
              src={videoSampleImage1}
              onClick={() => _toggleDemoModal("https://youtu.be/cpRf2h3pnP4")}
            />
          </div>

          {/* <div className="video-thumbnail">
            <img
              className="image-position-video"
              src={videoSampleImage2}
              onClick={() => _toggleDemoModal("https://youtu.be/h8KSbtoYL1A")}
            />
          </div>

          <div className="video-thumbnail">
            <img
              className="image-position-video"
              src={videoSampleImage3}
              onClick={() => _toggleDemoModal("https://youtu.be/Tdp7a9p4IJsA")}
            />
          </div> */}
        </div>
        <Box display="flex" flexDirection="column" className="help-prompt">
          <FormLabel color="primary">Read the Prompts</FormLabel>

          <div className="background-prompt col text-center">
            <p>
              <b>Need help getting creative on your employHER video?</b>
              Check out our get-to-know questions for some inspiration and
              creativity.
            </p>
            <div>
              <Readprompt />
            </div>
            <div>
              <Button
                variant="outlined"
                className="border-button show-me-btn"
                color="secondary"
                onClick={() => {
                  setInstructionModal(true);
                }}
              >
                Show Me
              </Button>
            </div>
          </div>

          <Modal
            className="video-question-modal"
            visible={instructionModal}
            closeButtonCross={true}
            closeOnBackDrop={true}
            size="large"
            onClose={() => {
              _toggleInstructionModal();
            }}
          >
            <VideoQuestions />
          </Modal>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" className="video-upload">
        {/* <FormLabel color="primary">
          Upload a Video<span className="asterix">*</span>
        </FormLabel> */}
        {/* <Button  className=" primary-btn">Video Studio </Button> */}
        <div className="video-upload-instruction-wrapper">

          <VideoUploader
            uploadVideo={(file) => props.uploadVideo(file, "video")}
            videoValidator={_setVideoValidation}
            setUserVideoSource={_setUserVideoUrl}
            isUploading={isUploading}
            profileVideoUrl={profileVideoUrl}
            openDeleteModal={openDeleteModal}
            totalVideos={(totalVideos || 0)}
          />

          <p className="video-instruction">
            A one minute professional introductory video in MP4 or MOV format.
          </p>
          <div className="video-upload-messages">{videoValidationMessage}</div>
          {/* {props.isVideoUploading ? (<LinearProgress variant="determinate" value={videoProgressPercentage} />) : ""} */}

          <div className="video-upload-messages">
            {props.isVideoSaving && (
              <Grid className="text-center">Video upload in progress</Grid>
            )}

            {props.hasVideoSaved ? _resetVideoPercentage() : ""}
            {props.hasVideoSaveFailed && (
              <Grid className="text-center">
                Video Upload failed, Please try again.
              </Grid>
            )}
          </div>
        </div>
        {_VideoModalContainer()}
        {getVideoDeleteModal()}
        {userVideoUrl && !isUploading ? (
          _UserVideoContainer(userVideoUrl)
        ) : (
          <div className="background-video">
            <p>{isUploading ? "Uploading..." : "Video Previewer"}</p>
          </div>
        )}
      </Box>

      <Box display="flex" flexDirection="column" className="video-instruction-main-wrap">
        <FormLabel color="primary">Video Instructions</FormLabel>
        <div className="video-instruction-wrap ">
          <div className="vi-inner-wrap col">
            <p>
              First, we would love to hear about your passions and hobbies outside of your employment, here are some examples
            </p>
            <ul>
              <li>What makes your heart happy?</li>
              <li>What makes you want to wake up every day?</li>
            </ul>
          </div>
          <div className="vi-inner-wrap col">
            <p>
              Second, we would love to hear about what you’re looking for in your next dream career or employer, here are some examples
            </p>
            <ul>
              <li>What motivates you?</li>
              <li>What are you passionate about?</li>
              <li>What are you looking for in your next employer?</li>
            </ul>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default VideoUpload;
