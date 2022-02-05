import React from 'react';
import { Button as MuiButton, CircularProgress } from '@material-ui/core';

// We will explicity destruct props which are not Mui props or want to manipulates. e.g. color, children, className etc...
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface ButtonProps {
  // Primary props
  color?: "primary" | "secondary" | "dark-pink" | "light-green" | "upload" | "create-video" |"rounded" | "transparent";
  children: React.ReactNode;
  className?: string;
  rounded?: boolean;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;

  // Secondary props
  loading?: Boolean;
  loaderSize?: number;

  // other props of the component which directly used in component
  [key: string]: any;
}

const Button = ({ color, children, className, loading, loaderSize, rounded, disabled, ...props }: ButtonProps) => {

  return (
    <MuiButton
      color="primary"
      className={`btn btn-${color} ${className} ${rounded && "btn-rounded"}`}
      disabled={(disabled || loading === true) ? true : false}
      {...props}
    >
      {(loading === true) ? (
        <CircularProgress size={loaderSize} />
      ) : (
        children
      )}
    </MuiButton>
  );

}

// Default props of the component
Button.defaultProps = {
  color: "primary",
  className: "",
  variant: "contained",
  loading: false,
  loaderSize: 24
}

export default Button;
