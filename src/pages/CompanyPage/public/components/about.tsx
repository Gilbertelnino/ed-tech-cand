import React from "react";
import { useSelector } from "react-redux";
import doubleQuotes from "../../../../assets/svg/quote-icon.svg";
import { Container } from "@material-ui/core";
import { get } from "lodash";

const _ = { get };

const About = () => {

  const { companyPublicProfile: { data } } = useSelector(({ company }) => company);
  const whoWeAre = _.get(data, 'companyProfile.who_we_are', "");
  const missionAndVision = _.get(data, 'companyProfile.mission_and_vision', "");
  const diversityAndInclusion = _.get(data, 'companyProfile.diversity_and_inclusion', "");

  return (
    <div className="company-info">
      <Container maxWidth="sm">
        <div className="company-quote">
          <img src={doubleQuotes} height={"20px"} />
          <p>{whoWeAre}</p>
        </div>
      </Container>
      <div className="about-container mb-20">
        <div className="mis-wrap">
          <div className="mission-statement">
            <div>
              <h3>Our Mission And Vision</h3>
              <p>
                {missionAndVision}
              </p>
            </div>
          </div>
        </div>
        <div className="dis-wrap">
          <div className="di-statement">
            <div>
              <h3>Our Diversity And Inclusion</h3>
              <p> {diversityAndInclusion} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;