import React from 'react';
import { Grid, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const CandidateListBoxSkeleton = (): JSX.Element => {

  return (
    <>
      {[1, 2, 3].map(row => (
        <div className="candidate-preview" >
          <Grid item md={1} className="user-image" >
            <Skeleton variant="circle" width={90} height={90} />
          </Grid>
          <Grid item className="user-detail-preview" md={9}>
            <div className="user-heading">
              <Box>
                <Skeleton variant="text" width={155} />
              </Box>
              <Box className="user-location" >
                <Skeleton variant="text" width={275} />
              </Box>
            </div>
            <div className="user-values">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </Grid>
          <Grid item md={2} className="message" style={{ marginTop: "30px", paddingLeft: "60px" }}>
            <Skeleton variant="rect" height={20} width="50%" />
          </Grid>
        </div>
      ))}
    </>
  )
}

export default CandidateListBoxSkeleton;
