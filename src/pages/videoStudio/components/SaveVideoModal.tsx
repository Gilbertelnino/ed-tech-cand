import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Modal, Button, FlashMessage } from "../../../components/common";
import { FormControl } from "@material-ui/core/";

import { Input } from "../../../components/common";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { createVideoReset } from "../../../reducers/candidate/videoStudio.reducer";
import appRoutes from "../../../routes/app.routes";
import VideoProgress from "./VideoProgess";

type Inputs = {
  title: string;
  description: string;
};

const SaveVideoModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [progress, setProgress] = useState(0);
  const [previousValues, setPreviousValues] = useState<any>({});
  const videoStudioReducer = useSelector(({ candidate }: any) => _.get(candidate, "videoStudio", {}));
  const videoStudioCreate = _.get(videoStudioReducer, "create", {});
  const videoStudioFlag = _.get(videoStudioReducer, "create.flag", null);
  const videoStudioError = _.get(videoStudioReducer, "create.errors", {});
  const videoStudioLoading = _.get(videoStudioReducer, "create.loading", false);

  const { register, handleSubmit, errors, setError, setValue, control } = useForm<Inputs>();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Success Hook
  useEffect(() => {
    if (videoStudioFlag === true || videoStudioFlag === false) {
      if (videoStudioFlag === true) {
        const { handleOnClose } = props;

        dispatch(createVideoReset());
        if (typeof handleOnClose === "function") {
          handleOnClose();
        }

        FlashMessage("Video saved successfully");
        setTimeout(() => {
          window.location.href = appRoutes.candidateVideos.path;
        }, 1000);
      } else if (videoStudioFlag === false) {
        if (_.get(videoStudioCreate, "message") !== "RESPONSE_EMPTY") {
          // Check if request is cancelled or not
          setValue("title", previousValues.title || "");
          setValue("description", previousValues.description || "");
          FlashMessage(_.get(videoStudioCreate, "message", "Unable to save video"), "error");
        }
      }
    }
  }, [videoStudioFlag]);

  // Error Hook
  useEffect(() => {
    _.forEach(videoStudioError, (value, key: any) => {
      setError(key, { type: "manual", message: value });
    });
  }, [videoStudioError]);

  const onSubmit = (formData) => {
    const { exportToProfile } = props;
    setPreviousValues(formData);
    if (typeof exportToProfile === "function") {
      exportToProfile(formData);
    }
  };

  return (
    <Modal
      visible={props.show}
      title="Save Video"
      className={videoStudioLoading ? "loading-modal" : "save-video-modal"}
      closeButton={true}
      onClose={() => props.handleOnClose()}
    >
      {videoStudioLoading ? (
        <VideoProgress handleClose={props.handleOnClose} />
      ) : (
        <>
          <FormControl className="save-video-modal-form">
            <div className="video-size-time-conainer">
              <p>Estimated Size : 30M </p>
              <p>Estimated Download Time : 10 min.</p>
            </div>
          </FormControl>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="title"
              placeholder="Title"
              externalLabel={{ label: "Title" }}
              defaultValue={_.get(props, "studioEditDetails.title", "")}
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
            {/* Maybe required */}
            {/* <SelectNew
              name="type"
              externalLabel={{ label: "Category" }}
              placeholder="Category"
              options={[]}
              isSearchable={false}
              validationObj={errors}
              control={control}
              required={true}
              rules={{
                required: {
                  value: true,
                  message: "Please select a category",
                },
              }}
            /> */}
            <Input
              name="description"
              externalLabel={{ label: "Additional Notes" }}
              placeholder="Notes..."
              defaultValue={_.get(props, "studioEditDetails.description", "")}
              variant="outlined"
              multiline={true}
              inputRef={register({
                required: false,
              })}
              required={false}
            />
            <div className="save-video-button-section">
              <Button type="submit" className="btn-save primary-btn">
                Save
              </Button>
              <Button color="dark-pink" className="btn-secondary" onClick={(e) => props.handleOnClose(e)}>
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};

export default SaveVideoModal;
