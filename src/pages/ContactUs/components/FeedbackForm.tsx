import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { companyFeedbackTypeRequest, submitFeedbackRequest, resetSubmitFeedback } from "../../../reducers/contactUs/contactUs.reducer"
import { Container, Grid } from "@material-ui/core";
import { SelectNew, Input, Radio, Button, SingleFileDropZone } from "../../../components/common";
import _ from "lodash";
import contactUsServices from "../../../services/contactUs.services";
import { scrollToTop } from "../../../utils/helper";

interface IFeedbackForm {
  showForm: string;
  setShowForm: (formType: string) => void
  feedbackSubmitted: boolean;
  setFeedbackSubmitted
}

const FeedbackForm = (props: IFeedbackForm) => {

  const dispatch = useDispatch();
  const { control, handleSubmit, errors, watch, setValue, setError, register, reset } = useForm();

  const [selectedFeedbackTypes, setSelectedFeedbackTypes] = useState([]);
  const [feedbackFile, setFeedbackFile] = useState(null);

  const contactUsReducer = useSelector(({ contactUs }: any) => contactUs);
  const companyFeedbackTypes = _.get(contactUsReducer, "companyFeedbackTypes", []);
  const candidateFeedbackTypes = _.get(contactUsReducer, "candidateFeedbackTypes", []);
  const submitLoading = _.get(contactUsReducer, "submitLoading", false);
  const errorList = _.get(contactUsReducer, "errors", {});
  const submitFlag = _.get(contactUsReducer, "submitFlag", null);

  const userTypeWatch = watch("user_type", "");
  const followupFlagWatch = watch("followup_flag", "0");

  // Mount hook
  useEffect(() => {

    // Fetch only if not dispatched
    if (_.isEmpty(companyFeedbackTypes)) {
      dispatch(companyFeedbackTypeRequest("company"));
    }

  }, []);

  // Submit response
  useEffect(() => {

    if (submitFlag === true) {
      reset();
      props.setFeedbackSubmitted(true);
      dispatch(resetSubmitFeedback());
      scrollToTop();
    } else if (submitFlag === false) {

      // Set error message from API
      if (Object.keys(errorList).length > 0) {
        Object.entries(errorList).forEach(([key, value]: any) => {
          setError(key, { type: "manual", message: value });
        })
      }
    }

  }, [submitFlag]);

  // Mount hook
  useEffect(() => {

    // Reset selected feedback
    setValue("feedback_type_id", null);
    let tmpOptions = [];

    if (!_.isEmpty(userTypeWatch)) {
      if (userTypeWatch.value === "candidate") {
        tmpOptions = candidateFeedbackTypes.map(f => ({ label: f.description, value: f.id }))
      } else {
        tmpOptions = companyFeedbackTypes.map(f => ({ label: f.description, value: f.id }))
      }
    }

    setSelectedFeedbackTypes(tmpOptions);

  }, [userTypeWatch]);

  const onSubmit = (formData) => {

    let file: object = {};

    if (props.showForm === "bugReportForm" && feedbackFile) {
      file = { file: feedbackFile }
    }

    dispatch(submitFeedbackRequest({
      type: "feedback",
      description: formData.description,
      email_address: formData.email_address,
      feedback_type_id: formData.feedback_type_id.value,
      followup_flag: formData.followup_flag,
      user_type: formData.user_type.value,
      ...file
    }));

  }

  const fileUploadSuccess = async (file) => {

    // let payload = new FormData();
    // payload.append("files", file);
    // const fileUpload = await contactUsServices.feedbackFileUpload(payload);
    // setFeedbackFile(_.get(fileUpload, "data.encFileName", null));
  }

  return (
    <Container maxWidth="xl" className="p-0">
      <div className="contact-us mt-20">

        
          
           

            <form className="contact-us-form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} xs={12} sm={12} lg={12} alignItems="center">
                <Grid container item spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <SelectNew
                      className="contact-us-dropdown"
                      name="user_type"
                      options={[{ label: "Candidate", value: "candidate" }, { label: "Company", value: "company" }]}
                      placeholder="I'm using employHER as"
                      control={control}
                      validationObj={errors}
                      rules={{
                        required: {
                          value: true,
                          message: "Please select type",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectNew
                      className="contact-us-dropdown"
                      name="feedback_type_id"
                      options={selectedFeedbackTypes}
                      placeholder="Select feature to provide feedback about"
                      validationObj={errors}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Please select feature type",
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={12} >
                    <Input
                      multiline={true}
                      name="description"
                      className="feedback-description"
                      placeholder="Share your experience with us. What went well? What could have gone better?"
                      validationObj={errors}
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Please enter description",
                        },
                        minLength: {
                          value: 10,
                          message: "Description must be between 10 to 1000 characters long"
                        },
                        maxLength: {
                          value: 1000,
                          message: "Description must be between 10 to 1000 characters long"
                        },
                      })}
                    />
                  </Grid>
                </Grid>
                {(props.showForm === "bugReportForm") && (
                  <Grid container item xs={12} sm={12}>
                    <Grid item xs={12}>
                      <p className="custom-label">Upload your image <small>(PNG, JPG files are allowed)</small></p>
                      <div className="custom-input-type-file">
                        <SingleFileDropZone
                          allowFileTypes={["png", "jpg", "jpeg"]}
                          allowFileSize={1048576}
                          onSuccess={(file) => fileUploadSuccess(file)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                )}
                <Grid container item xs={12}>
                  <Grid item xs={12} sm={6}>
                    <p className="custom-label">Can we follow-up?</p>
                    <Radio
                      name="followup_flag"
                      radioPlacement="block"
                      className="feedback-followup"
                      labelPlacement="end"
                      validationObj={errors}
                      options={[
                        { label: "Yes, Please contact me", value: "1" },
                        { label: "No, Thanks", value: "0" },
                      ]}
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Please select option",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid container className="email-address" item xs={12}>
                  <Grid item xs={12} sm={6}>
                    {(followupFlagWatch === "1") && (
                      <Input
                        name="email_address"
                        placeholder="Email Address"
                        validationObj={errors}
                        inputRef={register({
                          required: {
                            value: true,
                            message: "Please enter email address",
                          },
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Enter valid email address",
                          },
                        })}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3} />
                  <Grid item xs={6} className="submit-btn">
                    <Button color="transparent" disabled={submitLoading} onClick={() => props.setShowForm("index")}>Cancel</Button>
                    <Button type="submit" color="dark-pink" loading={submitLoading}>Submit Feedback</Button>
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
              </Grid>
            </form>

      </div>
    </Container>
  )
}

export default FeedbackForm;
