import React from "react";
import { CircularProgress } from '@material-ui/core';


interface SpinnerProps {
  visible: boolean;
  children: React.ReactNode;
  loadingTip?: string;
  className?: string;
  size?: number;
}

const Spinner = ({ visible, children, loadingTip, className, size }: SpinnerProps) => {

  const _showSpinner = () => {
    if (visible) {
      return (
        <div className={`eh-spin-container ${className}`}>
          <div>
            <div className="eh-spin-wrapper">
              <span className="eh-spin-anim">
                <CircularProgress size={size || 40} color="inherit" className="spinner" />
              </span>
              {loadingTip && <label className="eh-spin-text">{loadingTip}</label>}
            </div>
          </div>
          <div className="eh-spin-child-container eh-spin-blur">
            {children}
          </div>
        </div>
      )
    } else {
      return children;
    }
  }

  return <>{_showSpinner()}</>

}

Spinner.defaultProps = {
  visible: false,
}


export default Spinner;
