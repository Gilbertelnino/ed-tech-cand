import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Button, Modal } from "../../common";

function DeleteVideoModal({ open, onClose, handleDelete }) {
  return (
    <Modal
      visible={open}
      size="medium"
      title="Heads up!"
      className="video-delete-modal profile-modal"
      closeButton={open}
      onClose={onClose}
      closeOnBackDrop={open}
    >
      <Grid container xs={12} className="video-delete-modal-wrapper">
        <Grid item spacing={2} xs={12} className="delete-video-lable-wrapper">
          <Typography variant="h3" gutterBottom className="text-center delete-video-lable">
            Do you want to delete video?
          </Typography>
        </Grid>
        <Grid item spacing={2} xs={12} className="text-center action-button-wrapper">
          <Button className="primary-btn dlt-btn delete-video-yes" onClick={() => handleDelete()}>
            Confirm
          </Button>
          <Button className="primary-btn btn-transparent dlt-btn delete-video-no" onClick={() => handleDelete()}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default DeleteVideoModal;
