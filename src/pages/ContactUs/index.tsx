import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import FeedbackForm from "./components/FeedbackForm";
import ContactUsHeader from "./components/ContactUsHeader";
import ThankyouFeedback from "./components/ThankyouFeedback";
import {Helmet} from "react-helmet";

const ContactUs = () => {

  const [showForm, setShowForm] = useState("index");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (feedbackSubmitted) {
      setFeedbackSubmitted(false)
    }
  }, [showForm]);

  return (
  
    <>
      <Helmet>
        <title>employHER | Contact Us</title>
        <meta name="description" content="Have a question regarding any job or any technical difficulty? Contact us any time or submit a report to get the help that you need." />
      </Helmet>	 
      <Container maxWidth="lg" className="p-0">
        <div className="contact-us-wrapper">
          <h3>Contact Our Team</h3>
           <div className="contact-us-content">
            {
              feedbackSubmitted === false ? (
                <>
                  <ContactUsHeader showHeader={showForm} setShowHeader={setShowForm} setShowForm={setShowForm} />
                  {(["feedbackForm", "bugReportForm"].includes(showForm)) && (
                    <FeedbackForm
                      feedbackSubmitted={feedbackSubmitted}
                      setFeedbackSubmitted={setFeedbackSubmitted}
                      showForm={showForm}
                      setShowForm={(formType) => setShowForm(formType)}
                    />
                  )}
                </>
              ) : (
                <ThankyouFeedback setShowForm={setShowForm} />
              )
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default ContactUs;
