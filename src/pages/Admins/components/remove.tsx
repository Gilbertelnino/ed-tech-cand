import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Button, Modal } from "../../../components/common";

interface Props {
  id: number;
  loading: boolean;
  visible: boolean;
  handleClose: () => void;
  handleDelete: (id: number) => void;
}

const adminDeleteModal = ({ loading, visible, handleClose, id, handleDelete }: Props) => {

  return (
    <Modal
      visible={visible}
      size="medium"
      title=" "
      className="remove-admin-modal"
      closeButton={visible}
      onClose={handleClose}
      closeOnBackDrop={visible}
    >
      <Grid container xs={12} className="remove-admin-modal-wrapper">
        <Grid item spacing={2} xs={12} className="admin-remove-lable-wrapper">
          <Typography
            variant="h3"
            gutterBottom
            className="text-center admin-remove-lable"
          >
            <b> Delete </b> this admin?
          </Typography>
        </Grid>
        <Grid
          item
          spacing={2}
          xs={12}
          className="text-center action-button-wrapper"
        >
          <Button
            disabled={loading}
            className="primary-btn btn-transparent dlt-btn delete-video-no"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            loading={loading}
            className="primary-btn dlt-btn delete-video-yes"
            onClick={() => handleDelete(id)}
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default adminDeleteModal;