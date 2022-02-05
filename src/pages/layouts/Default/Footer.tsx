import React from 'react';
import { Link } from "react-router-dom";
import appRoutes from '../../../routes/app.routes';

import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';

const Footer = () => {

  return (
    <div id="footer" className="footer">
      <div className="footer-info text-center">
        <div className="footer-tagline">
          <h4 className="mt-0">empower | inspire | employ<span>HER </span></h4>
        </div>
        <div className="footer-links">
          <Link to={appRoutes.privacyPolicy.generatePath()} >Privacy Hub</Link>
          <Link to={appRoutes.contactUs.path}>Contact Us</Link>
        </div>
        <div className="footer-social-links">
          <a href="https://www.instagram.com/employherinc/" target="_blank"> <InstagramIcon /> </a>
          <a href="https://www.facebook.com/employher/" target="_blank"><FacebookIcon /></a>
          <a href="https://twitter.com/employher" target="_blank"><TwitterIcon /> </a>
          <a href="https://www.linkedin.com/company/employherinc/" target="_blank"><LinkedInIcon /> </a>
          {/* <a href="https://in.pinterest.com/" target="_blank"><PinterestIcon /> </a> */}
        </div>
        <div className="footer-copyright">
          <p className="m-0">&copy; 2021 employ<span>HER </span> Inc. | Made for women by women</p>
        </div>
      </div>
    </div>
  )
}


export default Footer;
