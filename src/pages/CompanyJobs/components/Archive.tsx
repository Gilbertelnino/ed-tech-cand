import React from "react";
import { Modal, Button } from "../../../components/common";
import { Grid, Typography } from "@material-ui/core";
import { get, isEmpty, forEach } from "lodash";

const _ = { get, isEmpty, forEach };

type ArchiveProps = {
  handleJobArchived: () => any;
  handleClose: () => any;
  loading: boolean;
  open: boolean;
};

const Archive = (props: ArchiveProps) => {

  const { loading, open, handleClose, handleJobArchived } = props;

  return (
    <Modal
      visible={open}
      size="medium"
      title=" "
      className="job-archive-modal"
      closeButton={open}
      onClose={() => handleClose()}
      closeOnBackDrop={open}
    >
      <Grid container xs={12} className="job-archive-modal-wrapper">
        <Grid item spacing={2} xs={12} className="archive-job-lable-wrapper">
          <Typography
            variant="h3"
            gutterBottom
            className="text-center archive-job-lable"
          >
            <b> Archive </b> this job?
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
            className="primary-btn btn-transparent dlt-btn archive-job-no"
            onClick={() => handleClose()}
          >
            No
          </Button>
          <Button
            loading={loading}
            className="primary-btn dlt-btn archive-job-yes"
            onClick={() => handleJobArchived()}
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Archive;