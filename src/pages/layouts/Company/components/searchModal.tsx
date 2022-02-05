import React, { useState, HTMLAttributes } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { InputAdornment, Grid, TextField } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import CompanyProfile from "../../../../assets/images/CompanyProfile.png";
import profile from "../../../../assets/images/profile.png";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchModal = (props) => {
  const handleModalClose = () => {
    props.handleOnClose()
  }
  return (
    <Dialog
      open={props.status}
      onClose={props.handleOnClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className="searchModalContainer">
      <DialogTitle id="alert-dialog-slide-title" className="invitation-modal-header">
        <TextField
          placeholder="  Search"
          variant="outlined"
          className="navbar-searchBox"
          InputProps={{
            endAdornment: (
              <InputAdornment className="navbar-searchBoxIconContainer" position="start">
                <SearchIcon className="navbar-searchBoxIcon" />
              </InputAdornment>
            ),
          }}
        />
      </DialogTitle>
      <DialogContent className="search-modal-content">
        <DialogContentText>
          <Grid className="resultType">JOBS</Grid>
          <Grid container className="jobDetails">
            <Grid className="jobDetailsLeft" item sm={3}>
              <img src={CompanyProfile} alt="CompanyProfile" />
            </Grid>
            <Grid className="jobDetailsMiddle" item sm={8}>
              <h4>UX/UI Designer</h4>
              <p>employHER</p>
            </Grid>
            <Grid className="jobDetailsRight" item sm={1}>
              <KeyboardArrowRightIcon />
            </Grid>
          </Grid>
          <Grid container className="jobDetails">
            <Grid className="jobDetailsLeft" item sm={3}>
              <img src={CompanyProfile} alt="CompanyProfile" />
            </Grid>
            <Grid className="jobDetailsMiddle" item sm={8}>
              <h4>UX/UI Designer</h4>
              <p>Business Analyst</p>
            </Grid>
            <Grid className="jobDetailsRight" item sm={1}>
              <KeyboardArrowRightIcon />
            </Grid>
          </Grid>
          <Grid className="resultCount">All jobs (99+)</Grid>
          <hr />
          <Grid className="resultType">USERS</Grid>
          <Grid container className="jobDetails">
            <Grid className="jobDetailsLeft" item sm={3}>
              <img src={profile} alt="CompanyProfile" />
            </Grid>
            <Grid className="jobDetailsMiddle" item sm={8}>
              <h4>Emily Horton</h4>
              <p>UX designer</p>
            </Grid>
            <Grid className="jobDetailsRight" item sm={1}>
              <KeyboardArrowRightIcon />
            </Grid>
          </Grid>
          <Grid container className="jobDetails">
            <Grid className="jobDetailsLeft" item sm={3}>
              <img src={profile} alt="CompanyProfile" />
            </Grid>
            <Grid className="jobDetailsMiddle" item sm={8}>
              <h4>Emily Horton</h4>
              <p>Business Analyst</p>
            </Grid>
            <Grid className="jobDetailsRight" item sm={1}>
              <KeyboardArrowRightIcon />
            </Grid>
          </Grid>
          <Grid className="resultCount">All users (1,000+)</Grid>
          <hr />
          <Grid className="resultType">ARTICLE</Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="search-modal-footer">
        <Button onClick={handleModalClose} className="all-result-button">
          <p>ALL RESULTS (1,000+)</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchModal;
