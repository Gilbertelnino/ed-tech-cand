import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';


interface ProfileSubHeadingProps {
  title: string
}

const ProfileSubHeading = ({ title }: ProfileSubHeadingProps) => {
  return (
    <Grid container spacing={5} justify="center" text-align="center" alignItems="center" className="profile-subheading">
      <Grid item md={4}>
        <hr className="heading-line" />
      </Grid>
      <Grid item md={4}>
        <Typography className="heading-title">
          {title}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <hr className="heading-line" />
      </Grid>
    </Grid>
  )
}

export default ProfileSubHeading;
