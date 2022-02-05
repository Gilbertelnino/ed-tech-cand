import React, { useState } from "react";
import { Link } from 'react-router-dom';
import appRoutes from './../../../routes/app.routes';
import { get } from "lodash";
import { ReactComponent as ToggleIcon } from '../../../assets/svg/toggle-icon.svg';
import UserProfileIcon from "../../../components/common/UserProfileIcon";

const _ = { get };

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
        <div className="navbar-search">
          {/* <div 
                  style={{ border: "1px red solid" }}
                  > */}
          {/* <Input name="Search" type="text" variant="outlined" size="small" fullWidth={false} /> */}
          {/* <Accordion className="accordionContainer">
                      <AccordionSummary  expandIcon={<SearchIcon />}> */}
          {/* <Input name="Search" type="text" variant="outlined" size="small" fullWidth={false} style={{ backgroundColor: "white" }} /> */}

          {/* </AccordionSummary>
                      <AccordionDetails>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                      sit amet blandit leo lobortis eget.
                      </AccordionDetails>
                    </Accordion> */}
          {/* <Dialog
                      open={true}
                      // onClose={props.handleOnClose}
                      // TransitionComponent={Transition}
                      keepMounted
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                      className="invitationModalContainer">
                      <DialogTitle id="alert-dialog-slide-title" className="invitation-modal-header">
                        
                      </DialogTitle>
                      <DialogContent className="invitation-modal-content">
                        <DialogContentText id="alert-dialog-slide-description">
                          
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="invitation-modal-footer">
                      
                      </DialogActions>  
                    </Dialog> */}
          {/* </div> */}

        </div>
        <button aria-controls="responsive-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed" onClick={() => handleCollapse()}>
          <span className="navbar-toggler-icon">
            <ToggleIcon />
          </span>
        </button>
        <div className={`navbar-collapse ${open && 'open'} collapse`} id="responsive-navbar-nav">
          <div className="justify-content-end w-100 navLinks navbar-nav nav-links">
            <div className="ml-md-5 nav-item">
              <Link to={"/"} >{appRoutes.home.title}</Link>
            </div>
            <UserProfileIcon />
          </div>
        </div>
      </nav>
    </div >
  )
}

export default Header;
