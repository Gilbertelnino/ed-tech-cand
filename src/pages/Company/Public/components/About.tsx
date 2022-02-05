import React from "react";
import doubleQuotes from "../../../../assets/svg/quote-icon.svg";


const About = () => {
  return (
    <div className="company-info">
      <div className="company-quote mb-20">
        <img src={doubleQuotes} height={"20px"}/>
        <p>This is an example quote!</p>
      </div>
      <div className="about-container mb-20">
        <div className="mission-statement">
          <div>
            This is random text about the mission statement. We value soft skills rather than what's on your resume. This is more random text. This is more random text. This is more random text.
          </div>
          

        </div>
        <div className="di-statement">
          <div>
            This is more random text. This is more random text. This is more random text. This is more random text. This is more random text. This is more random text. This is more random text.
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;