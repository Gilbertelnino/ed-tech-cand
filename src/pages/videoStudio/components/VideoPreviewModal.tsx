import React from "react";
import { Grid } from "@material-ui/core/";
import { Save as SaveIcon } from "@material-ui/icons";
import { Modal, Button } from "../../../components/common";
import { VIDEO_PREVIEW_FLAG } from "../../../types/videoStudio.types";
import VideoProgess from "./VideoProgess";

interface IVideoPreviewModal {
  show: boolean;
  videoPreviewFlag: VIDEO_PREVIEW_FLAG;
  videoPreviewBlob: Blob;
  onClose: (action: string) => void;
}

const VideoPreviewModal = (props: IVideoPreviewModal) => {
  const _handleOnClose = (action = "") => {
    const { onClose } = props;

    if (typeof onClose === "function") {
      onClose(action);
    }
  };
  const loading = props.videoPreviewFlag === VIDEO_PREVIEW_FLAG.IDLE || props.videoPreviewFlag === VIDEO_PREVIEW_FLAG.INPROGRESS;
  return (
    <Modal
      title="Preview Video"
      visible={props.show}
      size="large"
      className={loading ? "loading-modal" : "save-video-modal"}
      onClose={() => _handleOnClose()}
    >
      {/* Show loading indicator */}
      {loading && <VideoProgess handleOnClose={(e) => _handleOnClose()} />}
      {props.videoPreviewFlag === VIDEO_PREVIEW_FLAG.DONE_PREVIEW && (
        <Grid item xs={12} className="saving-grid">
          <video className="w-100" src={window.URL.createObjectURL(props.videoPreviewBlob)} controls />
          <div className="settings-button-section">
            <Button onClick={(e) => _handleOnClose("save")}>
              <SaveIcon /> &nbsp; Save video
            </Button>
          </div>
        </Grid>
      )}
    </Modal>
  );
};

export default VideoPreviewModal;
