import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import ProfileSubHeading from "../../../components/Candidates/ProfileSubHeading";
import { Button, Input, FlashMessage, UserAvatar, ProfileImageCrop, Spinner } from "../../../components/common";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { get, forEach, isEmpty, isObject } from "lodash";
import appRoutes from "../../../routes/app.routes";
import { extractNumber } from "../../../utils/helper";
import {
  updateCompanyBasicInfoRequest,
  resetCompanyBasicInfoRequest,
  verifyTokenRequest
} from "../../../reducers/company/basicInfo.reducer";
import { useDispatch, useSelector } from "react-redux";
import commonServices from "../../../services/common.services";
import { useParams } from "react-router-dom";
import UpdatePasswordModal from './updatePassword';
import { getCompanyDetailRequest, uploadCompanyFileRequest } from "../../../reducers/company/companyProfile.reducer";
import Skeleton from '@material-ui/lab/Skeleton';
import { ImageMimeTypes } from "../../../utils/appConstants";
import { readFile } from "../../../utils/cropImageHelper";
import { rootReducersState } from "../../../reducers";

const _ = { get, forEach, isEmpty, isObject };

type Inputs = {
  any: string;
};

const BasicInfo = () => {
  const { register, handleSubmit, errors, setError, control } = useForm<Inputs>();

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const [showCropImage, setShowCropImage] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPwdModal, setPwdModal] = useState(false);
  const [picture, setPicData] = useState(null);

  const isTokenAdded = _.get(params, "token", "");

  // Store data
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const { companyProfile: { loading: fetchLoading, uploadLoading, data } } = useSelector(({ company }: any) => company);
  const basicInfoStore = useSelector(({ company }: any) => company?.basicInfo || {});
  const loading = _.get(basicInfoStore, "loading", false);
  const basicInfoErrors = _.get(basicInfoStore, "errors", {});
  const basicInfoMessage = _.get(basicInfoStore, "message", "");
  const basicInfoFlag = _.get(basicInfoStore, "flag", null);
  const basicDetail = _.get(basicInfoStore, "basicDetail", {});
  const verifyLoading = _.get(basicInfoStore, "verifyLoading", false);
  const isVerified = _.get(basicInfoStore, "isVerified", false);
  const basicInfoDetails = _.isEmpty(basicDetail) ? _.isEmpty(data) ? _.get(sessionReducer, "currentUser", {}) : data : basicDetail;
  const profile_image = _.get(basicInfoDetails, "profile_image", '');
  const isParentAdmin = _.get(basicInfoDetails, "parent_id", 0) === null;
  const legalFullName = `${_.get(basicInfoDetails, "first_name", "")} ${_.get(basicInfoDetails, "last_name", "")}`;
  let jobSearchDelay = null;
  let departmentSearchDelay = null;

  // Verify Token
  useEffect(() => {
    if (!_.isEmpty(isTokenAdded)) {
      dispatch(verifyTokenRequest({ token: isTokenAdded }));
    }
  }, [isTokenAdded]);

  useEffect(() => {
    if (_.isEmpty(basicDetail) && _.isEmpty(isTokenAdded)) {
      dispatch(getCompanyDetailRequest())
    }
  }, [basicDetail, isTokenAdded]);

  // Check Token
  useEffect(() => {
    if (isVerified === false) {
      const msg = basicInfoMessage ? basicInfoMessage : "Something went wrong, please try again later."
      FlashMessage(msg, "error");
      history.push("/");
    }
  }, [isVerified]);

  // Update Password
  useEffect(() => {
    if (!_.isEmpty(basicInfoDetails)) {
      const upadtePassword = _.get(basicInfoDetails, 'set_admin_password', 0);
      if (upadtePassword === 1) {
        setPwdModal(true);
      }
    }
  }, [basicInfoDetails]);

  // Basic Info update Hook
  useEffect(() => {
    if (basicInfoFlag === false) {
      _.forEach(basicInfoErrors, (value, key: any) => {
        setError(key, { type: "manual", message: value });
      });
    }
  }, [basicInfoErrors]);

  useEffect(() => {
    if (basicInfoFlag !== null) {
      if (basicInfoFlag === true) {
        FlashMessage("Admin basic detail has been updated successfully.");
        history.push(appRoutes.companyDashboard.path);
      }
      dispatch(resetCompanyBasicInfoRequest());
    }
  }, [basicInfoFlag]);

  useEffect(() => {
    if (!_.isEmpty(profile_image)) {
      setPicData(profile_image);
    }
  }, [profile_image]);

  const onSubmit = (formData) => {
    formData.contact_info = extractNumber(formData.contact_info);
    formData.id = _.get(basicInfoDetails, "id", 0);
    const payload = {
      hasToken: isTokenAdded,
      invite_token: isTokenAdded,
      ...formData
    }
    dispatch(updateCompanyBasicInfoRequest(payload));
  };

  const onChangePicture = async (e) => {

    if (!_.isEmpty(e.target.files)) {

      const file = e.target.files[0];
      const fileType = file.type;

      if (ImageMimeTypes.includes(fileType)) {
        setFileName(file.name);
        let imageDataUrl = await readFile(file)
        setCropImage(imageDataUrl)
        setShowCropImage(true);
      } else {
        FlashMessage("Please select valid png or jpeg file", "error");
      }
    }
  };

  const handleCropImage = async (blobData) => {
    const src = URL.createObjectURL(blobData);
    setPicData(src);

    const payload = new FormData();
    payload.append("uploadType", "image");
    payload.append("files", blobData, fileName);
    const data = { type: 'image', payload: payload };
    dispatch(uploadCompanyFileRequest(data));
  }

  const handlePwdModal = () => {
    setPwdModal(!showPwdModal);
  };

  // Filter job titles
  const filterJobTitles = async (inputValue: string) => {
    const jobTitleDetails = await commonServices.fetchJobTitles(inputValue);
    const jobTitleObject = _.get(jobTitleDetails, "data", []).map((c) => ({
      value: c.id,
      label: c.title,
    }));
    return jobTitleObject;
  };

  // Promises of job title search with delay of 1 second
  const searchJobTitle = (search: string) =>
    new Promise((resolve) => {
      clearTimeout(jobSearchDelay);
      jobSearchDelay = setTimeout(async () => {
        resolve(filterJobTitles(search));
      }, 1000);
    });

  // Filter department
  const filterDepartments = async (inputValue: string) => {
    const departmentDetails = await commonServices.fetchDepartment(inputValue);
    const departmentObject = _.get(departmentDetails, "data", []).map((c) => ({
      value: c.id,
      label: c.title,
    }));
    return departmentObject;
  };

  // Promises of department search with delay of 1 second
  const searchDepartments = (search: string) =>
    new Promise((resolve) => {
      clearTimeout(departmentSearchDelay);
      departmentSearchDelay = setTimeout(async () => {
        resolve(filterDepartments(search));
      }, 1000);
    });

  return (
    <div className="company-basic-info">
      <Spinner visible={verifyLoading} >
        <Container
          maxWidth="lg"
          id="createProfileForm"
          className="create-profile-form company-admin-profile"
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="user-profile-intro">
                  <div className="her-profile">
                    <Typography className="create-her-profile" gutterBottom>
                      Create <span>HER</span> Admin Profile
                    </Typography>
                    <Typography variant="h6" className="margin">
                      Let’s make a change together
                    </Typography>
                  </div>
                  <div className="progressbar">
                    {/* put circular progressbar here */}
                  </div>
                </div>

              </Grid>
              <Grid item xs={12} >
                <ProfileSubHeading title="Basic Information" />
                <Grid
                  container
                  justify="center"
                  text-align="center"
                  alignItems="center"
                  className="mt-25"
                >
                  {(uploadLoading || fetchLoading) ? (
                    <Skeleton variant="circle" height={100} width={100} />
                  ) :
                    _.isEmpty(picture) ? (
                      <UserAvatar size="md" />
                    ) : (
                      <img src={picture} className="admin-img" />
                    )}
                </Grid>
                {isParentAdmin && (
                  <Grid
                    container
                    justify="center"
                    text-align="center"
                    alignItems="center"
                    className="mt-25 mb-40"
                  >
                    <div className="profile-picture">
                      <div className="select-profile">
                        <Input
                          className="select-profile-btn"
                          name="image"
                          type="file"
                          onChange={(e) => onChangePicture(e)}
                          accept="image/*"
                          disabled={!isParentAdmin}
                        />
                        <span>
                          <Button color="upload" disabled={uploadLoading} loading={uploadLoading} className=" border-button btn-transparent">Upload</Button>
                        </span>
                      </div>
                    </div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Input
                      name="legalFullName"
                      externalLabel={{
                        label: "Legal Full Name",
                        className: "required required",
                      }}
                      value={legalFullName}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Input
                      name="email"
                      value={_.get(basicInfoDetails, "email", "")}
                      externalLabel={{
                        label: "Company Email Address",
                        className: "required",
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Input
                      name="employee_id"
                      defaultValue={_.get(basicInfoDetails, "employee_id", "")}
                      externalLabel={{
                        label: "Employee ID",
                      }}
                      disabled={_.get(basicInfoDetails, "employee_id", "") !== ""}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    {/* <AsyncSelect
                    name="job_title"
                    placeholder="Search Job title..."
                    externalLabel={{ label: "Job Title", className: "required" }}
                    onStartSearching={searchJobTitle}
                    validationObj={errors}
                    control={control}
                    noOptionsMessage="No matching job titles"
                    rules={{
                      required: {
                        value: true,
                        message: "Please select job title",
                      },
                    }}
                  /> */}
                    <Input
                      name="job_title"
                      externalLabel={{
                        label: "Job title",
                        className: "required"
                      }}
                      validationObj={errors}
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Please enter job title"
                        }
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {/* <AsyncSelect
                  name="department"
                  placeholder="Search department..."
                  externalLabel={{ label: "Department", className: "required" }}
                  onStartSearching={searchDepartments}
                  validationObj={errors}
                  control={control}
                  noOptionsMessage="No matching department"
                  rules={{
                    required: {
                      value: true,
                      message: "Please select department",
                    },
                  }}
                /> */}
                    <Input
                      name="department"
                      externalLabel={{
                        label: "Department ",
                        className: "required"
                      }}
                      validationObj={errors}
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Please enter department"
                        }
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Input
                      name="contact_info"
                      mask="(999) 999-9999"
                      placeholder="(   )    -    "
                      externalLabel={{
                        label: "My Contact Info",
                        className: "required",
                      }}
                      validationObj={errors}
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Please enter contact info",
                        },
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justify="center"
                  text-align="center"
                  alignItems="center"
                  className="mt-25"
                >
                  <Button type="submit" color="dark-pink" className="btn-dark-pink" loading={loading}>
                    Create Admin Profile
                  </Button>
                </Grid>
                <Grid
                  container
                  justify="center"
                  text-align="center"
                  alignItems="center"
                  className="mt-25 mb-30"
                >
                  <span
                    className="span-link btn-save-darft"
                    onClick={() => history.push(appRoutes.companyDashboard.path)}
                  >
                    Save for Later
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Spinner>
      <UpdatePasswordModal showModal={showPwdModal} handleClose={() => handlePwdModal()} token={isTokenAdded} />
      <ProfileImageCrop
        visible={showCropImage}
        cropImage={cropImage}
        btnCropText="Save"
        onClose={() => setShowCropImage(false)}
        onCrop={(data) => handleCropImage(data)}
      />
    </div>
  );
};

export default BasicInfo;
