
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as NoJobFound } from "../../../../assets/svg/no-candidate-applications-found.svg";

const NoCandidatesApplicationFound = () => {
  return (
    <Grid container xs={12} className="no-jobs-found-wrapper">
      <Grid item spacing={8} xs={5} className="no-jobs-found-svg">
        <NoJobFound />
      </Grid>
      <Grid item spacing={8} xs={7} className="no-jobs-found-text">
        <div className="no-jobs-found">
          <h3 className="no-open-jobs">No candidate applications found</h3>
          {/* <p className="no-open-jobs-text">
            Secondary text required here
          </p> */}
        </div>
      </Grid>
    </Grid>
  )
}

export default NoCandidatesApplicationFound;
