import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import _ from "lodash";

import { Button, Modal, Input, FlashMessage } from "../../components/common";
import VideoListingSkeleton from "./components/VideoListingSkeleton";
import VideoCard from "../../components/Candidates/VideoCard";

import appRoutes from "../../routes/app.routes";
import { ReactComponent as NoVideoGraphic } from "../../../src/assets/svg/video-studio-modal.svg";
import { VIDEO_STUDIO_UPLOAD_LIMIT } from "../../utils/appConstants";

import {
  deleteVideoRequest,
  videoStudioListRequest,
  videoStudioListUpdate,
  deleteVideoReset,
  updateVideoRequest,
  updateVideoReset,
  setPrimaryVideoRequest,
  setPrimaryVideoReset,
} from "../../reducers/candidate/videoStudio.reducer";

type Inputs = {
  title: string;
  description: string;
};

const CandidateVideos = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>();
  const [currentEditVideo, setCurrentEditVideo] = useState<any>({});
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentVideoId, setCurrentVideoId] = useState<number>();

  const { register, handleSubmit, errors, setValue, setError, reset, getValues } = useForm<Inputs>();

  const videoStudioReducer = useSelector(({ candidate }) => _.get(candidate, "videoStudio", {}));
  const videoLoading = _.get(videoStudioReducer, "list.loading", false);
  const videoListing: Array<any> = _.get(videoStudioReducer, "list.data", []);
  const videoUpdateReducer = _.get(videoStudioReducer, "update", {});
  const videoUpdateLoading = _.get(videoUpdateReducer, "loading", false);
  const videoUpdateFlag = _.get(videoUpdateReducer, "flag", null);
  const deleteReducer = _.get(videoStudioReducer, "delete", {});
  const videoDeleteLoading = _.get(deleteReducer, "loading", false);
  const videoDeleteFlag = _.get(deleteReducer, "flag", null);

  const setPrimaryVideoReducer = _.get(videoStudioReducer, "setPrimaryVideo", {});
  const setPrimaryVideoFlag = _.get(setPrimaryVideoReducer, "flag", null);

  const fetchVideoListing = () => dispatch(videoStudioListRequest({}));

  useEffect(() => {
    fetchVideoListing();
  }, []);

  // Hook, delete video flash
  useEffect(() => {
    if (videoDeleteFlag === true || videoDeleteFlag === false) {
      setShowDeleteModal(false);
      dispatch(deleteVideoReset());

      if (videoDeleteFlag === true) {
        const deletedId = _.get(deleteReducer, "data", 0);
        const updatedVideoListing = [...videoListing].filter((row) => row.id !== deletedId);

        dispatch(videoStudioListUpdate(updatedVideoListing));
      } else if (videoDeleteFlag === false) {
        FlashMessage(_.get(deleteReducer, "message", "Unable to delete video"), "error");
      }
    }
  }, [videoDeleteFlag]);

  // Hook, update video flash
  useEffect(() => {
    if (videoUpdateFlag === true || videoUpdateFlag === false) {
      if (videoUpdateFlag === true) {
        const editId = _.get(currentEditVideo, "id", 0);
        const updatedVideoListing = [...videoListing].map((row) => {
          if (row.id === editId) {
            return {
              ...row,
              title: getValues("title"),
              description: getValues("description"),
            };
          } else {
            return row;
          }
        });

        dispatch(videoStudioListUpdate(updatedVideoListing));
      } else if (videoUpdateFlag === false) {
        FlashMessage(_.get(videoUpdateReducer, "message", "Unable to update video"), "error");
      }

      dispatch(updateVideoReset());
      resetForm();
    }
  }, [videoUpdateFlag]);

  // Hook, set primary video flash
  useEffect(() => {
    if (setPrimaryVideoFlag === true || setPrimaryVideoFlag === false) {
      if (setPrimaryVideoFlag === true) {
        const videoId = _.get(setPrimaryVideoReducer, "data", 0);
        const updatedVideoListing = [...videoListing].map((row) => {
          if (row.id === videoId) {
            return { ...row, is_primary: 1 };
          } else {
            return { ...row, is_primary: 0 };
          }
        });

        dispatch(videoStudioListUpdate(updatedVideoListing));
      } else if (setPrimaryVideoFlag === false) {
        FlashMessage(_.get(videoUpdateReducer, "message", "Unable to set primary video"), "error");
      }

      dispatch(setPrimaryVideoReset());
    }
  }, [setPrimaryVideoFlag]);

  const handleCreateClick = () => {
    if (videoListing.length < 3) {
      history.push(appRoutes.candidateCreateVideo.path);
    } else {
      FlashMessage(`Max ${VIDEO_STUDIO_UPLOAD_LIMIT} video can be upload`, "error");
    }
  };

  const onDelete = (data) => {
    if ((data.id || 0) > 0 && data.is_primary === 0) {
      setCurrentVideoId(data.id);
      setShowDeleteModal(true);
    } else {
      FlashMessage("Primary video cannot be deleted", "error");
    }
  };

  const handleDeleteVideo = () => {
    dispatch(deleteVideoRequest(currentVideoId));
  };

  const showEditVideoModal = (formData) => {
    setShowEditModal(true);
    setCurrentEditVideo(formData);

    setTimeout(() => {
      setValue("title", formData.title);
      setValue("description", formData.description);
    }, 100);
  };

  const resetForm = () => {
    setShowEditModal(false);
    reset({});
    setCurrentEditVideo({});
  };

  const onSubmit = (formData) => {
    dispatch(
      updateVideoRequest({
        id: currentEditVideo.id,
        ...formData,
      })
    );
  };

  const setAsPrimaryVideo = (data) => {
    dispatch(setPrimaryVideoRequest(data.id || 0));
  };

  return (
    <>
      <Container maxWidth="xl" className="p-0">
        <div className="video-lising-wrapper">
          <div className="video-listing-container">
            <div className="title-wrapper">
              <h2>Video Listing</h2>
              {videoListing.length < 3 && (
                <Button startIcon={<AddIcon />} className="create-button" onClick={() => handleCreateClick()}>
                  Create
                </Button>
              )}
            </div>
            {videoLoading ? (
              <div className="videos-list">
                <Grid container>
                  <VideoListingSkeleton />
                </Grid>
              </div>
            ) : (
              <>
                {videoListing.length > 0 ? (
                  <div className="videos-list">
                    {/* <Grid container> */}
                    {(videoListing || []).map((details, key) => (
                      <VideoCard
                        details={details}
                        key={key}
                        onDelete={(data) => onDelete(data)}
                        onEdit={(data) => showEditVideoModal(data)}
                        setAsPrimaryVideo={(data) => setAsPrimaryVideo(data)}
                      />
                    ))}
                    {/* </Grid> */}
                  </div>
                ) : (
                  <div className="no-videos">
                    <NoVideoGraphic />
                    <p className="no-videos-text font-weight-600 font-lg">Everytime you record a video, you will find it here.</p>
                  </div>
                )}
              </>
            )}
            {/* {videoListing.length < 3 && (
              <div className="create-button-container">
                <div className="create-button-wrapper">
                  <Button className="create-button btn-dark-pink" onClick={() => handleCreateClick()}>
                    <span>+ </span> Create
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </Container>
      <Modal
        visible={showDeleteModal}
        size="medium"
        title=" "
        className="job-archive-modal"
        closeButton={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        closeOnBackDrop={showDeleteModal}
      >
        <Grid container xs={12} className="job-archive-modal-wrapper">
          <Grid item spacing={2} xs={12} className="archive-job-lable-wrapper">
            <Typography variant="h3" gutterBottom className="text-center archive-job-lable">
              <strong> Delete </strong> this video?
            </Typography>
          </Grid>
          <Grid item spacing={2} xs={12} className="text-center action-button-wrapper">
            <Button
              disabled={videoDeleteLoading}
              className="primary-btn btn-transparent dlt-btn archive-job-no"
              onClick={() => setShowDeleteModal(false)}
            >
              No
            </Button>
            <Button loading={videoDeleteLoading} className="primary-btn dlt-btn archive-job-yes" onClick={() => handleDeleteVideo()}>
              Yes
            </Button>
          </Grid>
        </Grid>
      </Modal>

      {/* Edit video */}
      <Modal visible={showEditModal} title="Edit Video" size="large" className="edit-video-modal" onClose={() => resetForm()}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Input
                name="title"
                placeholder="Title"
                validationObj={errors}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please enter title",
                  },
                  minLength: {
                    value: 2,
                    message: "Title must be between 2 to 100 characters long",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must be between 2 to 100 characters long",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextareaAutosize
                className="w-100 dsbl-resize"
                rowsMin="8"
                name="description"
                placeholder="Description"
                ref={register({
                  required: false,
                  maxLength: {
                    value: 500,
                    message: "Description must be 500 characters long",
                  },
                })}
              />
              {errors.description && <p className="MuiFormHelperText-root Mui-error">{errors.description.message}</p>}
            </Grid>
          </Grid>
          <Grid item xs={12} className="text-right mt-10 bottom-control">
            <span
              className="span-link"
              onClick={() => {
                history.push(`/video-studio/edit/${currentEditVideo.id}`);
              }}
            >
              Edit Video
            </span>
            <div>
              <Button type="button" color="transparent" disabled={videoUpdateLoading} onClick={() => resetForm()}>
                Cancel
              </Button>
              <Button type="submit" color="dark-pink" className="ml-10" loading={videoUpdateLoading}>
                Save
              </Button>
            </div>
          </Grid>
        </form>
      </Modal>
    </>
  );
};

export default CandidateVideos;
