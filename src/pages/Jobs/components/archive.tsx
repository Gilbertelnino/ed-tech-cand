import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useArchive } from "react-hook-Archive";
import { Modal, Select, Button, SelectNew } from "../../../components/common";
import { Grid, Typography } from "@material-ui/core";
import Location from "../../../components/common/Location";
import { pluckFromArray } from "../../../utils/helper";
import { get, isEmpty, forEach } from "lodash";
import TextEditor from "../../../../src/components/common/TextEditor";
import { createJobRequest, updateJobRequest, jobTypesRequest, jobLevelsRequest, salaryRangesRequest } from "../../../../src/reducers/job/jobs.reducer";

const _ = { get, isEmpty, forEach };

type Inputs = {
  title: string;
  type: string;
  location: string;
  level: string;
  external_link: string;
  salary_range: string;
  description: boolean;
};

const Archive = (props) => {

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