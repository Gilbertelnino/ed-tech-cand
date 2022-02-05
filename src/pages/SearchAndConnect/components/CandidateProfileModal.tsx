import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import GetAppSharpIcon from '@material-ui/icons/GetApp';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { Spinner } from '../../../components/common'
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import unknownProfile from "../../../assets/images/unknownProfile.jpeg";
import educationProfile from "../../../assets/images/education.png";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton, Button, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core/';
import playVidProfileBtn from "../../../assets/images/play-vid-profile-btn.png";
import CompanyProfile from "../../../assets/images/CompanyProfile.png";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { ReactComponent as PlayVideoText } from "../../../assets/svg/play-video-text.svg";
import UserAvatar from "../../../components/common/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import VideoModal from './profileVideoModal';
import { getInitialLetter } from "../../../utils/helper";
import { get, isEmpty } from "lodash";


import { getCandidateProfileRequest, candidateProfileReset } from "../../../reducers/SearchAndConnect/searchAndConnect.reducer";

const _ = { get, isEmpty };

const CandidatesModal = (props) => {

  const dispatch = useDispatch();
  const { search: { profile, profileLoading } } = useSelector(({ search }) => search);
  const [candidateVideoUrl, setCandidateVideoUrl] = useState("");
  const [videoModalStatus, setvideoOpen] = useState(false);

  const videoShowModal = (url) => {
    setCandidateVideoUrl(url)
    setvideoOpen(true);
  };

  const videoModalHandleClose = () => {
    setvideoOpen(false);
  };

  const candidateModalHandleClose = () => {
    dispatch(candidateProfileReset({}));
    props.handleOnClose();
  }

  useEffect(() => {
    if (props.payload.slug) {
      dispatch(getCandidateProfileRequest({ slug: props.payload.slug }));
    }
  }, [props.payload]);

  return (
    <div>
      <div className="main-container">
        <Dialog
          open={props.status}
          onClose={candidateModalHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
          className="candidateModalContainer search-profile-quick-view"
        >
          <DialogTitle id="alert-dialog-title" className="candidateModalHeader modal-header">
            <Grid item xs={12}>
              <Grid container alignItems="flex-end" justify="flex-end">
                {/* TO DO */}
                {/* <IconButton aria-label="close" onClick={props.handleOnClose} className="share-profile-btn">
                  <ShareOutlinedIcon />
                  Share Profile
                </IconButton> */}
                <IconButton aria-label="close" onClick={candidateModalHandleClose} className="close-btn">
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Spinner visible={profileLoading}>
          <DialogContent className="candidateModalContent modal-content">
            <Grid container>
              <Grid item xs={12} sm={4} md={4} className="profile-content-left">
                <Grid>
                  <div className="profile-picture">
                    <div className="profile-img">
                      <UserAvatar
                        size="md"
                        className="cursor-pointer"
                        src={_.get(profile, "profile_image", { unknownProfile })}
                        variant="circle"
                      >
                        {/* Fallback initial letters of candidate */}
                        <span className="text-black">{getInitialLetter(`${_.get(profile, "first_name", "")} ${_.get(profile, "last_name", "")}`)}</span>
                      </UserAvatar>
                    </div>
                    {_.get(profile, "profile.profile_video", "") && (
                      <>
                        

                        <div className="video-play-btn">
                          <PlayArrowIcon onClick={() => videoShowModal(_.get(profile, "profile.profile_video", ""))} />
                        </div>
                      </>
                    )}
                  </div>
                  <h4>{_.get(profile, "first_name", "")} {_.get(profile, "last_name", "")}</h4>
                </Grid>
                 {/* To DO */}
                {/* <Grid className="profile-btn-container">
                  <IconButton onClick={props.handleOnClose} className="btn btn-primary downloadResumeButton">
                    <GetAppSharpIcon />
                    Download Resume
                  </IconButton>
                  <IconButton onClick={props.handleOnClose} className="btn btn-transparent sendEmailButton">
                    <EmailOutlinedIcon />
                    Send Email
                  </IconButton>
                </Grid> */}
                <p>{_.get(profile, "profile.personal_values", "")}</p>
                <Grid className="skill-container">
                  <h3>Skills</h3>
                  <div className="skill-btn-wrap">
                    {_.isEmpty(_.get(profile, "skills", [])) && <p>N/A</p>}
                    {!_.isEmpty(_.get(profile, "skills", [])) && _.get(profile, "skills", []).map(skill => {
                      return <Button className="skill-btn">{skill.title}</Button>
                    })}
                  </div>
                </Grid>
              </Grid>

              <Grid item sm={8} className="profile-content-right">
                <Accordion defaultExpanded={true} className="accordion-container">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>Experience</h3>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-details">
                    {_.isEmpty(_.get(profile, "experiences", [])) && <p>N/A</p>}
                    {!_.isEmpty(_.get(profile, "experiences", [])) && _.get(profile, "experiences", []).map(experience => {
                      return <Grid container>
                        <Grid className="accordion-details-left" item sm={2}>
                        <UserAvatar
                          size="sm"
                          className="cursor-pointer"
                          src={_.get(experience, "profile_image", { unknownProfile })}
                          variant="circle"
                        >
                          {/* Fallback initial letters of candidate */}
                          <span className="text-black">{getInitialLetter(_.get(experience, "company_name", ""))}</span>
                        </UserAvatar>
                        </Grid>
                        <Grid className="accordion-details-right" item sm={10}>
                          <h3>{experience.company_name}</h3>
                          <p>{experience.job_position}</p>
                          <p> {experience.job_started} - {experience.job_ended ? experience.job_ended : "Present"} {experience.job_location ? `| ${experience.job_location}` : ""} </p>
                          <hr />
                        </Grid>
                      </Grid>
                    })}
                  </AccordionDetails>
                </Accordion>
                <Accordion className="accordion-container">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>Education</h3>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-details">
                    {_.isEmpty(_.get(profile, "education", [])) && <p>N/A</p>}
                    {!_.isEmpty(_.get(profile, "education", [])) && _.get(profile, "education", []).map(education => {
                      return <Grid container>
                        <Grid className="accordion-details-left" item sm={2}>
                          <img src={educationProfile} alt="educationProfile" />
                        </Grid>
                        <Grid className="accordion-details-right" item sm={10}>
                          <h3>{education.institute_name}</h3>
                          <p>{education.field_of_study}</p>
                          <p> {education.degree_from} - {education.is_present ? "Present" : education.degree_to} | {education.degree_title} </p>
                          <hr />
                        </Grid>
                      </Grid>
                    })}
                  </AccordionDetails>
                </Accordion>
                <Accordion className="accordion-container">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>Projects</h3>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-details">
                    {_.isEmpty(_.get(profile, "projects", [])) && <p>N/A</p>}
                    {!_.isEmpty(_.get(profile, "projects", [])) && _.get(profile, "projects", []).map(project => {
                      return <Grid container>
                        <Grid className="accordion-details-left" item sm={2}>
                        <UserAvatar
                          size="sm"
                          className="cursor-pointer"
                          src={_.get(project, "profile_image", { unknownProfile })}
                          variant="circle"
                        >
                          {/* Fallback initial letters of candidate */}
                          <span className="text-black">{getInitialLetter(_.get(project, "title", ""))}</span>
                        </UserAvatar>
                        </Grid>
                        <Grid className="accordion-details-right" item sm={10}>
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                          <p> {project.start_date} - {project.is_present ? "Present" : project.end_date} | <a href={project.link}>{project.link}</a> </p>
                          <hr />
                        </Grid>
                      </Grid>
                    })}
                  </AccordionDetails>
                </Accordion>
                {/* TO DO */}
                {/* <Accordion className="accordion-container">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>Professional Passions</h3>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-details">

                  </AccordionDetails>
                </Accordion> */}
              </Grid>
            </Grid>
          </DialogContent>
          </Spinner>
        </Dialog>
      </div>
      <VideoModal
        status={videoModalStatus}
        candidateVideoUrl={candidateVideoUrl}
        handleOnClose={videoModalHandleClose}
      />
    </div>

  )

}

export default CandidatesModal;
