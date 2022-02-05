import React from "react";
import { isEmpty, isObject, get } from "lodash";
import VideocamIcon from "@material-ui/icons/Videocam";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const _ = { isEmpty, isObject, get };

const Videos = () => {
  return (
    <>
      <h4 className="title">Our HER Videos</h4>
      <div className="video-section">
        <div className="background-video">
          <VideocamIcon className="video-icon" fontSize="large" />
          {/* <PlayCircleFilledIcon /> */}
        </div>
        <div className="background-video">
          <VideocamIcon className="video-icon" fontSize="large" />
          {/* <PlayCircleFilledIcon /> */}
        </div>
        <div className="background-video">
          <VideocamIcon className="video-icon" fontSize="large" />
          {/* <PlayCircleFilledIcon /> */}
        </div>
      </div>
    </>
   
  );

}

export default Videos;