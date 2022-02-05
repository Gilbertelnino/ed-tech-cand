import React, { useEffect, useState } from "react";
import { Add as AddIcon } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import _ from "lodash";

import { Input, Spinner, Button, ProfileImageCrop, FlashMessage, ConfirmDialog } from "../../../../components/common";
import peopleServices from "../../../../services/people.services";
import { readFile } from "../../../../utils/cropImageHelper";
import { ImageMimeTypes } from "../../../../utils/appConstants";

type FormFields = {
  leader_name: string;
  job_title: string;
  company_email: string;
  image: Blob;
};

interface ILeaderProfile {
  data: any;
  isParentAdmin: boolean;
  [key: string]: any;
}

const LeaderProfile = (props: ILeaderProfile) => {

  const { register, handleSubmit, errors, control, getValues, setError, reset: resetFormValues, clearErrors, setValue } = useForm<FormFields>();
  const [leaderId, setLeaderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [picturePath, setPicturePath] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [showCropImage, setShowCropImage] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [finalImageBlob, setFinalImageBlob] = useState<Blob>();

  useEffect(() => {

    if (!_.isEmpty(props.data)) {
      setLeaderId(_.get(props, "data.id", null));
      setValue("leader_name", _.get(props, "data.leader_name", ""));
      setValue("company_email", _.get(props, "data.company_email", ""));
      setValue("job_title", _.get(props, "data.job_title", ""));
      setPicturePath(_.get(props, "data.image", ""))
    }

  }, [props.data]);

  const onSubmit = async (formData) => {

    setLoading(true);
    try {

      const payload = new FormData();

      if (finalImageBlob) {
        payload.append("image", finalImageBlob, "croppedImage.png");
      }
      payload.append("leader_name", formData.leader_name);
      payload.append("company_email", formData.company_email);
      payload.append("job_title", formData.job_title);

      let result = {};

      if (leaderId) {
        result = await peopleServices.updatePeople({
          id: leaderId,
          formData: payload
        });
      } else {
        payload.append("display_on_company_page", "1");
        result = await peopleServices.createPeople(payload);
      }

      if (_.get(result, "flag", "") === true) {
        if (leaderId) {
          setLeaderId(leaderId);
        } else {
          setLeaderId(_.get(result, "data.id", null));
        }

        // Reset blob file to prevent being uploaded again
        setFinalImageBlob(null);
      } else {
        const errors = _.get(result, "errors", {});

        for (const [key, value] of Object.entries(errors)) {
          setError(key, { type: "manual", message: (value as string) });
        }
        console.log("errors", errors);
      }

    } catch (error) {

    } finally {
      setLoading(false);
    }

  }

  const onChangePicture = async (e) => {

    if (!_.isEmpty(e.target.files)) {

      const file = e.target.files[0]
      const fileType = file.type;

      if (ImageMimeTypes.includes(fileType)) {
        let imageDataUrl = await readFile(file)
        setCropImage(imageDataUrl)
        setShowCropImage(true);
      } else {
        FlashMessage("Please select valid png or jpeg file", "error");
      }
    }
  }

  const handleCropImage = async (blobData) => {
    setFinalImageBlob(blobData);
    const src = URL.createObjectURL(blobData);
    setPicturePath(src);
  }

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      if (leaderId) {
        const result = await peopleServices.deletePeople(leaderId);

        if (_.get(result, "flag", "") === true) {
          // Reset form
          setLeaderId(null);
          resetFormValues({});
          setConfirmModalVisible(false);
          setPicturePath(null);
          setFinalImageBlob(null);
        } else {
          FlashMessage(_.get(result, "message", "Something went wrong while deleting leader"), "error");
        }
      } else {
        FlashMessage("Invalid leader selection to delete", "error");
      }
    } catch (error) {
      FlashMessage("Something went wrong while deleting", "error");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <Grid item xs={12} className="page-home-form-field people-form-wrapper">
        <form
          className={"page-home-form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}        
        >
          <Grid item>
            <Spinner visible={false} >
              <div className={"select-profile"}>
                <Input
                  className="select-profile-btn"
                  inputRef={register}
                  name="image"
                  type="file"
                  onChange={(e) => onChangePicture(e)}
                  disabled={props.isParentAdmin}
                />
                <span>
                  {_.isEmpty(picturePath) ? (
                    <AddIcon />
                  ) : (
                    <img src={picturePath} className="people-img" />
                  )}
                </span>
              </div>
            </Spinner>
          </Grid>
          <Grid item lg={3} className="page-home-form-field">
            <Input
              name="leader_name"
              externalLabel={{ label: "Name" }}
              placeholder="Leader"
              className="leader-name"
              validationObj={errors}
              inputRef={register({
                required: {
                  value: true,
                  message: "Please enter leader’s name",
                },
              })}
              disabled={props.isParentAdmin}
            />
            
          </Grid>
          <Grid  item lg={3} className="page-home-form-field">
          <Input
              name="job_title"
              externalLabel={{ label: "Job Title" }}
              placeholder="Title"
              className="job-title"
              validationObj={errors}
              inputRef={register({
                required: {
                  value: true,
                  message: "Please enter job title",
                },
              })}
              disabled={props.isParentAdmin}
            />
          </Grid>

          <Grid  item lg={3} className="page-home-form-field">
          <Input
              name="company_email"
              externalLabel={{ label: "employHER Profile Link" }}
              placeholder="Link"
              className="company-email"
              validationObj={errors}
              inputRef={register({
                required: {
                  value: true,
                  message: "Please enter company email",
                },
              })}
              disabled={props.isParentAdmin}
            />
          </Grid>
          <Grid lg={3}>
          <div className="controls">
            <Button className="controlsBtn" type="submit" disabled={props.isParentAdmin} loading={loading}>Save</Button>
            {leaderId && <Button className="controlsBtn" color="secondary"  onClick={() => setConfirmModalVisible(true)}>Delete</Button> }
            </div>
          </Grid>
        </form>
      </Grid>

      <ProfileImageCrop
        visible={showCropImage}
        cropImage={cropImage}
        onClose={() => setShowCropImage(false)}
        onCrop={(data) => handleCropImage(data)}
      />
      <ConfirmDialog
        visible={confirmModalVisible}
        loading={deleteLoading}
        bodyText="Are you sure you want to delete this record?"
        onCancel={() => setConfirmModalVisible(false)}
        onConfirm={() => handleDelete()}
      />
    </>
  )
}

export default LeaderProfile;
