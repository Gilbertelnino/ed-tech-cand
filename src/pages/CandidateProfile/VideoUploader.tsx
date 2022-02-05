import React, { useRef, useState } from "react";
import _ from "lodash";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import { validateFileSize } from "../../components/helpers/formValidation";
import { ReactComponent as BulbGearIcon } from "../../assets/images/bulb-gear.svg";
import { Button, Spinner } from "../../components/common";
// import PreviewVideo from "../../assets/images/media-placholder.jpg";
import ReactPlayer from "react-player";
import YouTubePlayer from "react-player/youtube";
import { useHistory } from "react-router";
import appRoutes from "../../routes/app.routes";
import InspirationModal from "./InspirationModal";

const VideoPlaceHolder = () => (
  <div className="video-placeholder-wrapper">
    <ImageIcon />
  </div>
);

const VideoUploader: React.FC<any> = (props) => {

  const ref: any = useRef();
  const history = useHistory();
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [inspirationModal, setInspirationModal] = useState(false);
  const _handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const fileSize = validateFileSize(file.size, 6);
    if (!_.isEmpty(fileSize)) {
      setErrorMessage(fileSize);
      return;
    }
    await props.uploadVideo(file, "video");
    setVideoFilePath(URL.createObjectURL(file));
  };

  const url = videoFilePath || props.profileVideoUrl;

  return (
    <div className="info-wrapper video-uploader-wrapper">
      <div className="video-uploader-row">
        <div className="video-uploader-col">
          <h5 className="title">Watch The Demos</h5>
          <div className="img-preview">
            <YouTubePlayer width="535px" height="287px" url={"https://www.youtube.com/watch?v=Tdp7a9p4IJs"} />
          </div>
        </div>
        <div className="video-uploader-col">
          <h5 className="title">Read The Prompts</h5>
          <div className="box">
            <p>Need help getting creative on your employHER video? Check out our get-to-know questions for some inspiration and creativity.</p>
            <div className="d-flex justify-content-center">
              <Button onClick={() => setInspirationModal(true)} color="secondary">
                Questions for some Inspiration
              </Button>
            </div>
            <div className="bulb-gear-icon">
              <BulbGearIcon />
            </div>
          </div>
        </div>
      </div>
      <span className="separator" />
      <div className="video-uploader-row">
        <div className="video-uploader-col">
          <div className="box button-box">
            <div className="studio">
              <Button color="primary" onClick={() => history.push(appRoutes.candidateVideos.path)}>Video Studio</Button>
            </div>
            <div className="group">
              <Button onClick={() => ref.current.click()} color="secondary">
                Upload Video
              </Button>
              <input ref={ref} onChange={_handleFileUpload} type="file" hidden />
              <span>OR</span>
              <Button color="create-video" onClick={() => history.push(appRoutes.candidateCreateVideo.path)}>Create my video</Button>
            </div>
            <p>A one minute professional introductory video in MP4 or MOV format.</p>
          </div>
        </div>
        <div className="video-uploader-col">
          <Spinner visible={_.get(props, "isUploading")}>
            {_.isEmpty(url) || _.isUndefined(url) ? <VideoPlaceHolder /> : <ReactPlayer width="535px" height="282px" url={url} controls />}
          </Spinner>
          <div className="error-helper text-center mt-2">{errorMessage}</div>
        </div>
      </div>
      <span className="separator" />
      <div className="video-uploader-row">
        <div className="instructions">
          <h5 className="title">Video Instructions</h5>
          <strong>First, we would love to hear about your passions and hobbies outside of your employment, here are some examples</strong>
          <ul>
            <li>What makes your heart happy?</li>
            <li>What makes you want to wake up every day?</li>
          </ul>
          <strong>Second, we would love to hear about what you’re looking for in your next dream career or employer, here are some examples</strong>
          <ul>
            <li>What motivates you?</li>
            <li>What are you passionate about?</li>
            <li>What are you looking for in your next employer?</li>
          </ul>
        </div>
      </div>
      <InspirationModal open={inspirationModal} handleClose={() => setInspirationModal(false)} />
    </div>
  );
};
export default VideoUploader;
