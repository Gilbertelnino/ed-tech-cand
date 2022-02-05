import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { Modal, Button, FlashMessage } from '../../../components/common';
import _ from "lodash";
import { MIN_VIDEO_DURATION_SEC, VIDEO_THUMB_BAR_WIDTH } from "../../../utils/appConstants";

type IVideoTrimModal = {
  show: boolean;
  videoSrc: any;
  onClose: () => void;
  onVideoCut: (effect: any) => void;
};

interface IDefaultPos {
  height: number;
  left: number;
  width?: number;
}

const defaultPos: IDefaultPos = {
  height: 52, left: 0, width: 0,
}

const VideoTrimModal = (props: IVideoTrimModal) => {

  const videoRef = useRef<HTMLVideoElement>();
  const videoThumbBar = useRef<HTMLDivElement>();
  const leftPosRef = useRef<HTMLDivElement>();
  const rightPosRef = useRef<HTMLDivElement>();
  const [thumbnails, setThumbnails] = useState<Array<any>>([]);
  const [leftPos, setLeftPos] = useState<IDefaultPos>(defaultPos);
  const [leftMask, setLeftMask] = useState<IDefaultPos>(defaultPos);
  const [rightPos, setRightPos] = useState<IDefaultPos>(defaultPos);
  const [rightMask, setRightMask] = useState<IDefaultPos>(defaultPos);

  const [leftPosIsDown, setLeftPosIsDown] = useState<boolean>(false);
  const [rightPosIsDown, setRightPosIsDown] = useState<boolean>(false);

  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  // Load thumbnails
  useEffect(() => {

    if (props.show) {

      document.addEventListener("mouseup", () => {

        // Bind the mouse position
        setLeftPosIsDown(false);
        setRightPosIsDown(false);
      });

      // Set start and end time
      setStartTime(0);
      setEndTime(_.get(props, "videoSrc.duration", 0));

      // Set thumbnails
      setThumbnails(props.videoSrc.thumbnails);

      // Set Left and Right side Position and Masking
      setLeftPos(defaultPos);
      setLeftMask(defaultPos);
      setRightPos(prevState => ({ ...prevState, left: (VIDEO_THUMB_BAR_WIDTH - 2) }));
      setRightMask(prevState => ({ ...prevState, width: 0 }));

      // Set meta data if any for previously cut video
      if (!_.isEmpty(_.get(props, "videoSrc.metaData", {}))) {
        const metaData = _.get(props, "videoSrc.metaData", {});

        setStartTime(metaData.startTime);
        setEndTime(metaData.endTime);
        setLeftPos(metaData.leftPos);
        setLeftMask(metaData.leftMask);
        setRightPos(metaData.rightPos);
        setRightMask(metaData.rightMask);

        // Set the current time for video
        setTimeout(() => {
          videoRef.current.currentTime = metaData.startTime;
        }, 1000);
      }

    }

  }, [props.show]);

  const handleOnClose = () => {
    const { onClose } = props;
    if (typeof onClose === "function") {
      onClose();
    }

    resetModal();
  }

  const _handleCutVideo = async () => {

    // Check duration, minimum should be 5seconds
    if ((endTime - startTime) >= MIN_VIDEO_DURATION_SEC) {
      const { videoSrc, onVideoCut } = props;

      const updatedEffect = {
        ...videoSrc,
        metaData: {
          startTime, endTime,
          leftPos, leftMask,
          rightPos, rightMask
        }
      }

      if (typeof onVideoCut === "function") {
        onVideoCut(updatedEffect);
      }

      // Reset the modal once closed
      handleOnClose();
    } else {
      FlashMessage(`Minimum duration must be ${MIN_VIDEO_DURATION_SEC}sec to cut the video`, "error");
    }
  }

  const _handleTrimVideo = (event: MouseEvent<HTMLDivElement>): void => {

    const { currentTarget: current } = event;

    event.preventDefault();

    let currentTime = 0;
    const clientRect = current.getBoundingClientRect(); // n
    const gVDuration = Math.floor(props.videoSrc.duration);
    const width = clientRect.width; // o
    const xPos = clientRect.x // i
    const leftPosRect = leftPosRef.current.getBoundingClientRect(); // l
    const rightPosRect = rightPosRef.current.getBoundingClientRect(); // a

    // Set the current
    if (leftPosIsDown || rightPosIsDown) {
      currentTime = (((event.clientX - clientRect.x) * gVDuration) / width);
    }

    if (leftPosIsDown) {
      let leftBarPos = event.clientX - xPos; // s

      if (leftBarPos < 0) { leftBarPos = 0; }

      if (leftBarPos > (rightPosRect.x - xPos)) { leftBarPos = (rightPosRect.x - xPos); }

      setLeftPos(prevState => ({ ...prevState, left: leftBarPos }));
      setLeftMask(prevState => ({ ...prevState, width: leftBarPos }));
      setStartTime(currentTime);
      videoRef.current.currentTime = currentTime;
    }
    if (rightPosIsDown) {
      let rightBarPos = (event.clientX - (xPos - 2));

      if (rightBarPos < (leftPosRect.x - xPos)) { rightBarPos = (leftPosRect.x - xPos); }

      if (rightBarPos > (width - 2)) { rightBarPos = (width - 2); }

      setRightPos(prevState => ({ ...prevState, left: rightBarPos }));
      setRightMask(prevState => ({ ...prevState, left: rightBarPos, width: (width - rightBarPos + 2) }));
      setEndTime(currentTime);
    }

  }

  const resetModal = () => {

    document.removeEventListener("mouseup", () => {
      // Release the mouse position
      console.log("event released");
    });

    setThumbnails([]);
    setLeftPos(defaultPos);
    setLeftMask(defaultPos);
    setRightPos(defaultPos);
    setRightMask(defaultPos);
    setLeftPosIsDown(false);
    setRightPosIsDown(false);
    setStartTime(0);
    setEndTime(0);
  }

  return (
    <Modal
      visible={props.show}
      size="x-large"
      closeOnBackDrop={true}
      onClose={() => handleOnClose()}
      className="video-trim-model"
    >
      <div>
        <div className="video-trim-player">
          <video ref={videoRef} className="previews-img" width="100%" height="100%" src={props.videoSrc.src} controls />
        </div>
        <div className="video-duration text-center">
          <p><span>Start Time:</span> {startTime.toFixed(2)}sec</p>
          <span>&nbsp;|&nbsp;</span>
          <p><span>End Time:</span> {endTime.toFixed(2)}sec</p>
          <span>&nbsp;|&nbsp;</span>
          <p><span>Duration:</span> {(endTime - startTime <= 0) ? "0.00" : (endTime - startTime).toFixed(2)}sec</p>
        </div>
        <div className="video-trim-bar" onMouseMove={_handleTrimVideo} >
          <div
            id="leftMask"
            className="pre-asset"
            style={{ height: leftMask.height, left: leftMask.left, width: leftMask.width }}
          />
          <div
            id="leftPos"
            ref={leftPosRef}
            onMouseDown={() => setLeftPosIsDown(true)}
            className="pre-asset"
            style={{ height: leftPos.height, left: leftPos.left }}
          />
          <div
            id="rightPos"
            ref={rightPosRef}
            onMouseDown={() => setRightPosIsDown(true)}
            className="pre-asset"
            style={{ height: rightPos.height, left: rightPos.left }}
          />
          <div
            id="rightMask"
            className="pre-asset"
            style={{ height: rightMask.height, left: rightMask.left, width: rightMask.width }}
          />

          <div ref={videoThumbBar} className="video-thumbs-bar">
            {((thumbnails || []).map((thumb, key) => <img key={key} width="80" height="50" src={URL.createObjectURL(thumb.blob)} alt="thumbs" />))}
          </div>
        </div>
        <div className="text-center bottom-control">
          <Button color="dark-pink" className="vs-button-settings" onClick={() => _handleCutVideo()}>
            Trim
          </Button>
          <Button color="dark-pink" className="vs-button-settings btn-transparent" onClick={() => handleOnClose()}>
            Discard
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default VideoTrimModal;
