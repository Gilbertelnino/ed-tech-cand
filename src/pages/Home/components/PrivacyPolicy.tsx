import React from "react";
import PolicyEffectText from "./PolicyEffectText";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const PrivacyPolicy = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <PolicyEffectText />

      <div className="privacy-statement text-left">
        <p> Your privacy is important to us. It is employ<span>HER</span>'s policy to respect your privacy regarding any information, We may collect from you across our website, <a href="https://www.employHER.com" target="_blank" className="span-link">https://employHER.com</a>, and other sites we own and operate. </p>
      </div>

      <div className="privacy-section text-left">
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>01. <span className="drop-title">Information we collect</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <p className="sub-title">Log data</p>
              <span>When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</span>
              <p className="sub-title">Device data</p>
              <span>We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data. What we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.</span>
              <p className="sub-title">Personal information</p>
              <span className="text-left">
                We may ask for personal information, such as your: <br />
                - Name <br />
                - Email <br />
                - Social media profiles <br />
                - Date of birth <br />
                - Phone/mobile number <br />
                - Home/Mailing address <br />
                - Work address <br />
                - Payment information
              </span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>02. <span className="drop-title">Legal bases for processing</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.</span>
            <span> These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:
              <ol type="i">
                <li>It’s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
                <li>It satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
                <li>You give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter);</li>
                <li>or we need to process your data to comply with a legal obligation.</li>
              </ol>
            </span>
            <span>Where you consent to our use of information about you for a specific purpose, you have the right to change your mind at any time (but this will not affect any processing that has already taken place).</span>
            <span> We don’t keep personal information for longer than is necessary. While we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification. That said, we advise that no method of electronic transmission or storage is 100% secure and cannot guarantee absolute data security. If necessary, we may retain your personal information for our compliance with a legal obligation or in order to protect your vital interests or the vital interests of another natural person.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>03. <span className="drop-title">Collection and Use of information</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>We may collect, hold, use and disclose information for the following purposes and personal information will not be further processed in a manner that is incompatible with these purposes: </span>
            <span>
              <ol type="i">
                <li>to enable you to customize or personalize your experience of our website;</li>
                <li>to enable you to access and use our website, associated applications and associated social media platforms;</li>
                <li>to contact and communicate with you; for internal record keeping and administrative purposes; for analytics, market research and business development, including to operate and improve our website, associated applications and associated social media platforms;</li>
                <li>to run competitions and/or offer additional benefits to you; for advertising and marketing, including to send you promotional information about our products and services and information about third parties that we consider may be of interest to you;</li>
                <li>to comply with our legal obligations and resolve any disputes that we may have, and consider your employment application.</li>
              </ol>
            </span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>04. <span className="drop-title">Disclosure of personal information to third parties</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>We may disclose personal information to: </span>
            <span>
              <ol type="i">
                <li>third party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, ad networks, analytics, error loggers, debt collectors, maintenance or problem-solving providers, marketing or advertising providers, professional advisors and payment systems operators;</li>
                <li>our employees, contractors and/or related entities;</li>
                <li>sponsors or promoters of any competition we run;</li>
                <li>credit reporting agencies, courts, tribunals and regulatory authorities, in the event you fail to pay for goods or services we have provided to you;</li>
                <li>courts, tribunals, regulatory authorities and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights;</li>
                <li>third parties, including agents or sub-contractors, who assist us in providing information, products, services or direct marketing to you; and</li>
                <li>third parties to collect and process data</li>
              </ol>
            </span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography>05. <span className="drop-title">International transfers of personal information</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>The personal information we collect is stored and processed in the United States and India, or where we or our partners, affiliates and third-party providers maintain facilities. By providing us with your personal information, you consent to the disclosure to these overseas third parties.</span>
            <span> We will ensure that any transfer of personal information from countries in the European Economic Area (EEA) to countries outside the EEA will be protected by appropriate safeguards, for example by using standard data protection clauses approved by the European Commission, or the use of binding corporate rules or other legally accepted means.</span>
            <span> Where we transfer personal information from a non-EEA country to another country, you acknowledge that third parties in other jurisdictions may not be subject to similar data protection laws to the ones in our jurisdiction. There are risks if any such third party engages in any act or practice that would contravene the data privacy laws in our jurisdiction and this might mean that you will not be able to seek redress under our jurisdiction’s privacy laws.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography>06. <span className="drop-title">Your rights and controlling your personal information</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>Choice and consent: By providing personal information to us, you consent to us collecting, holding, using and disclosing your personal information in accordance with this privacy policy. If you are under 16 years of age, you must have and warrant to the extent permitted by law to us, that you have your parent or legal guardian’s permission to access and use the website and they (your parents or guardian) have consented to you providing us with your personal information. You do not have to provide personal information to us, however, if you do not, it may affect your use of this website or the products and/or services offered on or through it.</span>
            <span> Information from third parties: If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.</span>
            <span> Restrict: You may choose to restrict the collection or use of your personal information. If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us using the details below. If you ask us to restrict or limit how we process your personal information, we will let you know how the restriction affects your use of our website or products and services.</span>
            <span> Access and data portability: You may request details of the personal information that we hold about you. You may request a copy of the personal information we hold about you. Where possible, we will provide this information in CSV format or another easily readable machine format. You may request that we erase the personal information we hold about you at any time. You may also request that we transfer this personal information to another third party.</span>
            <span> Correction: If you believe that any information, we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading or out of date.</span>
            <span> Notification of data breaches: We will comply with laws applicable to us in respect of any data breach.</span>
            <span> Complaints: If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.</span>
            <span> Unsubscribe: To unsubscribe from our e-mail database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.</span> 
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <Typography>07. <span className="drop-title">Cookies</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on the preferences you have specified. Please refer to our CookiePolicy for more information.</span> 
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
            <Typography>08. <span className="drop-title">Business transfers</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data among the assets transferred to any parties who acquire us. You acknowledge that such transfers may occur and that any parties who acquire us may continue to use your personal information according to this policy.</span> 
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel9a-content"
            id="panel9a-header"
          >
            <Typography>09. <span className="drop-title">Limits of our policy</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites and cannot accept responsibility or liability for their respective privacy practices.</span> 
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
      <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel10a-content"
            id="panel10a-header"
          >
            <Typography>10. <span className="drop-title">Changes to this policy</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>At our discretion, we may change our privacy policy to reflect current acceptable practices. We will take reasonable steps to let users know about changes via our website. Your continued use of this site after any changes to this policy will be regarded as acceptance of our practices around privacy and personal information.</span>
            <span> If we make a significant change to this privacy policy, for example changing a lawful basis on which we process your personal information, we will ask you to re-consent to the amended privacy policy.</span>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}


export default PrivacyPolicy;
