import React from "react";
import { LinearProgress } from "@material-ui/core/";
import { ReactComponent as SavingGraphic } from "../../../assets/svg/video-studio-saving.svg";
import { Button } from "../../../components/common";

function VideoProgess(props: any) {
  return (
    <div className="video-progress-wrapper">
      <div className="info">
        <SavingGraphic />
        <h2>Hang Tight!</h2>
        <p>You can’t rush perfection.</p>
        <Button className="btn-cancel" onClick={(e) => props.handleOnClose(e)}>
          Cancel
        </Button>
      </div>
      <LinearProgress />
    </div>
  );
}

export default VideoProgess;
