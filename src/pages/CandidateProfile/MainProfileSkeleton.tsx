import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import UserAvatar from "../../components/common/UserAvatar";

const MainProfileSkeleton = () => {

  return (
    <div className="main-class">
      <Container
        maxWidth="lg"
        id="createProfileForm"
        className="create-profile-form"
      >
        <div className="user-profile-intro">
          <div className="her-profile">
            <Typography className="create-her-profile" variant="h3">
              <Skeleton width="30%" />
            </Typography>
            <Typography variant="caption" className="margin">
              <Skeleton width="30%" />
            </Typography>
          </div>
        </div>
        <div className="position-collapsible-label line-label-skeleton" >
          {["30%", "20%", "30%"].map((per, index) => <Skeleton key={`${index}-basic`} width={per} />)}
        </div>
        <Grid container spacing={2} justify="center" direction="column" alignItems="center">
          <Grid item>
            <Skeleton variant="circle">
              <UserAvatar size="md" variant="circle" />
            </Skeleton>
            <Typography variant="h5" className="mt-10">
              <Skeleton />
            </Typography>
          </Grid>
        </Grid>
        <div className="mt-25" >
          <Grid container spacing={2} justify="center" text-align="center" alignItems="center" className="basic-info-form-wrap">
            <Grid item xs={12} sm={4}>
              <Typography variant="h3">
                <Skeleton />
              </Typography>
              <Typography variant="caption" className="margin">
                <Skeleton width="50%" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3">
                <Skeleton />
              </Typography>
              <Typography variant="caption" className="margin work-status-skeleton">
                <span>&nbsp;</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3">
                <Skeleton />
              </Typography>
              <Typography variant="caption" className="margin">
                <Skeleton width="50%" />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1">
                <Skeleton />
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="position-collapsible-label line-label-skeleton" >
          {["30%", "25%", "30%"].map((per, index) => <Skeleton key={`${index}-work`} width={per} />)}
        </div>
        <Grid container spacing={2} justify="center" text-align="center" alignItems="stretch" className="professional-passions">
          <Grid item xs={12} sm={4}>
            <Skeleton width={415} height={270} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton width={415} height={270} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Skeleton width={415} height={270} />
          </Grid>
        </Grid>
        <div className="position-collapsible-label line-label-skeleton" >
          {["30%", "25%", "30%"].map((per, index) => <Skeleton key={`${index}-exp`} width={per} />)}
        </div>
      </Container>
    </div>
  );
};
export default MainProfileSkeleton;
