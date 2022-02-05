import React from "react";
import {Helmet} from "react-helmet";

const PrivacyHubHeader = () => {

  return (
    <>
    <Helmet>
      <title>employHER | Privacy Policy</title>
      <meta name="description" content="employHER protects every member’s privacy. We have a privacy policy and legal section for employees and employers. Read every single privacy policy term." />
    </Helmet>	    
    <div className="privacy-hub-header">
      <div className="header-content hv-center w-100">
        <h3 className="font-weight-600 font-xxlg">Privacy Hub</h3>
        <p className="font-md-100">Questions to all of your security concerns</p>
      </div>
    </div>
    </>
  )
}


export default PrivacyHubHeader;
