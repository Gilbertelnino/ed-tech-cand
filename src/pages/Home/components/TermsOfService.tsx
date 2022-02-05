import React from "react";
import PolicyEffectText from "./PolicyEffectText";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const TermsOfService = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <PolicyEffectText />

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1b-content"
            id="panel1b-header"
          >
            <Typography>01. <span className="drop-title">Terms</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>By accessing the website at <a href="https://www.employHER.com" target="_blank" className="span-link">https://employHER.com</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2b-content"
            id="panel2b-header"
          >
            <Typography>02. <span className="drop-title">Use License</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>A. Permission is granted to temporarily download one copy of the materials (information or software) on employHER's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</span>
              <span>
                <ol type="i">
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose, or any public display (commercial or non-commercial);</li>
                  <li>attempt to decompile or reverse engineer any software contained on employHER's website;</li>
                  <li>remove any copyright or other proprietary notations from the materials; or</li>
                  <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ol>
              </span>
              <span>B. This license shall automatically terminate if you violate any of these restrictions and may be terminated by employHER at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel3b-content"
            id="panel3b-header"
          >
            <Typography>03. <span className="drop-title">Disclaimer</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>A. The materials on employHER's website are provided on an 'as is' basis. employHER makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</span>
              <span>B. Further, employHER does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel4b-content"
            id="panel4b-header"
          >
            <Typography>04. <span className="drop-title">Limitations</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>In no event shall employHER or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on employHER's website, even if employHER or a employHER authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel5b-content"
            id="panel5b-header"
          >
            <Typography>05. <span className="drop-title">Accuracy of Materials</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>The materials appearing on employHER's website could include technical, typographical, or photographic errors. employHER does not warrant that any of the materials on its website are accurate, complete or current. employHER may make changes to the materials contained on its website at any time without notice. However, employHER does not make any commitment to update the materials</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel6b-content"
            id="panel6b-header"
          >
            <Typography>06. <span className="drop-title">Links</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>employHER has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by employHER of the site. Use of any such linked website is at the user's own risk.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel7b-content"
            id="panel7b-header"
          >
            <Typography>07. <span className="drop-title">Modifications</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>employHER may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</span>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="privacy-section">
      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel8b-content"
            id="panel8b-header"
          >
            <Typography>08. <span className="drop-title">Governing Law</span></Typography>
          </AccordionSummary>
          <AccordionDetails>
              <span>These terms and conditions are governed by and construed in accordance with the laws of the State of Washington and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</span>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}


export default TermsOfService;
