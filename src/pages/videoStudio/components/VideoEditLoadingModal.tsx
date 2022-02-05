import React from "react";
import { Typography, Grid, LinearProgress } from '@material-ui/core/';
import { ReactComponent as SavingGraphic } from "../../../assets/svg/video-studio-saving.svg";
import { Modal } from '../../../components/common';
import _ from "lodash";

interface IVideoPreviewModal {
  show: boolean;
  loadingPercentage: number;
  onClose?: () => void;
};

const VideoEditLoadingModal = (props: IVideoPreviewModal) => {

  const _handleOnClose = () => { }

  return (
    <Modal
      visible={props.show}
      size="large"
      className="save-video-modal"
      closeButton={true}
      onClose={() => _handleOnClose()}
    >
      <Grid item xs={12} className="saving-grid">
        <div className="saving-svg">
          <SavingGraphic />
        </div>
        <Typography variant="h3" className="saving-modal-title" >
          <b>Hang Tight!</b>
        </Typography>
        <Typography variant="body1" className="saving-file-modal-text" >
          Preparing your studio ({props.loadingPercentage.toFixed()}%)...
        </Typography>
        <div className="saving-modal-progress-container">
          <LinearProgress />
        </div>
      </Grid>
    </Modal>
  )
}

export default VideoEditLoadingModal;
