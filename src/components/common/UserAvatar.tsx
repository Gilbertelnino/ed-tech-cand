import React from 'react';
import { Avatar } from '@material-ui/core';

import { ReactComponent as ProfileUser } from "../../assets/svg/profile-user.svg";
import companyStock from "./../../assets/images/company_stock.png";


interface UserAvatarProps {
  size?: "xsm" | "sm" | "md" | "lg";
  color?: "dark-pink" | "light-gray-color";
  children?: React.ReactNode;
  className?: string;
  src?: string;
  alt?: string;
  variant?: "circle" | "circular" | "rounded" | "square";

  loading?: Boolean;
  loaderSize?: number;

  [key: string]: any;
}

const UserAvatar = ({ size, color, children, className, src, alt, variant, loading, loaderSize, ...props }: UserAvatarProps) => {

  return (
    <Avatar
      className={`user-avatar user-avatar-${size} ${className}`}
      color="dark-pink"
      src={src ? src : companyStock}
      alt={alt ? alt : ""}
      variant={variant}
      {...props}
    >
      {children || <ProfileUser />}
    </Avatar>
  )
}

// Default props of the component
UserAvatar.defaultProps = {
  size: "sm",
  color: "dark-pink",
  className: "",
  src: companyStock,
  alt: "avatar",
  variant: "circle",
  loading: false,
  loaderSize: 24,
}

export default UserAvatar;
