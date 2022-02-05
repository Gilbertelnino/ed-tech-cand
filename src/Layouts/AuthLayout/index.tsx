import React from "react";
import { Link } from "react-router-dom";
import appRoutes from "../../routes/app.routes";
import { ReactComponent as Logo } from "./../../assets/svg/Logo.svg";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout-container">
      <div className="auth-header">
        <div>
          <Logo />
        </div>
        <div className="back-website">
          <div className="back">
            <Link to={appRoutes.home.path}> <ArrowBackIosIcon /> </Link>
          </div>
          <Link to={appRoutes.home.path}>Back to website</Link>
        </div>
      </div>
      <main className="auth-main">{children}</main>
    </div>
  );
};

export default AuthLayout;
