import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Grid, FormHelperText, Typography } from "@material-ui/core";
import { isEmpty, isObject, get, find } from 'lodash';
import { Input, SelectNew } from "../../../../components/common";
import Location from "../../../../components/common/Location";
import { updateCompanyProfileRequest } from "../../../../reducers/company/companyProfile.reducer";
import { pluckFromArray } from "../../../../utils/helper";
import Skeleton from '@material-ui/lab/Skeleton';
import { rootReducersState } from "../../../../reducers";

const _ = { isEmpty, isObject, get, find };

type FormFields = {
  company_name: string;
  industry_id: string;
  location: string;
  location_json: string;
  employee_size_id: string;
  website: string;
  who_we_are: string;
  mission_and_vision: string;
  diversity_and_inclusion: string;
};

const Form = (props) => {

  const { register, handleSubmit, errors, control, setError, clearErrors, setValue } = useForm<FormFields>();
  const { refSave, is_published } = props;
  const [location, setLocation] = useState("");
  const [industryOption, setIndustryOption] = useState([]);
  const [employeeSizeOption, setEmployeeSizeOption] = useState([]);
  const [locationJson, setLocationJson] = useState({});
  const dispatch = useDispatch();

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const userData = _.get(sessionReducer, "currentUser", {});
  const isParentAdmin = _.get(userData, "parent_id", 0) === null;
  const { industries: { data: industryData } } = useSelector(({ industry }: any) => industry);
  const { list: { data: employeeSizeData } } = useSelector(({ employeeSize }: any) => employeeSize);
  const { companyProfile: { data: { companyProfile: detail }, loading } } = useSelector(({ company }: any) => company);

  useEffect(() => {
    if (!_.isEmpty(industryData)) {
      const setOption = pluckFromArray(industryData, 'id', 'title', 'value', 'label');
      setIndustryOption(setOption);
      // Set form data for industry
      const selectedIndustry = setOption.find(option => option.value === _.get(detail, "industry_id", 0)) || "";
      setValue("industry_id", selectedIndustry);
    }
  }, [detail, industryData]);

  useEffect(() => {
    if (!_.isEmpty(employeeSizeData)) {
      const setOption = pluckFromArray(employeeSizeData, 'id', 'title', 'value', 'label');
      setEmployeeSizeOption(setOption);

      // Set form data for industry
      const selectedSize = setOption.find(option => option.value === _.get(detail, "employee_size_id", 0)) || "";
      setValue("employee_size_id", selectedSize);
    }
  }, [employeeSizeData, detail]);

  const onChangeLocation = (loc) => {
    const city = _.get(loc, "city", "");
    const region = _.get(loc, "region", "");
    const country = _.get(loc, "country", "");
    const location = `${city}, ${region}, ${country}`;
    clearErrors("location");
    setLocation(location);
    setLocationJson(loc);
  };

  const onSubmit = (formData, e) => {

    const locationValue = _.get(detail, "location", "");
    const locationError = _.isEmpty(locationValue) ? !location : false;
    if (locationError) {
      setError('location', { type: "manual", message: 'Please select location.' });
      return false;
    }
    let payload = {
      website: _.get(formData, "website", ""),
      who_we_are: _.get(formData, "who_we_are", ""),
      company_name: _.get(formData, "company_name", ""),
      industry_id: _.get(formData, "industry_id.value", ""),
      mission_and_vision: _.get(formData, "mission_and_vision", ""),
      employee_size_id: _.get(formData, "employee_size_id.value", ""),
      diversity_and_inclusion: _.get(formData, "diversity_and_inclusion", ""),
      location: _.isEmpty(location) ? locationValue : location,
      is_public: is_published === null ? _.get(formData, "is_public", 0) : is_published,
      location_json: _.isEmpty(locationJson) ? _.get(detail, "location_json", "") : JSON.stringify(locationJson),
    };
    // dispatch(updateCompanyProfileRequest(payload));
  };

  return (
    loading ? (
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
      <div className="page-form">
        <div className="page-form-wrapper">
          {/* <form
            className={"page-home-form"}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          > */}
          <Grid container spacing={2} xs={12}>
            <Grid item xs={12} sm={4} md={4} lg={4} className="page-home-form-field">
              <Input
                name="company_name"
                externalLabel={{ label: "Name" }}
                validationObj={errors}
                defaultValue={_.get(detail, "company_name", "")}
                placeholder="Enter the company name"
                inputRef={props.register({
                  required: {
                    value: true,
                    message: "Please enter company name",
                  },
                })}
                disabled={!isParentAdmin}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className="page-home-form-field">
              <SelectNew
                name="industry_id"
                externalLabel={{ label: "Industry" }}
                placeholder="Select an industry"
                className="select-box"
                options={industryOption}
                isSearchable={false}
                validationObj={errors}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select an industry",
                  },
                }}
                disabled={!isParentAdmin}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field">
              <label className={"required"}>Location</label>
              <Location
                placeholder={_.get(detail, "location", undefined)}
                onChangeCallback={onChangeLocation}
              />
              {errors.location && (<FormHelperText error={true}>{_.get(errors, "location.message", "")}</FormHelperText>)}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} className="page-home-form-field">
              <SelectNew
                name="employee_size_id"
                externalLabel={{ label: "Size" }}
                placeholder="Select the number of employees"
                className="select-box"
                options={employeeSizeOption}
                isSearchable={false}
                validationObj={errors}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select number of employees",
                  },
                }}
                disabled={!isParentAdmin}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={8} className="job-form-field">
              <Input
                name="website"
                placeholder="Enter a URL"
                externalLabel={{ label: "Website" }}
                validationObj={errors}
                defaultValue={_.get(detail, "website", "")}
                inputRef={props.register({
                  required: {
                    value: true,
                    message: "Please enter a valid URL",
                  },
                  pattern: {
                    value:
                      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                    message: "Enter valid URL",
                  },
                })}
                disabled={!isParentAdmin}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field job-form-text-area">
              <Input
                name="who_we_are"
                multiline
                rows={6}
                defaultValue={_.get(detail, "who_we_are", "")}
                externalLabel={{ label: "Who We Are" }}
                placeholder="Who We Are"
                inputRef={props.register}
                disabled={!isParentAdmin}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field job-form-text-area">
              <Input
                name="mission_and_vision"
                multiline
                rows={6}
                defaultValue={_.get(detail, "mission_and_vision", "")}
                externalLabel={{ label: "Mission and Vision" }}
                placeholder="Mission and Vision"
                inputRef={props.register}
                disabled={!isParentAdmin}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} className="job-form-field job-form-text-area">
              <Input
                name="diversity_and_inclusion"
                multiline
                rows={6}
                defaultValue={_.get(detail, "diversity_and_inclusion", "")}
                externalLabel={{ label: "Diversity and Inclusion" }}
                placeholder="Job Title"
                inputRef={props.register}
                disabled={!isParentAdmin}
              />
            </Grid>
          </Grid>
          {/* <button
              type="submit"
              ref={refSave}
              className="home-page-form-save-btn"
            /> */}
          {/* </form> */}
        </div>
      </div>
    )
  );
}
export default Form;
