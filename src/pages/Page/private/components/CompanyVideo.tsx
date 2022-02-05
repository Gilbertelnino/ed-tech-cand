import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputLabel, Typography } from "@material-ui/core";
import { isEmpty, isObject, get } from 'lodash';
import { Button, ConfirmDialog, Input, Spinner, FlashMessage } from "../../../../components/common";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { getCompanyDetailRequest, uploadCompanyFileRequest, deleteVideoRequest, resetCompanyDetailRequest } from "../../../../reducers/company/companyProfile.reducer";
import ReactPlayer from "react-player";
import { bytesMb, VideoMimeTypes } from "../../../../utils/appConstants";
import companyServices from "../../../../services/company.services";
import { rootReducersState } from "../../../../reducers";

const _ = { isEmpty, isObject, get };

interface IVideo {
  videoId: number
  isParentAdmin: boolean
}

const CompanyVideos = (props: IVideo) => {

  const [videoUploadLoading, setVideoUploadLoading] = useState(false);
  const [videoDeleteLoading, setVideoDeleteLoading] = useState(false);
  const [videoSignedURL, setVideoSignedURL] = useState(null);
  const [deleteVideoName, setDeleteVideoName] = useState(null);
  const [deleteConfirmShow, setDeleteConfirmShow] = useState(false);

  const companyReducer = useSelector(({ company }: any) => company);
  const companyVideosData = _.get(companyReducer, "companyProfile.data.companyVideos", []);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const userData = _.get(sessionReducer, "currentUser", {});
  const isParentAdmin = _.get(userData, "parent_id", 0) === null;

  const videoURL = _.get(companyVideosData, `[${props.videoId}].url`, null);
  const profileVideoName = _.get(companyVideosData, `[${props.videoId}].profile_video`, null);

  // Set video URL from API video success Hook
  useEffect(() => {
    if (videoURL) {
      setVideoSignedURL(videoURL);
      setDeleteVideoName(profileVideoName);
    }
  }, [videoURL]);

  const onUploadVideo = async (e) => {

    setVideoUploadLoading(true);

    try {
      if (!_.isEmpty(e.target.files)) {

        const file = e.target.files[0]
        const fileSize = file.size;
        const fileType = file.type;

        // Check file type
        if (VideoMimeTypes.includes(fileType)) {

          if (fileSize <= bytesMb.mb_5) {

            const payload = new FormData();
            payload.append("files", file, file.name);

            const result = await companyServices.uploadCompanyFile({
              type: 'video', payload: payload
            });

            if (_.get(result, "flag", false) === true) {
              const signedUrl = _.get(result, "data.signedUrl", null);
              const videoName = _.get(result, "data.file", null);

              setDeleteVideoName(videoName);
              setVideoSignedURL(signedUrl);
            } else {
              FlashMessage(_.get(result, "message", "Something went wrong while uploading a video"), "error");
            }
          } else {
            FlashMessage("File size should be less than 5mb", "error");
          }
        } else {
          FlashMessage("Please select valid mp4 or mov file", "error");
        }
      }

    } catch (error) {
      FlashMessage("Something went wrong while uploading a video", "error");
    } finally {
      setVideoUploadLoading(false);
    }


  };

  const handleDelete = async () => {
    setVideoDeleteLoading(true);
    try {

      if (deleteVideoName) {

        const result = await companyServices.deleteVideo({ video: deleteVideoName });

        if (_.get(result, "flag", false) === true) {

          // Reset video usages
          setVideoSignedURL(null);
          setDeleteVideoName(null);
        } else {
          FlashMessage(_.get(result, "message", "Something went wrong while deleting a video"), "error");
        }

      } else {
        FlashMessage("Video not found", "error");
      }
    } catch (error) {

    } finally {
      setVideoDeleteLoading(false);
      setDeleteConfirmShow(false);
    }
  };

  return (
    <>
      <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field">
        <div className={'profile-video'}>
          <Input
            className="select-video-btn"
            name="banner"
            type="file"
            onChange={(e) => onUploadVideo(e)}
            disabled={props.isParentAdmin}
          />
          <span>
            {_.isEmpty(videoSignedURL) ? (
              <Spinner visible={videoUploadLoading}>
                <CloudUploadIcon />
              </Spinner>
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
                  url={videoSignedURL}
                  playing={false}
                  controls={true}
                />
              </>
            )}
          </span>
        </div>
        {!_.isEmpty(videoSignedURL) && isParentAdmin &&
          <div className="dlt-link-btn">
            <div
              className="delete-icon"
              onClick={() => setDeleteConfirmShow(true)}
            >
              <DeleteOutlinedIcon /> <span>Delete</span>
            </div>
          </div>
        }
      </Grid>
      <ConfirmDialog
        visible={deleteConfirmShow}
        loading={videoDeleteLoading}
        bodyText="Are you sure you want to delete this video?"
        onCancel={() => setDeleteConfirmShow(false)}
        onConfirm={() => handleDelete()}
      />
    </>
  );
}

export default CompanyVideos;
