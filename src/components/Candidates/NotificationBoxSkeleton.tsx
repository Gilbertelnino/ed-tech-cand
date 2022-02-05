import React from "react";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const NotificationBoxSkeleton = (): JSX.Element => {
  return (
    <>
      {[1, 2, 3].map((row) => (
        <div className="notification-list-content">
          <div className="notification-card-details">
            <Grid container justify="space-between">
              <Grid item md={2} className="notification-card-left">
                <Skeleton variant="circle" width={90} height={90} />
              </Grid>
              <Grid item md={5} className="d-flex justify-content-between">
                <Skeleton width={190} height={90} />
                <Skeleton width={190} height={90} />
              </Grid>
            </Grid>
            <Grid item className="notification-card-middle" md={9}>
              <div className="user-values">
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </div>
            </Grid>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationBoxSkeleton;
