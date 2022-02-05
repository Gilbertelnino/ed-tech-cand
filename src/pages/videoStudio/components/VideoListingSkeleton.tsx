import React, { ReactNode } from 'react';
import { Card, Grid } from '@material-ui/core';
import Skeleton from "@material-ui/lab/Skeleton";


const VideoListingSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((row, key) => (
        <Grid item xs={12} sm={6} md={4} className="p-all-16" key={key}>
          <Card className="video-card" >
            <div className="video-img">
              <Skeleton variant="rect" height={240} />
            </div>
            <div className="video-info">
              <div className="video-basic-info">
                <div className="video-name">
                  <div className="name">
                    <Skeleton variant="text" height={50} width="60%" />
                  </div>
                </div>
              </div>
              <div className="video-created">
                <Skeleton variant="text" width="60%" />
              </div>
              <div className="video-description">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            </div>
            <div className="button-section d-inline">
              <Skeleton variant="text" width="50%" />
              &nbsp;&nbsp;&nbsp;
              <Skeleton variant="text" width="50%" />
            </div>
          </Card>
        </Grid>
      ))}
    </>
  )
}

export default VideoListingSkeleton;
