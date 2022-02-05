import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, FormHelperText, InputLabel, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Scrollbars } from "react-custom-scrollbars";
import Skeleton from "@material-ui/lab/Skeleton";
import _ from "lodash";

import { Spinner, Input, SelectNew, Location, FlashMessage } from "../../../components/common";
import { industryListRequest } from "../../../reducers/industry/industry.reducer";
import { employeeSizeListRequest } from "../../../reducers/employeeSize/employeeSize.reducer";
import {
  getCompanyDetailRequest, updateCompanyProfileRequest, updateCompanyProfileResetFlag, updateCompanyProfilePartiallyRequest
} from "../../../reducers/company/companyProfile.reducer";
import appRoutes, { companyPrefix } from "../../../routes/app.routes";
import CompanyBanner from "./components/CompanyBanner";
import CompanyVideos from "./components/CompanyVideo";
import LeaderProfile from "./components/LeaderProfile";
import { pluckFromArray } from "../../../utils/helper";
import { navSaveButtonLoading } from "../../../reducers/common/navBar.reducer";
import { rootReducersState } from "../../../reducers";

type FormFields = {
  company_name: string;
  industry_id: object | null;
  location: string;
  location_json: string;
  employee_size_id: object | null;
  website: string;
  who_we_are: string;
  mission_and_vision: string;
  diversity_and_inclusion: string;
};

const CompanyPrivateHome = (props) => {

  const pageSubmitBtnRef = useRef<HTMLButtonElement>(null);
  const [industryOption, setIndustryOption] = useState([]);
  const [employeeSizeOption, setEmployeeSizeOption] = useState([]);
  const [location, setLocation] = useState("");

  const { register, handleSubmit, errors, control, getValues, setError, reset: resetFormValues, clearErrors, setValue } = useForm<FormFields>();

  const companyReducer = useSelector(({ company }: any) => company);
  const companyUserData = _.get(companyReducer, "companyProfile.data", {}); // Parent object
  const companyProfileData = _.get(companyReducer, "companyProfile.data.companyProfile", {});
  const companyPeopleData = _.get(companyReducer, "companyProfile.data.companyPeople", []);
  const companyProfileUpdateFlag = _.get(companyReducer, "companyProfile.updateFlag", null);
  const companyProfileUpdateMessage = _.get(companyReducer, "companyProfile.profileUpdateMessage", "");
  const companyProfileUpdateErrors = _.get(companyReducer, "companyProfile.profileUpdateErrors", {});

  const industryReducer = useSelector(({ industry }: any) => industry);
  const industryOptionsData = _.get(industryReducer, "industries.data", []);

  const employeeSizeReducer = useSelector(({ employeeSize }: any) => employeeSize);
  const employeeSizeOptionsData = _.get(employeeSizeReducer, "list.data", []);

  const { companyProfile: { data: { slug }, uploadFlag, updateFlag, loading } } = useSelector(({ company }: any) => company);
  const dispatch = useDispatch();
  const [isPublished, setIsPublished] = useState(0);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const userTokenData = _.get(sessionReducer, "currentUser", {});

  const isParentAdmin = (_.get(userTokenData, "parent_id", 0) === null) ? false : true;

  const videoClass = isParentAdmin ? "video-form-disabled" : "";

  useEffect(() => {
    // Registered location data
    register("location");
    register("location_json", {
      required: {
        value: true,
        message: "Please select location",
      }
    });

    //props.setButtonClick(handleButtonClick);
    dispatch(industryListRequest())
    dispatch(employeeSizeListRequest())
    dispatch(getCompanyDetailRequest())
  }, []);

  // Set the form data
  useEffect(() => {

    if (!_.isEmpty(companyUserData)) {
      setValue("company_name", _.get(companyProfileData, "company_name", ""));
      setValue("website", _.get(companyProfileData, "website", ""));
      setValue("who_we_are", _.get(companyProfileData, "who_we_are", ""));
      setValue("mission_and_vision", _.get(companyProfileData, "mission_and_vision", ""));
      setValue("diversity_and_inclusion", _.get(companyProfileData, "diversity_and_inclusion", ""));
      setValue("location", _.get(companyProfileData, "location", ""));
      setValue("location_json", _.get(companyProfileData, "location_json", ""));
      setLocation(_.get(companyProfileData, "location", ""));
    }

  }, [companyUserData]);

  // Set the form data
  useEffect(() => {

    if (companyProfileUpdateFlag === true || companyProfileUpdateFlag === false) {
      if (companyProfileUpdateFlag === true) {
        FlashMessage("Profile updated successfully");

        const formData = getValues();
        let updatedCompanyUserData = {
          ...formData,
          industry_id: _.get(getValues("industry_id"), "value", 0),
          employee_size_id: _.get(getValues("employee_size_id"), "value", 0),
        }

        updatedCompanyUserData = _.set(_.cloneDeep(companyUserData), "companyProfile", updatedCompanyUserData)

        dispatch(updateCompanyProfilePartiallyRequest({ ...updatedCompanyUserData }));
      } else if (companyProfileUpdateFlag === false) {

        if (typeof companyProfileUpdateErrors === "object" && !_.isEmpty(companyProfileUpdateErrors)) {

          for (const [fieldName, errMsg] of Object.entries(companyProfileUpdateErrors)) {
            setError(fieldName, { type: "manual", message: (errMsg as string) });
          }
        }

        // FlashMessage(companyProfileUpdateMessage, "error");
      }
      dispatch(updateCompanyProfileResetFlag());
      dispatch(navSaveButtonLoading(false));
    }

  }, [companyProfileUpdateFlag]);

  const onChangeLocation = (location) => {
    const fullLocation = [_.get(location, "city", ""), _.get(location, "region", ""), _.get(location, "country", "")].filter(l => l).join(", ");
    setValue("location", fullLocation);
    setLocation(fullLocation);
    setValue("location_json", JSON.stringify(location));

    if (!_.isEmpty(location)) {
      clearErrors("location_json")
    } else {
      setError("location_json", { type: "manual", message: "Please select location" });
    }
  }

  const onClearLocation = () => {
    if (_.isEmpty(_.get(companyProfileData, "location", "")) && _.isEmpty(_.get(companyProfileData, "location_json", ""))) {
      setValue("location", "");
      setValue("location_json", "");
      setError("location_json", { type: "manual", message: "Please select location" });
    } else {
      setValue("location", _.get(companyProfileData, "location", ""));
      setValue("location_json", _.get(companyProfileData, "location_json", ""));
    }
  }

  // Set Industry options
  useEffect(() => {

    if (!_.isEmpty(industryOptionsData) || !_.isEmpty(companyUserData)) {
      const finalOption = pluckFromArray(industryOptionsData, "id", "title", "value", "label");
      setIndustryOption(finalOption);

      const industryId = _.get(companyProfileData, "industry_id", 0);
      const selectedIndustry = _.chain(finalOption).find({ value: industryId }).value() || null;

      if (isParentAdmin) {
        setValue("industry_id", _.get(selectedIndustry, "label", ""));
      } else {
        setValue("industry_id", selectedIndustry);
      }
    }

  }, [industryOptionsData, companyUserData]);

  // Set Employee options
  useEffect(() => {

    if (!_.isEmpty(employeeSizeOptionsData) || !_.isEmpty(companyUserData)) {
      const finalOption = pluckFromArray(employeeSizeOptionsData, "id", "title", "value", "label");
      setEmployeeSizeOption(finalOption);

      const empSizeId = _.get(companyProfileData, "employee_size_id", 0);
      const selectedEmployeeSize = _.chain(finalOption).find({ value: empSizeId }).value() || null;
      if (isParentAdmin) {
        setValue("employee_size_id", _.get(selectedEmployeeSize, "label", ""));
      } else {
        setValue("employee_size_id", selectedEmployeeSize);
      }
    }

  }, [employeeSizeOptionsData, companyUserData]);

  useEffect(() => {
    if (isPublished === 1) {
      saveData()
      setIsPublished(0)
    }
  }, [isPublished]);

  const setProfilePreview = () => {
    // TODO not able to get the data from reducer hence have to add token - remove this in the future
    const slugName = _.get(userTokenData, "slug", "");
    if (slugName) {
      const win = window.open(appRoutes.companyPublicPageHome.generatePath(slugName), "_blank");
      win.focus();
    }
  }

  const saveData = () => {
    pageSubmitBtnRef.current.click();
  }

  const handleButtonClick = (type) => {
    switch (type) {
      case "Save":
        saveData()
        break;
      case "Publish":
        setIsPublished(1)
        break;
      case "Preview":
        setProfilePreview()
        break;
      default:
        break;
    }
  };

  const onSubmit = (formData, e) => {
    dispatch(updateCompanyProfileRequest({
      ...formData,
      employee_size_id: formData.employee_size_id.value,
      industry_id: formData.industry_id.value,
      is_public: isPublished,
    }));
    dispatch(navSaveButtonLoading(true));
  }

  return (
    <div className="company-page-form-container">
      <Scrollbars
        renderThumbHorizontal={() => <div />}
        renderView={({ children }) => (
          <div className="company-home-page-form">
            {children}
          </div>
        )}
        className="company-page-form-scroller"
      >
        {/* <Spinner visible={loading} loadingTip={""}> */}
        <div className="company-profile-intro">
          <CompanyBanner />
        </div>
        <form
          className={"page-home-form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {(loading) ? (
            <>
              <div className="mt-25" >
                <Grid container spacing={2} justify="center" text-align="center" alignItems="center" className="basic-info-form-wrap">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3">
                      <Skeleton />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3">
                      <Skeleton />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3">
                      <Skeleton />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3">
                      <Skeleton />
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h3">
                      <Skeleton />
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <Grid container spacing={2} justify="center" text-align="center" alignItems="stretch" className="professional-passions">
                <Grid item xs={12} sm={4}>
                  <Skeleton height={235} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton height={235} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton height={235} />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <div className="company-profile-form">
                <div className="page-form">
                  <div className="page-form-wrapper">
                    <Grid container spacing={2} xs={12}>
                      <Grid item xs={12} sm={4} md={4} lg={4} className="page-home-form-field">
                        <Input
                          name="company_name"
                          externalLabel={{ label: "Name" }}
                          validationObj={errors}
                          placeholder="Enter the company name"
                          inputRef={register({
                            required: {
                              value: true,
                              message: "Please enter company name",
                            },
                          })}
                          disabled={isParentAdmin}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} lg={4} className="page-home-form-field">
                        {
                          isParentAdmin ? (
                            <Input
                              name="industry_id"
                              placeholder="Select an industry"
                              externalLabel={{ label: "Industry" }}
                              validationObj={errors}
                              inputRef={register({
                                required: {
                                  value: true,
                                  message: "Please select an industry",
                                },
                              })}
                              disabled={isParentAdmin}
                            />
                          ) : (
                            <SelectNew
                              name="industry_id"
                              externalLabel={{ label: "Industry" }}
                              placeholder="Select an industry"
                              className="select-box"
                              options={industryOption}
                              isSearchable={true}
                              validationObj={errors}
                              control={control}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Please select an industry",
                                },
                                validate: (value) => !_.isEmpty(value) || "Please select an industry",
                              }}
                              isDisabled={isParentAdmin}
                              required={true}
                            />
                          )
                        }
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} lg={4} className={`job-form-field ${errors.location_json && "location-error"}`}>
                        <label className={"required"}>Location</label>
                        {
                          isParentAdmin ? (
                            <Input
                              name="location"
                              placeholder={_.get(companyProfileData, "location", location)}
                              validationObj={errors}
                              inputRef={register({
                                required: {
                                  value: true,
                                  message: "Please Select location",
                                },
                              })}
                              value={_.get(companyProfileData, "location", location)}
                              disabled={isParentAdmin}
                            />
                          ) : (
                            <Location
                              placeholder={_.get(companyProfileData, "location", location)}
                              onChangeCallback={onChangeLocation}
                              onClear={() => onClearLocation()}
                            />
                          )
                        }
                        {errors.location_json && (<FormHelperText error={true}>{_.get(errors, "location_json.message", "")}</FormHelperText>)}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} className="page-home-form-field">
                        {
                          isParentAdmin ? (
                            <Input
                              name="employee_size_id"
                              placeholder="Select number of employees"
                              externalLabel={{ label: "Size" }}
                              validationObj={errors}
                              inputRef={register({
                                required: {
                                  value: true,
                                  message: "Please Select number of employees",
                                },
                              })}
                              disabled={isParentAdmin}
                            />
                          ) : (
                            <SelectNew
                              name="employee_size_id"
                              externalLabel={{ label: "Size" }}
                              placeholder="Select number of employees"
                              className="select-box"
                              options={employeeSizeOption}
                              isSearchable={true}
                              validationObj={errors}
                              control={control}
                              rules={{
                                required: {
                                  value: true,
                                  message: "Please select number of employees",
                                },
                                validate: (value) => !_.isEmpty(value) || "Please select number of employees",
                              }}
                              isDisabled={isParentAdmin}
                              required={true}
                            />
                          )
                        }
                      </Grid>
                      <Grid item xs={12} sm={6} md={8} lg={8} className="job-form-field">
                        <Input
                          name="website"
                          placeholder="Enter a URL"
                          externalLabel={{ label: "Website" }}
                          validationObj={errors}
                          inputRef={register({
                            required: {
                              value: true,
                              message: "Please enter a valid URL",
                            },
                            // pattern: {
                            // 	value: /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                            // 	message: "Enter valid URL",
                            // },
                          })}
                          disabled={isParentAdmin}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field job-form-text-area">
                        <Input
                          name="who_we_are"
                          multiline
                          rows={6}
                          externalLabel={{ label: "Who We Are" }}
                          placeholder="Who We Are"
                          inputRef={register}
                          disabled={isParentAdmin}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field job-form-text-area">
                        <Input
                          name="mission_and_vision"
                          multiline
                          rows={6}
                          externalLabel={{ label: "Mission and Vision" }}
                          placeholder="Mission and Vision"
                          inputRef={register}
                          disabled={isParentAdmin}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field job-form-text-area">
                        <Input
                          name="diversity_and_inclusion"
                          multiline
                          rows={6}
                          externalLabel={{ label: "Diversity and Inclusion" }}
                          placeholder="Diversity and Inclusion"
                          inputRef={register}
                          disabled={isParentAdmin}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
              <button type="submit" ref={pageSubmitBtnRef} className="d-none"></button>
            </>
          )}
        </form>

        <div className="company-profile-leaders">
          <InputLabel>Company Leaders</InputLabel>
          <Grid container className="add-people-form" spacing={2} xs={12}>
            {[0, 1, 2, 3].map(row => (
              <LeaderProfile
                key={row}
                data={!_.isEmpty(companyPeopleData[row]) ? companyPeopleData[row] : {}}
                isParentAdmin={isParentAdmin}
              />
            ))}
          </Grid>
        </div>
        <div className="company-profile-videos">
          <div className={`page-form-video-wrapper ${videoClass}`}>
            <InputLabel>Company Videos</InputLabel>
            <Grid container spacing={2} xs={12}>
              {[0, 1, 2].map((videoId) => (
                <CompanyVideos
                  key={videoId}
                  videoId={videoId}
                  isParentAdmin={isParentAdmin}
                />
              ))}
            </Grid>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}
export default CompanyPrivateHome;
