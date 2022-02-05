import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as NoJobFound } from "../../../assets/svg/no-job-found.svg";

const NoResultFound = () => {
  return (
    <Grid container xs={12} className="no-jobs-found-wrapper">
      <Grid item spacing={8} xs={5} className="no-jobs-found-svg">
        <NoJobFound />
      </Grid>
      <Grid item spacing={8} xs={7} className="no-jobs-found-text">
        <div className="no-jobs-found">
          <h3 className="no-open-jobs">No result found</h3>
        </div>
      </Grid>
    </Grid>
  )
}

export default NoResultFound;