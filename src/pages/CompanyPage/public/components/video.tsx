import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isObject, get } from "lodash";
import VideocamIcon from "@material-ui/icons/Videocam";
import { Grid, Container, Typography } from "@material-ui/core";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ReactPlayer from "react-player";

const _ = { isEmpty, isObject, get };

const Videos = () => {

  const { companyPublicProfile: { data } } = useSelector(({ company }) => company);
  const companyVideos = _.get(data, 'companyVideos', []);
  const videoPath1 = _.get(companyVideos, "[0].url", "");
  const videoPath2 = _.get(companyVideos, "[1].url", "");
  const videoPath3 = _.get(companyVideos, "[2].url", "");

  return (
    (!_.isEmpty(videoPath1) || !_.isEmpty(videoPath2) || !_.isEmpty(videoPath3)) && (
      <div className="our-her-vdo-wrap">
        <h4 className="title">Our HER Videos</h4>
        <Container maxWidth="lg">
          <div className="video-block-wrapper h-slim-scroll">
            <div className="job-form-field video-block">
              {!_.isEmpty(videoPath1) && (
                <div className={'profile-video'}>
                  <span>
                    {_.isEmpty(videoPath1) ? (
                      <>
                        {/*<VideocamIcon className="video-icon" fontSize="large" />*/}
                      </>
                    ) : (
                      <>
                        <ReactPlayer
                          config={{
                            youtube: {
                              playerVars: { controls: 0, showInfo: 0 },
                            },
                          }}
                          width="100%"
                          height="100%"
                          url={videoPath1}
                          playing={false}
                          controls={true}
                        />
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="job-form-field video-block">
              {!_.isEmpty(videoPath2) && (
                <div className={'profile-video'}>
                  <span>
                    {_.isEmpty(videoPath2) ? (
                      <>{/*<VideocamIcon className="video-icon" fontSize="large" />*/}</>
                    ) : (
                      <ReactPlayer
                        config={{
                          youtube: {
                            playerVars: { controls: 0, showInfo: 0 },
                          },
                        }}
                        width="100%"
                        height="100%"
                        url={videoPath2}
                        playing={false}
                        controls={true}
                      />
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="job-form-field video-block">
              {!_.isEmpty(videoPath3) && (
                <div className={'profile-video'}>
                  <span>
                    {_.isEmpty(videoPath3) ? (
                      <>{/*<VideocamIcon className="video-icon" fontSize="large" />*/}</>
                    ) : (
                      <ReactPlayer
                        config={{
                          youtube: {
                            playerVars: { controls: 0, showInfo: 0 },
                          },
                        }}
                        width="100%"
                        height="100%"
                        url={videoPath3}
                        playing={false}
                        controls={true}
                      />
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    )
  );
}

export default Videos;