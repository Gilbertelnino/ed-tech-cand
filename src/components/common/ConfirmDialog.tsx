import React, { ReactNode } from "react";
import Button from './Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

interface Props {
  title?: string;
  bodyText?: string;
  visible: boolean;
  cancelText?: string;
  confirmText?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children?: ReactNode
}

const ConfirmDialog = ({ visible, title, bodyText, onCancel, onConfirm, children, ...rest }: Props) => {

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }

  const handleConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  }

  return (
    <Dialog
      open={visible}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className=""
    >
      <DialogTitle>{title || "Heads up!!!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {bodyText}
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <span onClick={handleCancel} className="span-link">
          {rest.cancelText || "Cancel"}
        </span> */}
        <Button onClick={handleConfirm} className="btn-primary" loading={rest.loading} color="primary" autoFocus>
          {rest.confirmText || "Confirm"}
        </Button>
        <Button color="secondary"  onClick={handleCancel}>
          {rest.cancelText || "Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog;
