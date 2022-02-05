import React from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "./../../assets/svg/Logo.svg";
import { ReactComponent as ToggleIcon } from './../../assets/svg/toggle-icon.svg';
import HeaderSearchBar from "../../pages/SearchAndConnect/components/HeaderSearchBar";
import appRoutes from "../../routes/app.routes";

const DefaultHeader = () => {

  return (
    <header className="default-navbar">

      <nav className="navbar-expand-lg">
        <span className="navBrand navbar-brand">
          <Logo />
        </span>
        <button aria-controls="responsive-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed">
          <span className="navbar-toggler-icon">
            <ToggleIcon />
          </span>
        </button>
        <HeaderSearchBar />
        <div className="nav-link" id="responsive-navbar-nav">
          <div className="justify-content-end w-100 navLinks navbar-nav">
            <div className="nav-item">
              <Link to={appRoutes.home.path} >Home</Link>
            </div>
            <div className="nav-item">
              <Link to={appRoutes.candidateJobSearch.path} >Careers</Link>
            </div>
          </div>
        </div>
      </nav>


    </header>
  )
}

export default DefaultHeader;


