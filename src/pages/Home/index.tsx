import React from 'react';
import ReactPlayer from "react-player";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import { get, isEmpty } from "lodash";
import ReactReadMoreReadLess from "react-read-more-read-less";

/*
import amazon from "../../assets/images/clients/amazon.png";
import accenture from "../../assets/images/clients/Accenture.png";
import pge from "../../assets/images/clients/pge.png";
import extrahopn from "../../assets/images/clients/extrahop.png";
import metromile from "../../assets/images/clients/Metromile.png";
import picnic from "../../assets/images/clients/picnic.png";
import corsearch from "../../assets/images/clients/Corsearch.png";
import pointinside from "../../assets/images/clients/PointInside.jpg";
import marketly from "../../assets/images/clients/Marketly_Logo.png";
import wiselylabs from "../../assets/images/clients/WiselyLabs.png";
import armoire from "../../assets/images/clients/Armoire.png";
import dayblink from "../../assets/images/clients/DayBlink.png";
import neu from "../../assets/images/clients/Neu.png";
import craft from "../../assets/images/clients/craft.png";*/

import Isaiah from "../../assets/images/landing profiles/Isaiah.png";
import Jackie from "../../assets/images/landing profiles/Jackie.png";
import Karen from "../../assets/images/landing profiles/Karen.png";
import Zellie from "../../assets/images/landing profiles/Zellie.png";
import Catherine from "../../assets/images/landing profiles/Catherine.png";
import Anju from "../../assets/images/landing profiles/Anju.png";
import Varsha from "../../assets/images/landing profiles/Varsha.png";
import Preet from "../../assets/images/landing profiles/Preet.png";
import Shanan from "../../assets/images/landing profiles/Shanan.png";
import Shweta from "../../assets/images/landing profiles/Shweta.png";
import Kashish from "../../assets/images/landing profiles/Kashish.png";
import Desmond from "../../assets/images/landing profiles/Desmond.png";

import Paveleen from "../../assets/images/landing testimonial/Paveleen-Kaur.jpg";
import Maria from "../../assets/images/landing testimonial/Maria-Loza.jpg";
import Nafisa from "../../assets/images/landing testimonial/Nafisa-Shikdar.jpg";
import Sharron from "../../assets/images/landing testimonial/Sharron.jpg";
import Courtney from "../../assets/images/landing testimonial/Courtney-Ulwelling.jpg";
import Tim from "../../assets/images/landing testimonial/Tim-Tilda.jpg";
import Michael from "../../assets/images/landing testimonial/Michael-Roman.jpg";
import Destiny from "../../assets/images/landing testimonial/Destiny-Brandt.jpg";


import { ReactComponent as TSymbol } from "../../assets/svg/tsymbol.svg";

// import { ReactComponent as DarkPinkSample } from "../../assets/svg/sampletest.svg";
import { ReactComponent as DarkPink } from "../../assets/svg/dark-pink-bg.svg";
// import { ReactComponent as LightPink } from "../../assets/svg/light-pink-bg.svg";
import { ReactComponent as IntroInfographicOne } from "../../assets/svg/intro-infographic-1.svg";
import { ReactComponent as IntroInfographicTwo } from "../../assets/svg/intro-infographic-2.svg";
import { ReactComponent as IntroInfographicThree } from "../../assets/svg/intro-infographic-3.svg";



import appRoutes from '../../routes/app.routes';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { rootReducersState } from '../../reducers';

const _ = { get, isEmpty }

const profileData = [
  {
    name: "Jackie L.",
    designation: "Project Manager Intern",
    image: Jackie
  },
  {
    name: "Isaiah T.",
    designation: "Chief Technology Officer",
    image: Isaiah
  },
  {
    name: "Zellie M.",
    designation: "Lead Software Engineer",
    image: Zellie
  },
  {
    name: "Catherine Z.",
    designation: "Chief Design Officer",
    image: Catherine
  },
  {
    name: "Anju P.",
    designation: "Software Engineer",
    image: Anju
  },
  {
    name: "Varsha A.",
    designation: "Content Strategist",
    image: Varsha
  },
  {
    name: "Preet S.",
    designation: "Chief Empowerment Officer & Founder",
    image: Preet
  },
  {
    name: "Shanan A.",
    designation: "Software Engineer",
    image: Shanan
  },
  {
    name: "Karen S.",
    designation: "Technical Recruiter",
    image: Karen
  },
  {
    name: "Shweta Y.",
    designation: "Data Scientist",
    image: Shweta
  },
  {
    name: "Kashish A.",
    designation: "Software Engineer Intern",
    image: Kashish
  },
  {
    name: "Desmond W.",
    designation: "Data Scientist",
    image: Desmond
  },
];
const getProfileOverlay = i => {
  return (
    <>
      <div className="profile-text">
        <div className="profile-text-wrapper">
          <h4 className="profile-name">
            {profileData[i].name}
          </h4>
          <p className="profile-designation">
            {profileData[i].designation}
          </p>
        </div>
      </div>
    </>
  );
}
const Home = () => {
  const history = useHistory();

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const tokenUser = _.get(sessionReducer, "currentUser", {});
  const userRole = _.get(tokenUser, "role", "");

  const getButtonText = () => {
    return _.isEmpty(userRole) ? 'Join Us' : 'View Profile';
  }

  const handleButtonClick = () => {
    if (userRole === "candidate") {
      history.push(appRoutes.candidateProfileView.path);
    } else if (userRole === "company") {
      history.push(appRoutes.companyDashboard.path);
    } else {
      history.push(appRoutes.userSignUp.path);
    }
  }

  const getProfileDivs = () => {
    let profileCard = [];
    let profileCard1 = [];
    for (let i = 0; i < 12; i++) {
      if (i <= 5) {
        profileCard.push(<div className={`profile-picture-${i} profile-pic-wrapper`}> <img src={profileData[i].image} className={"profile-pic"} />  {getProfileOverlay(i)}  </div>)
      } else {
        profileCard1.push(<div className={`profile-picture-${i} profile-pic-wrapper`}> <img src={profileData[i].image} className={"profile-pic"} />  {getProfileOverlay(i)} </div>)
      }
    }
    return <div className="profile-picture"><div className="profile-picture-row-1"> {profileCard} </div><div className="profile-picture-row-2"> {profileCard1} </div></div>;
  }

  return (
    <>
      <Helmet>
        <title>employHER | Best Job Recruitment Agency</title>
        <meta name="description" content="employHER is one of the best recruitment agencies. employHER is the best marketplace for women as well as for the clients who want to hire talent." />
        <meta name="keywords" content="best recruitment agency near me, best recruitment agency in usa, Job recruitment agency, best online recruitment company" />
      </Helmet>
      <Container maxWidth="xl" className="p-0">
        <div className="landing-page">

          <Container maxWidth="lg" className="p-0">
            <div className="landing-s1">

              <Grid item xs={12} container direction="row" justify="center" alignItems="center">

                <Grid item>


                  <div className="landing-s1-vid">
                    {window.innerWidth > 768 ? (
                      <ReactPlayer
                        url="https://www.youtube.com/watch?v=Tdp7a9p4IJs&feature=youtu.be"
                        width="500px"
                        height="375px"
                        playing={false}
                        controls={true}
                      />
                    ) : (
                      <ReactPlayer
                        url="https://www.youtube.com/watch?v=Tdp7a9p4IJs&feature=youtu.be"
                        width="280px"
                        height="200px"
                        playing={false}
                        controls={true}
                      />
                    )}
                  </div>
                </Grid>

                <Grid item >


                  <div className="landing-s1-text">
                    {window.innerWidth <= 1024 ? (
                      <h1>
                        Introducing the <div></div>
                        <span>
                          employHER
                        </span>{" "}
                        Platform
                      </h1>
                    ) : (
                      <h1>
                        Introducing the {" "}
                        <span>
                          employHER
                        </span>{" "}
                        Platform
                      </h1>
                    )}
                    <h3>
                      Building a community for women to thrive
                    </h3>

                    {_.isEmpty(userRole) && (
                      <Button onClick={() => handleButtonClick()} variant="contained" className="primary-btn">
                        Join Us
                      </Button>
                    )}

                  </div>

                </Grid>
              </Grid>
            </div>

            <div className="landing-s2">

              <Grid item xs={12} container direction="row" justify="space-between" alignItems="flex-start">

                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >

                  <div className="landing-s2-intro">

                    <IntroInfographicOne />

                    <div className="landing-s2-text">
                      <p className="m-0">
                        A professional video platform for women
                        and gender diverse people to connect and
                        network with each other
                      </p>
                    </div>
                  </div>

                </Grid>

                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >

                  <div className="landing-s2-intro">

                    <IntroInfographicTwo />

                    <div className="landing-s2-text">
                      <p className="m-0">
                        Apply for jobs with your employHER video
                        profile, showcasing your personality,
                        soft-skills, experience, and personal
                        branding
                      </p>
                    </div>
                  </div>

                </Grid>

                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>

                  <div className="landing-s2-intro">

                    <IntroInfographicThree />

                    <div className="landing-s2-text">
                      <p className="m-0">
                        employHER video profile adds a level of
                        trust and familiarity to your
                        professional network
                      </p>
                    </div>
                  </div>


                </Grid>

              </Grid>

            </div>


          </Container>



          <div className={"landing-s3-root"}>
            <div className="darkpink-svg" >
              {/* <DarkPinkSample /> */}
              <DarkPink />
            </div>

            <Container maxWidth="lg" className="p-0">


              <Grid item xs={12} container>

                <Grid item >
                  <div className="landing-s3">
                    <div className="landing-s3-text mb-4">
                      <h1 className="mb-0">Let’s Make A Change Together</h1>
                    </div>
                    <div className="landing-s3-profiles">
                      {getProfileDivs()}
                    </div>
                  </div>
                </Grid>

              </Grid>

            </Container>
          </div>



          <div className={"landing-s4-root"}>
            <Container maxWidth="lg" className="p-0">
              <Grid item xs={12} container direction="row" justify="space-between" alignItems="flex-start">
                <Grid item >
                  <div className="landing-s4 statistics-wrap">
                    <div className="landing-s4-text mb-4">
                      <h1 className="mb-0">Diversity
                        <span>  market size nationwide</span></h1>
                    </div>
                    <div className="landing-s4-statistics">
                      <Grid item xs={12} container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                          <div className="stat-inner-wrap open-jobs text-center">
                            <h3 className="pink">Open Jobs</h3>
                            <h1 className="count">240K</h1>
                            <p className="text-center">IT jobs posted daily</p>
                          </div>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                          <div className="stat-inner-wrap total-resume text-center">
                            <h3 className="blue">Total Resumes </h3>
                            <h1 className="count">60M </h1>
                            <p className="text-center">Resumes submitted per posting</p>
                          </div>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                          <div className="stat-inner-wrap diverse-resume text-center">
                            <h3>Diverse Resume</h3>
                            <h1 className="count">15M</h1>
                            <p className="text-center">Resumes submitted by diverse talent</p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>

          <div className={"landing-s5-root"}>
            <Container maxWidth="lg" className="p-0">
              <Grid item xs={12} container>
                <Grid item >
                  <div className="landing-s5 testimonial-wrap">
                    <div className="landing-s5-testimonial candidate">
                      <Grid item xs={12} container direction="row" justify="space-between" alignItems="center">
                        <Grid item xl={4} lg={4} md={12} sm={12} xs={12} >
                          <div className="testimonial-text">
                            <h1 className="mb-0"> <span>Candidate</span> success stories </h1>
                            <p className="text-center">What our placed candidates have to say about us</p>
                          </div>
                        </Grid>
                        <Grid item xl={8} lg={8} md={12} sm={12} xs={12} >
                          <div className="testimonial-blocks-wrap">
                            <div className="testimonial-blocks">

                              <div className="testimonial-block-wrap small">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Paveleen} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Pavleen K</h4>
                                    <span className="t-designation">
                                      University of Denver| MS Data Science| Financial Engineering| Machine Learning| AI |Python| Business Intelligence| Statistical Modelling
                                    </span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">
                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >
                                      Preet and her team at employHER offer exceptional and reliable recruiting service.
                                      Throughout the process, Preet helps through the navigation steps with her exceptional communication and motivation.
                                      She keeps the interests and career goals of the client at the centre. My journey became simpler and a great learning
                                      experience due to her genuine and mentoring relation with me. I highly recommend her and employHER.
                                    </ReactReadMoreReadLess>
                                  </p>
                                </div>

                              </div>

                              <div className="testimonial-block-wrap big">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Maria} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Maria Loza</h4>
                                    <span className="t-designation">Software Engineer at Picnic</span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">
                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >
                                      Preet is just a wonderful person! I’m so glad to have meet her and got to work with employHER.
                                      She was very supportive and a great advocate. She goes beyond to explain each step, so there was never a surprise for
                                      me when it came to the interview processes. She also gives great advice when it comes to climbing the career ladder.
                                      She will check in with you even after helping you land a job. I will always recommend her. She’s direct and open during
                                      conversations. I was never afraid to reach out to her for anything
                                    </ReactReadMoreReadLess>

                                  </p>
                                </div>

                              </div>
                            </div>
                            <div className="testimonial-blocks right">
                              <div className="testimonial-block-wrap big">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Nafisa} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Nafisa Shikdar</h4>
                                    <span className="t-designation">Food Automation Engineer at Picnic</span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">


                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >

                                      I consider myself very fortunate that I found Preet and employHER. I have worked with so many
                                      recruiters in the past 4 years and Preet is definitely very different from all of them. I don’t want to address her as
                                      my “recruiter” cause she is definitely more than that. She is a great motivator, a career coach, a mentor, and she does
                                      not know how to give up on  her candidates and brings out the best from them. I never met any recruiting agency before who
                                      is so committed to making a person succeed. She really cares about her candidates. I would definitely suggest all the
                                      recruiters out there to learn communication, to be proactive, and to be a good motivator from Preet. Because sometimes
                                      that’s all a candidate wants when he /she is trying to succeed.

                                    </ReactReadMoreReadLess>



                                  </p>
                                </div>

                              </div>

                              <div className="testimonial-block-wrap small">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Sharron} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Sharron Allen</h4>
                                    <span className="t-designation">Senior Software Engineer</span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">
                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >

                                      Wow where do I begin. Preet is more than an agent, she truly becomes your biggest cheerleader,
                                      supporter and life coach. Regardless of whatever position I take it was an honor to have worked with her because she
                                      increased my confidence tenfold. Preet genuinely cares and despite tragedy also hitting her she still checked in to see
                                      how things were going. She’s amazing and I’d be remiss to not recommend her not only as an advocate but a friend.
                                    </ReactReadMoreReadLess>
                                  </p>
                                </div>

                              </div>

                            </div>
                          </div>


                        </Grid>
                      </Grid>
                    </div>

                    <div className="landing-s5-testimonial employer">
                      <Grid item xs={12} container direction="row" justify="space-between" alignItems="center">

                        <Grid item xl={8} lg={8} md={12} sm={12} xs={12} >
                          <div className="testimonial-blocks-wrap">
                            <div className="testimonial-blocks left">

                              <div className="testimonial-block-wrap small">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Courtney} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Courtney Ulwelling</h4>
                                    <span className="t-designation">Senior Talent Acquisition Partner</span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">
                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >
                                      I’ve worked with Preet and employHER for a couple of years now, and have been very impressed with both the
                                      mission of her firm as well as the quality of service and candidates delivered. She is eternally optimistic and positive,
                                      very thorough in her research and representation of candidates. She is truly a joy to work with!
                                    </ReactReadMoreReadLess>
                                  </p>
                                </div>

                              </div>

                              <div className="testimonial-block-wrap big">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Tim} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Tim Talda</h4>
                                    <span className="t-designation">Vice President Of Engineering at Picnic</span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">

                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >
                                      Preet does an excellent job of determining the actual needs of her clients by both reviewing written
                                      descriptions about the position, and then interviewing the hiring manager for maximum understanding. She then provides a wide
                                      range of potential applicants, and then follows up for feedback on how each candidate is both perceived and how they compared
                                      to the written and unwritten requirements. She continues to iterate and refine her candidate pool to improve an ever-increasing
                                      chance of a successful match. For those interested in finding candidates from the widest possible candidate pool I would strongly
                                      recommend considering Preet for your hiring needs
                                    </ReactReadMoreReadLess>
                                    .</p>
                                </div>

                              </div>
                            </div>
                            <div className="testimonial-blocks right">
                              <div className="testimonial-block-wrap big">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Destiny} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Destiny Brandt</h4>
                                    <span className="t-designation">
                                      Founder & Employer Relationships Sales, Marketing + Executive Recruitment - Diversity and Inclusion Focused
                                    </span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">
                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >
                                      Wow where do I begin? Preet has the most amazing energy, enthusiasm and grit. She has such an incredible
                                      story and has used her experiences to lift people up and motivate them. She is a dedicated professional who has given so many
                                      people and women a fighting chance at being successful in the professional world. I am thankful I found a friend and mentor
                                      in Preet. She is trustworthy, empathetic and loyal to her clients, candidates and team.
                                    </ReactReadMoreReadLess>
                                  </p>
                                </div>

                              </div>

                              <div className="testimonial-block-wrap small">
                                <div className="t-symbol">
                                  <TSymbol />
                                </div>
                                <div className="t-header">
                                  <div className="t-avatar">
                                    <img src={Michael} />
                                  </div>
                                  <div className="t-header-detail">
                                    <h4 className="t-name">Michael Roman</h4>
                                    <span className="t-designation">Executive Vice President</span>
                                  </div>
                                </div>
                                <div className="t-desc">
                                  <p className="t-comment">
                                    <ReactReadMoreReadLess
                                      charLimit={200}
                                      readMoreText={"Read more"}
                                      readLessText={"Read less"}
                                    >
                                      It’s a pleasure to work together with Preet, who is an incredibly effective and enthusiastic CEO with
                                      her firm, employHER. She has a very strong work ethic and unparalleled analytical and problem solving skills. Preet always
                                      provides outstanding leadership to ensure employHER’s continued success. She has vision to see the benefits and the passion to
                                      turn that into a competitive advantage for employHER. Preet possesses a winning combination of entrepreneurial skills and business
                                      sense that will always serve her well. I have always felt she was one of the most professional people I have ever had the
                                      privilege of working with.
                                    </ReactReadMoreReadLess>
                                  </p>
                                </div>

                              </div>

                            </div>
                          </div>


                        </Grid>

                        <Grid item xl={4} lg={4} md={12} sm={12} xs={12} >
                          <div className="testimonial-text">
                            <h1 className="mb-0"> <span>Employer</span> success stories </h1>
                            <p className="text-center">What our active employers have to say about us</p>
                          </div>
                        </Grid>


                      </Grid>
                    </div>


                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>

        </div>

        {/* {window.innerWidth <= 1024 ? (
				<div></div>
			) : (
				<> */}

        <div className="lightpink-svg" >

          {/* <LightPink /> */}

          <svg width="100%" height="100%" viewBox="0 0 1440 1120" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1776.8 1034.28C1776.8 1034.28 1021.6 1280.68 698.4 935.085C375.2 589.485 424.412 
							342.624 -196.388 403.424C-817.188 464.224 -892 205.485 -892 205.485C-892 205.485 -261.6 -178.515
							 -236 -178.515C-210.4 -178.515 1696.8 55.085 1696.8 55.085L1776.8 1034.28Z" fill="#FBE6F0" />
            <path opacity="0.15" d="M1615.73 921.606C1615.73 921.606 1025.36 1258.58 569.601 565.242C315.291 
							 178.365 -152.833 286.371 -470.399 401.485C-722.639 492.919 -860.8 126.285 -860.8 126.285L-694.569
							  -179C-694.569 -179 1552.7 -99 1562.4 -99C1572.1 -99 1615.73 921.606 1615.73 921.606Z"
              fill="url(#paint0_linear)" style={{ mixBlendMode: 'multiply' }} />
            <path opacity="0.1" d="M1700.73 753.606C1700.73 753.606 1452.96 1286.82 997.2 593.485C541.443 
							  -99.848 -309.907 587.006 -711.6 351.885C-1113.29 116.764 -609.569 -347 -609.569 -347C-609.569 
							  -347 1637.7 -267 1647.4 -267C1657.1 -267 1700.73 753.606 1700.73 753.606Z"
              fill="url(#paint1_linear)" style={{ mixBlendMode: 'multiply' }} /><defs>
              <linearGradient id="paint0_linear" x1="1353.22" y1="835.564" x2="747.102" y2="-779.315"
                gradientUnits="userSpaceOnUse"><stop stopColor="#FFADC6" /><stop offset={1}
                  stopColor="#FF3794" /></linearGradient><linearGradient id="paint1_linear" x1="1428.55"
                    y1="765.332" x2="735.974" y2="-979.714" gradientUnits="userSpaceOnUse"><stop
                  stopColor="#ED81B3" /><stop offset={1} stopColor="#FF3794" /></linearGradient></defs>
          </svg>

        </div>
        {/* </>
			)} */}


        <Container maxWidth="xl" className="p-0">

          <Container maxWidth="lg" className="p-0">
            <div className="landing-s4 text-center xl-mar-top">

              <Grid item xs={12} >

                <Grid item >
                  {/* <div className="landing-s4-text">
										<h1 className="mt-0"><span>employHER</span>{" "}Clients</h1>
									</div>
									<div className="landing-s4-logos-wrap">
										<div className="logo-group">
											<div className="logo-container"><img src={amazon} alt="Amazon" className="mt-4" /> </div>
											<div className="logo-container"><img src={accenture} alt="Accenture" /> </div>
											<div className="logo-container"><img src={pge} className="logo-custome-width" alt="PGE" /> </div>
											<div className="logo-container"><img src={extrahopn} alt="Extra Hop" /></div>
											<div className="logo-container"><img src={metromile} alt="Metromile" /></div>
											<div className="logo-container"><img src={picnic} alt="Picnic" /> </div>
											<div className="logo-container"><img src={corsearch} className="logo-custome-width" alt="Corsearch" /> </div>
										</div>
										<div className="logo-group">
											<div className="logo-container"><img src={pointinside} alt="Pointinside" /> </div>
											<div className="logo-container"><img src={marketly} alt="marketly" /></div>
											<div className="logo-container"><img src={wiselylabs} className="logo-custome-width" width={76} height={77} alt={"Wiselylabs"} /> </div>
											<div className="logo-container"><img src={neu} alt="neu" /> </div>
											<div className="logo-container"><img src={armoire} className="logo-custome-width" alt="Armoire" /> </div>
											<div className="logo-container"><img src={dayblink} alt="Dayblink" /></div>
											<div className="logo-container"><img src={craft} alt="craft" /> </div>
										</div>
									</div> */}
                  <div className="landing-s4-info">
                    <h3 className="my-0">We are on a mission to balance diversity
                    </h3>
                    <h3 className="mt-0">
                      and equality in the workplace
                    </h3>

                    {_.isEmpty(userRole) && (
                      <Button onClick={() => handleButtonClick()} variant="contained" className="primary-btn">
                        Join Us
                      </Button>
                    )}

                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Container>
      </Container>
    </>
  );

};

export default Home;
