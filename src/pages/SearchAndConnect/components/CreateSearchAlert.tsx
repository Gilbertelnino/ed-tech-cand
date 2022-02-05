import React, { useState, HTMLAttributes } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {IconButton, Grid, FormControl, MenuItem, Select} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateSearchAlert = (props) => {
  const [addNote, setaddNote] = useState(false);
  const handleModalClose = () => {
    setaddNote(false);
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
          className="alertModalContainer alert-modal-wrapper">
            <DialogTitle id="alert-dialog-slide-title" className="alert-modal-header">
                Create a Search Alert
              <IconButton aria-label="close" onClick={ handleModalClose }>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className="alert-modal-content">
              <DialogContentText id="alert-dialog-slide-description">
                  <Grid container className="main-alert-content">
                    <Grid item>
                      <h3>Business Analyst in Canada</h3>
                    </Grid>
                    <Grid container className="alert-dropdown-container">
                      <Grid item xs={12} sm={6}>
                        <h4>Recieve Alerts</h4>
                        <FormControl variant="outlined" className="get-receive-dropdown">
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // value={age}
                            // onChange={handleChange}
                          >
                            <MenuItem value={"Daily"}>Daily</MenuItem>
                            <MenuItem value={"Weekly"}>Weekly</MenuItem>
                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <h4>Get notified via</h4>
                        <FormControl variant="outlined" className="get-notification-dropdown">
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // value={age}
                            // onChange={handleChange}
                          >
                            <MenuItem value={"Email"}>Email</MenuItem>
                            <MenuItem value={"Notifications"}>Notifications</MenuItem>
                            <MenuItem value={"Email & Notifications"}>Email & Notifications</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions className="invitation-modal-footer">
              <Button onClick={handleModalClose} className="btn profle-card-quickview-button">
                Cancel
              </Button>
              <Button onClick={handleModalClose} className="btn btn-primary profle-card-connect-button">
                Save
              </Button>
            </DialogActions>
        </Dialog>
  );
}

export default CreateSearchAlert;
