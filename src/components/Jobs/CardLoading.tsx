import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const CardLoading = () => {
  return (
    <div className="job-item">
      <div className="job-item-header">
        <div className="avatar">
          <Skeleton variant="circle" width={50} height={50} />
        </div>
        <div className="meta">
          <Skeleton />
          <div>
            <Skeleton width={51} />
            <Skeleton width={95} />
          </div>
        </div>
      </div>
      <div className="job-item-content">
        <Skeleton width={314} />
        <Skeleton width={314} />
        <Skeleton width={114} />
      </div>
      <div className="job-item-footer">
        <Skeleton width={127} />
      </div>
    </div>
  );
};

export default CardLoading;
