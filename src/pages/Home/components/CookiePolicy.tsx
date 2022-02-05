import React from "react";
import PolicyEffectText from "./PolicyEffectText";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const CookiePolicy = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <PolicyEffectText />

      <div className="privacy-statement privacy-section">
        <p>We use cookies to help improve your experience of <a href="https://www.employHER.com" target="_blank" className="span-link">https://employHER.com</a>. This cookie policy is part of employHER's privacy policy and covers the use of cookies between your device and our site. We also provide basic information on third-party services we may use, who may also use cookies as part of their service, though they are not covered by our policy.</p>
        <p>If you don’t wish to accept cookies from us, you should instruct your browser to refuse cookies from <a href="https://www.employHER.com" target="_blank" className="span-link">https://employHER.com</a>, with the understanding that we may be unable to provide you with some of your desired content and services.</p>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <Typography>01. <span className="drop-title">What is a cookie?</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>A cookie is a small piece of data that a website store on your device when you visit, typically containing information about the website itself, a unique identifier that allows the site to recognize your web browser when you return, additional data that serves the purpose of the cookie, and the lifespan of the cookie itself.</span>
            <span> Cookies are used to enable certain features (e.g. logging in), to track site usage (eg. analytics), to store your user settings (e.g. timezone, notification preferences), and to personalize your content (eg. advertising, language).</span>
            <span> Cookies set by the website you are visiting are normally referred to as “first-party cookies”, and typically only track your activity on that particular site. Cookies set by other sites and companies (i.e. third parties) are called “third-party cookies” and can be used to track you on other websites that use the same third-party service.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2c-content"
            id="panel2c-header"
          >
            <Typography>02. <span className="drop-title">Types of cookies and how we use them</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="sub-title">Essential cookies</p>
            <span>Essential cookies are crucial to your experience of a website, enabling core features like user logins, account management, shopping carts and payment processing. We use essential cookies to enable certain functions on our website.</span>
            <p className="sub-title">Performance cookies</p>
            <span>Performance cookies are used in the tracking of how you use a website during your visit, without collecting personal information about you. Typically, this information is anonymous and aggregated with information tracked across all site users, to help companies understand visitor usage patterns, identify and diagnose problems or errors their users may encounter, and make better strategic decisions in improving their audience’s overall website experience. These cookies may be set by the website you’re visiting (first-party) or by third-party services. We use performance cookies on our site.</span>
            <p className="sub-title">Functionality cookies</p>
            <span>Functionality cookies are used in collecting information about your device and any settings you may configure on the website you’re visiting (like language and time zone settings). With this information, websites can provide you with customized, enhanced or optimized content and services. These cookies may be set by the website you’re visiting (first-party) or by a third-party service. We use functionality cookies for selected features on our site.</span>
            <p className="sub-title">Targeting/advertising cookies</p>
            <span>Targeting/advertising cookies are used in determining what promotional content is more relevant and appropriate to you and your interests. Websites may use them to deliver targeted advertising or to limit the number of times you see an advertisement. This helps companies improve the effectiveness of their campaigns and the quality of content presented to you. These cookies may be set by the website you’re visiting (first-party) or by third-party services. Targeting/advertising cookies set by third parties may be used to track you on other websites that use the same third-party service. We use targeting/advertising cookies on our site.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel3c-content"
            id="panel3c-header"
          >
            <Typography>03. <span className="drop-title">Third-party cookies on our site</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>We may employ third-party companies and individuals on our websites—for example, analytics providers and content partners. We grant these third parties’ access to selected information to perform specific tasks on our behalf. They may also set third-party cookies in order to deliver the services they are providing. Third-party cookies can be used to track you on other websites that use the same third-party service. As we have no control over third-party cookies, they are not covered by employHER's cookie policy.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel4c-content"
            id="panel4c-header"
          >
            <Typography>04. <span className="drop-title">Our third-party privacy promises</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>We review the privacy policies of all our third-party providers before enlisting their services to ensure their practices align with ours. We will never knowingly include third-party services that compromise or violate the privacy of our users</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel5c-content"
            id="panel5c-header"
          >
            <Typography>05. <span className="drop-title">How you can control or opt-out of cookies</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>If you do not wish to accept cookies from us, you can instruct your browser to refuse cookies from our website. Most browsers are configured to accept cookies by default, but you can update these settings to either refuse cookies altogether or to notify you when a website is trying to set or update a cookie.</span>
            <span className="font-bold">If you browse websites from multiple devices, you may need to update your settings on each individual device.</span>
            <span>Although some cookies can be blocked with little impact on your experience of a website, blocking all cookies may mean you are unable to access certain features and content across the sites you visit.</span>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}


export default CookiePolicy;
