import React, { useState, HTMLAttributes } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {IconButton, Grid, TextField} from '@material-ui/core/';
import { sendInvitationRequest } from "../../../reducers/SearchAndConnect/searchAndConnect.reducer";
import _ from "lodash";
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from "react-redux";

const InvitationModal = (props) => {
  const [addNote, setaddNote] = useState(false);
  const [connectionNote, setConnectionNote] = useState("");
  const dispatch = useDispatch();


  const handleModalClose = () => {
    setaddNote(false);
    setConnectionNote("");
    props.handleOnClose()
  }

  const handleAddNoteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setConnectionNote(event.target.value as string);
  };

  const handleSendInvite = () => {
    setaddNote(false);
    dispatch(sendInvitationRequest({ note: connectionNote, id: props.payload.id }));
    setConnectionNote("");
    props.handleOnClose();
    props.refreshList();
  };

  return (
        <Dialog
          open={props.status}
          onClose={props.handleOnClose}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="invitationModalContainer invitation-modal-wrapper">
            <DialogTitle id="alert-dialog-slide-title" className="invitation-modal-header">
              Your invitation is on its way
              <IconButton aria-label="close" onClick={ handleModalClose }>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className="invitation-modal-content">
              <DialogContentText id="alert-dialog-slide-description">
                { !addNote ? 
                  <Grid container className="main-invitation-content">
                    <Grid item sm={1}>
                      <svg width="55" height="55" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5 44.9999C34.9263 44.9999 44.9999 34.9263 44.9999 22.5C44.9999 10.0736 34.9263 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9263 10.0736 44.9999 22.5 44.9999Z" fill="#C2EC98"/>
                        <path d="M34.3555 10.584L18.4496 26.4899L10.6447 18.6853L6.68188 22.6475L18.4496 34.4155L38.3183 14.5462L34.3555 10.584Z" fill="white"/>
                      </svg>
                    </Grid>
                    <Grid item sm={11}>
                    <p className="p-text">Your invitation to<b> {_.get(props, "payload.first_name", "")} {_.get(props, "payload.last_name", "")} </b>is on its way.
                      You can add a note to personalize your invitation</p>
                    </Grid>
                  </Grid>
                :
                  <Grid container id="main-invitation-content-addNote" className="main-invitation-content-addNote">
                    <Grid item>
                      <p className="p-text">Users are more likely to accept invitations that include a personal note.</p>
                    </Grid>
                    <Grid item className="add-commment-textbox-container">
                      <TextField className="add-commment-textbox" onChange={(event) => handleAddNoteChange(event)} variant="outlined" />
                    </Grid>
                  </Grid>
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions className="invitation-modal-footer">
              { !addNote ? 
                <Button onClick={ () => setaddNote(true) } className="profle-card-quickview-button">
                Add a Note
                </Button> :
                <Button onClick={ ()=> setaddNote(false) } className="profle-card-quickview-button">
                Cancel
                </Button>
              }
              <Button onClick={handleSendInvite} className="profle-card-connect-button">
                Done
              </Button>
            </DialogActions>
        </Dialog>
  );
}

export default InvitationModal;
