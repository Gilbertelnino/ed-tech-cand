import React, {useEffect} from "react";
import { ReactComponent as ContactUsImage } from "../../../assets/svg/contact-us-1.svg";
import { Container } from "@material-ui/core";

interface IContactUsHeaderProps {
  showHeader: string;
  setShowHeader: (headerType: string) => void
  setShowForm: (headerType: string) => void
}

const ContactUsHeader = ({ showHeader, setShowHeader, setShowForm }: IContactUsHeaderProps) => {
  const ContactUsIndexHeader = () => {
    return (
      <Container maxWidth="xl" className="p-0">
        <div className="contact-us-page-header">
          <div className="contact-us-header-modules">
            <div className="feedback-header-module">
              How was your experience on employ<span>HER</span> Beta? <br />
              Share your Feedback {" "}
              <span className="span-link" onClick={() => { 
                setShowHeader("feedbackForm")
                setShowForm("feedbackForm")
              }}>
                here
              </span>...
            </div>
            <div className="bug-report-header-module">
              Did you experience any technical difficulties? <br />
              Submit a Bug Report from  {" "}
              <span className="span-link" onClick={() => {
                setShowHeader("bugReportForm")
                setShowForm("bugReportForm")
              }}>
                  here
                </span>...
            </div>
          </div>
          <div className="contact-us-svg mt-20">
            <ContactUsImage />
          </div>
        </div>

      </Container>
    )
  }

  const ContactUsFeedbackHeader = () => {
    return (
      <Container maxWidth="xl" className="p-0">
          {(["feedbackForm", "bugReportForm"].includes(showHeader)) && (
            <div className="contact-us-feedback-header">
              <h4>How are we doing?</h4>
              <p>We are always working to improve the employ<span>HER</span> experience, so we’d love to hear what’s working and how we can do better for HER users.</p>
              {(showHeader === "bugReportForm") ? (
                <p>
                  How was your experience on employHER beta?
                  <br />
                  Share your feedback <span className="span-link" onClick={() => setShowForm("feedbackForm")}>here</span>.
                </p>
              ) : (
                <p>
                  Did you experience any technical difficulties?
                  <br />
                  Submit a Bug Report Form <span className="span-link" onClick={() => setShowForm("bugReportForm")}>here</span>.
                </p>
              )}
            </div>
          )}
      </Container>
    )
  }

  return (
    
    showHeader === "index" ? <ContactUsIndexHeader /> : <ContactUsFeedbackHeader />
  )
}

export default ContactUsHeader;