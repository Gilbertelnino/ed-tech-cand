
import React, { useEffect } from 'react'
import {
  Close as CloseIcon, CheckCircle as CheckCircleIcon, Info as InfoIcon, Warning as WarningIcon, Error as ErrorIcon,
  PeopleAlt as PeopleAltIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import _ from "lodash";

import { resetSnakeBar } from "../../reducers/common/snakeBar.reducer";

const SnakeBar = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const snakeBarReducer = useSelector(({ common }) => (common.snakeBar || {}));
  const snakeBarType = _.get(snakeBarReducer, "type", "info");

  useEffect(() => {
    const show = _.get(snakeBarReducer, "show", null);
    if (show === true || show === false) {
      setOpen(show);
    }
  }, [snakeBarReducer]);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    // Close/Reset the snake bar
    setOpen(false);
    setTimeout(() => {
      dispatch(resetSnakeBar());
    }, 100);
  };

  const renderMessage = () => {

    let icon = (<InfoIcon className="text-info" />);

    if (snakeBarType === "success") {
      icon = (<CheckCircleIcon className="text-success-200" />);
    } else if (snakeBarType === "warning") {
      icon = (<WarningIcon className="text-warning" />);
    } else if (snakeBarType === "error") {
      icon = (<ErrorIcon className="text-danger" />);
    } else if (snakeBarType === "users-success") {
      icon = (<PeopleAltIcon className="text-success-200" />);
    }

    return (
      <>
        {icon}
        {_.get(snakeBarReducer, "message", null)}
      </>
    )
  }

  return (
    <Snackbar
      className="snackbar-wrapper"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={renderMessage()}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default SnakeBar;
