import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appRoutes from './../../../routes/app.routes';
import { ReactComponent as ToggleIcon } from '../../../assets/svg/toggle-icon.svg';

const Header = () => {

  const [open, setOpen] = useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  }

  return (
    <div className="Header-style">

      <nav className="Header-style navbar navbar-expand-lg navbar-dark">
        <span className="navBrand navbar-brand">
          <Link to={"/"}>
            <h1 className="employ">employ<span>HER</span></h1>
          </Link>
          <p className="navBrand navbrand-tagline">creating <span>HER</span> pathway to success</p>
        </span>
        <button aria-controls="responsive-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed">
          <span className="navbar-toggler-icon">
            <ToggleIcon />
          </span>
        </button>
        <div className={`navbar-collapse ${open && 'open'} `} id="responsive-navbar-nav">
          <div className="justify-content-end w-100 navLinks navbar-nav">
            <div className="ml-md-5 nav-item">
              <Link to={"/"} >Sign in as: Admin@employHER.com</Link>
            </div>
            <div className="ml-md-5 nav-item">
              <Link to={"/"} >Log Out</Link>
            </div>
          </div>
        </div>
      </nav>

    </div>
  )

}


export default Header;
