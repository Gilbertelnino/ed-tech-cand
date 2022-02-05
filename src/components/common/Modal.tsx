import React, { ReactNode } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {
  Modal as MuiModal, Backdrop, Fade
} from '@material-ui/core';

import Spinner from './Spinner';

// We will explicity destruct props which are not Mui props or want to manipulates. e.g. children etc...
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface ModalProps {
  // Primary props
  visible: boolean;
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "x-large";
  title?: ReactNode;
  closeButton?: boolean;
  closeButtonCross?: boolean;
  closeOnBackDrop?: boolean;
  onClose: () => void;

  // Secondary props
  loading?: boolean;
  loadingTip?: string;

  // other props of the component which directly used in component
  [key: string]: any;
}

const Modal = ({ className, visible, size, children, title, closeButton, closeButtonCross, closeOnBackDrop, onClose, loading, loadingTip, onRendered, ...props }: ModalProps) => {

  const _handleCloseOnBackDrop = () => {
    if (closeOnBackDrop) {
      _handleCloseModal();
    }
  }

  const _handleCloseModal = () => {
    onClose();
  }

  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={`eh-modal`}
      open={visible}
      onClose={_handleCloseOnBackDrop}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onRendered={onRendered}
    >
      <Fade in={visible}>
        <div className={`modal-body-container modal-${size} ${className}`}>
          {closeButtonCross && <CloseIcon className="close-icon" onClick={_handleCloseModal} />}
          {
            title && (
              <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                {closeButton && (
                  <IconButton aria-label="close" className="modal-close-btn" onClick={() => _handleCloseModal()}>
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
            )
          }
          <div className="modal-body">
            <Spinner visible={loading} loadingTip={loadingTip}>
              {children}
            </Spinner>
          </div>
        </div>
      </Fade>
    </MuiModal>
  );

}

// Default props of the component
Modal.defaultProps = {
  visible: false,
  closeButton: true,
  closeOnBackDrop: true,
  size: "medium",
  loading: false,
}

export default Modal;
