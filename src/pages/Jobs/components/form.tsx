import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Modal, Button, SelectNew } from "../../../components/common";
import { Grid, InputLabel } from "@material-ui/core";
import Location from "../../../components/common/Location";
import { pluckFromArray } from "../../../utils/helper";
import { get, isEmpty, forEach, find, isObject } from "lodash";
import TextEditor from "../../../../src/components/common/TextEditor";
import { createJobRequest, updateJobRequest, jobTypesRequest, jobLevelsRequest, salaryRangesRequest, jobStatusRequest, jobDepartmentListRequest } from "../../../../src/reducers/job/jobs.reducer";
import { currencyListRequest } from "../../../../src/reducers/currency/currency.reducer";
import { jobSalaryTerms } from "../../../../src/utils/appConstants";
import Radio from "../../../components/common/Radio";

const _ = { get, isEmpty, forEach, find, isObject };

type Inputs = {
  title: string;
  type: string;
  location: string;
  level: string;
  salary_range: string;
  currency_id: string;
  min_salary: number;
  max_salary: number;
  salary_term: string;
  description: boolean;
  status: string;
  remote: string;
  department_id: string;
  min_exp: number;
  max_exp: number;
};

const Form = (props) => {

  const { saveLoading, loading, open, handleClose } = props;
  const dispatch = useDispatch();
  const { jobs: { detail, jobTypes, jobStatuses, jobLevels, salaryRanges, errors: jobErrors } } = useSelector(({ job }) => job);
  const jobDepartments = useSelector(({ job })=>_.get(job,"jobs.jobDepartments.data",[]));
  const { currencies: { data: currencyList } } = useSelector(({ currency }) => currency);
  const [jobTypeOption, setJobTypeOption] = useState([]);
  const [jobStatusOption, setJobStatusOption] = useState([]);
  const [jobLevelOption, setJobLevelOption] = useState([]);
  const [currencyOption, setcurrencyOption] = useState([]);
  const [departmentOptions, setDepartmentOption] = useState([]);
  const [locationJson, setLocationJson] = useState({});
  const [location, setLocation] = useState("");
  const { register, handleSubmit, errors, setError, reset: resetFormValues, clearErrors, getValues, setValue, control, watch } = useForm<Inputs>();
  const watchMaxSalary = watch('max_salary');
  const watchMinSalary = watch('min_salary');
  const watchMaxExp = watch('max_exp');
  const watchMinExp = watch('min_exp');

  useEffect(() => {
    _.isEmpty(jobTypes) && dispatch(jobTypesRequest());
    _.isEmpty(jobLevels) && dispatch(jobLevelsRequest());
    _.isEmpty(jobStatuses) && dispatch(jobStatusRequest());
    _.isEmpty(salaryRanges) && dispatch(salaryRangesRequest());
    _.isEmpty(currencyList) && dispatch(currencyListRequest());
    _.isEmpty(departmentOptions) && dispatch(jobDepartmentListRequest());
  }, []);

  //Hook for set maximum salary validation.
  useEffect(() => {
    if (!_.isEmpty(watchMaxSalary)) {
      const minSalary = getValues('min_salary') || 0;
      if (parseInt(watchMaxSalary) < 0) {
        setValue('max_salary', 0);
      } else if (parseInt(watchMaxSalary) < parseInt(minSalary) && parseInt(minSalary) !== 0) {
        setError("max_salary", { type: "manual", message: "Must be greater than Min. salary" });
      } else {
        clearErrors("max_salary");
        clearErrors("min_salary");
      }
    }
  }, [watchMaxSalary]);

  //Hook for set minimum salary validation.
  useEffect(() => {
    if (!_.isEmpty(watchMinSalary)) {
      const maxSalary = getValues('max_salary') || 0;

      if (parseInt(watchMinSalary) < 0) {
        setValue('min_salary', 0);
      } else if (parseInt(watchMinSalary) > parseInt(maxSalary) && parseInt(maxSalary) !== 0) {
        setError("min_salary", { type: "manual", message: "Must be less than Max. salary" });
      } else {
        clearErrors("min_salary");
        clearErrors("max_salary");
      }
    }
  }, [watchMinSalary]);

  //Hook for set maximum exp validation.
  useEffect(() => {
    if (!_.isEmpty(watchMaxExp)) {
      const minExp = getValues('min_exp') || 0;
      if ((watchMaxExp) < 0) {
        setValue('max_exp', 0);
      } else if ((watchMaxExp) < (minExp) && (minExp) !== 0) {
        setError("max_exp", { type: "manual", message: "Must be greater than Min. exp" });
      } else {
        clearErrors("max_exp");
        clearErrors("min_exp");
      }
    }
  }, [watchMaxExp]);

  //Hook for set minimum exp validation.
  useEffect(() => {
    if (!_.isEmpty(watchMinExp)) {
      const maxExp = getValues('max_exp') || 0;

      if ((watchMinExp) < 0) {
        setValue('min_exp', 0);
      } else if ((watchMinExp) > (maxExp) && (maxExp) !== 0) {
        setError("min_exp", { type: "manual", message: "Must be less than Max. exp" });
      } else {
        clearErrors("min_exp");
        clearErrors("max_exp");
      }
    }
  }, [watchMinExp]);

  useEffect(() => {
    if (!_.isEmpty(detail)) {
      const selectedJobType = jobTypeOption.find(option => option.value === _.get(detail, "type", 0));
      setValue("type", selectedJobType);
      const selectedSalaryTerm = jobSalaryTerms.find(option => option.value === _.get(detail, "salary_term", ""));
      setValue("salary_term", selectedSalaryTerm);
      const selectedJobLevel = jobLevelOption.find(option => option.value === _.get(detail, "level", 0));
      setValue("level", selectedJobLevel);
      const selectedCurrency = currencyOption.find(option => option.value === _.get(detail, "currency.id", 0));
      setValue("currency_id", selectedCurrency);
      const selectedJobStatus = jobStatusOption.find(option => option.value === _.get(detail, "status", 0));
      setValue("status", selectedJobStatus);
      const selectedJobDepartment = departmentOptions.find(option => option.value === _.get(detail, "jobDepartment.id", 0));
      setValue("department_id", selectedJobDepartment);
    }
  }, [detail]);

  useEffect(() => {
    if (!_.isEmpty(currencyList)) {
      const setCurrencyOptions = pluckFromArray(currencyList, "id", "code", 'value', 'label');
      setcurrencyOption(setCurrencyOptions);
      const selectedCurrency = setCurrencyOptions.find(option => option.value === _.get(detail, "currency_id", 0));
      setValue("currency_id", selectedCurrency);
    }
  }, [currencyList]);

  useEffect(() => {
    if (!_.isEmpty(jobDepartments)) {
      const setDepartmentOptions = pluckFromArray(jobDepartments, "id", "title", 'value', 'label');
      setDepartmentOption(setDepartmentOptions);
      const selectedDepartment = setDepartmentOptions.find(option => option.value === _.get(detail, "jobDepartment", 0));
      setValue("department_id", selectedDepartment);
    }
  }, [jobDepartments]);

  useEffect(() => {
    if (!_.isEmpty(jobTypes)) {
      const setJobTypeOptions = pluckFromArray(jobTypes, "id", "title", 'value', 'label');
      setJobTypeOption(setJobTypeOptions);
      const selectedJobType = setJobTypeOptions.find(option => option.value === _.get(detail, "type", 0));
      setValue("type", selectedJobType);
    }
  }, [jobTypes]);

  useEffect(() => {
    if (!_.isEmpty(jobStatuses)) {
      const setJobStatusOptions = pluckFromArray(jobStatuses, "id", "title", 'value', 'label');
      setJobStatusOption(setJobStatusOptions);
      const selectedJobStatus = setJobStatusOptions.find(option => option.value === _.get(detail, "status", 1));
      setValue("status", selectedJobStatus);
    }
  }, [jobStatuses]);

  useEffect(() => {
    if (!_.isEmpty(jobLevels)) {
      const setJobLevelOptions = pluckFromArray(jobLevels, "id", "title", 'value', 'label');
      setJobLevelOption(setJobLevelOptions);
      const selectedJobLevel = setJobLevelOptions.find(option => option.value === _.get(detail, "salary_range", 0));
      setValue("level", selectedJobLevel);
    }
  }, [jobLevels]);

  const onChangeLocation = (loc) => {
    const city = _.get(loc, "city", "");
    const region = _.get(loc, "region", "");
    const country = _.get(loc, "country", "");
    const location = `${city}, ${region}, ${country}`;
    setLocation(location);
    setLocationJson(loc);
    clearErrors("location");
  };

  // Job error Hook
  useEffect(() => {
    _.forEach(jobErrors, (value, key: any) => {
      setError(key, { type: "manual", message: value });
    });
  }, [jobErrors]);

  const onSubmit = (formData, e) => {
    const is_draft = _.get(e, "nativeEvent.submitter.value", "");
    const _id = _.get(formData, "id", "0");
    const type = _.get(formData, "type", "");
    const leval = _.get(formData, "level", 0);
    const status = _.get(formData, "status", 1);
    const currency = _.get(formData, "currency_id", 0);
    const salaryTerm = _.get(formData, "salary_term", "");
    const department = _.get(formData, "department_id", 0);
    let payload = {
      title: _.get(formData, "title", ""),
      description: _.get(formData, "description", ""),
      type: _.isObject(type) ? _.get(type, "value", 0) : type,
      location: location || _.get(detail, "location", ""),
      location_json: _.isEmpty(locationJson) ? _.get(detail, "location_json", "") : JSON.stringify(locationJson),
      level: _.isObject(leval) ? _.get(leval, "value", 0) : leval,
      max_salary: parseInt(_.get(formData, "max_salary", 0)),
      min_salary: parseInt(_.get(formData, "min_salary", 0)),
      status: _.isObject(status) ? _.get(status, "value", 0) : status,
      currency_id: _.isObject(currency) ? _.get(currency, "value", 0) : currency,
      salary_term: _.isObject(salaryTerm) ? _.get(salaryTerm, "value", "") : salaryTerm,
      is_archived: 0,
      is_public: is_draft === "is_draft" ? "0" : "1",
      is_remote: parseInt(_.get(formData, "remote", "0")),
      job_department_id: _.get(department, "value", 0),
      max_experience: parseInt(_.get(formData, "max_exp", 0)),
      min_experience: parseInt(_.get(formData, "min_exp", 0)),
    };

    if (_id === "0") {
      dispatch(createJobRequest(payload));
    } else {
      payload = { ...payload, id: _id };
      dispatch(updateJobRequest(payload));
    }
  };

  const validateForm = () => {
    const isLocationSelected = location || _.get(detail, "location", "");
    if (_.isEmpty(isLocationSelected)) {
      setError("location", { type: "manual", message: "Please select location" });
    } else {
      clearErrors("location");
    }
  }

  const _handleCloseModal = () => {

    if (typeof handleClose === "function") {
      handleClose();

      resetFormValues({});
    }
  }

  const modalTitle = _.isEmpty(detail) ? "Add new Job" : "Update a Job";

  return (
    <Modal
      visible={open}
      size="x-large"
      title={modalTitle}
      loading={loading}
      className="job-add-modal"
      closeButton={open}
      onClose={() => _handleCloseModal()}
    >
      <div className="job-form-wrapper slim-scrollbar">
        <form
          className={"job-form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="id"
            defaultValue={detail.id || 0}
            className="job-id"
            inputRef={register}
          />
          <Grid container xs={12}>
            <Grid container xs={12} sm={12} md={4} lg={4} className="add-job-left">
              <Grid item spacing={2} xs={12} className="job-form-field">
                <Input
                  name="title"
                  externalLabel={{ label: "Job Title" }}
                  placeholder="Job Title"
                  validationObj={errors}
                  defaultValue={_.get(detail, "title", "")}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please enter job title",
                    },
                  })}
                />
              </Grid>
              <Grid item spacing={2} xs={12} className="job-form-field">
                <SelectNew
                  name="type"
                  externalLabel={{ label: "Job Type" }}
                  placeholder="Select job type"
                  className="select-box"
                  options={jobTypeOption}
                  isSearchable={false}
                  validationObj={errors}
                  control={control}
                  required={true}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select an industry",
                    },
                  }}
                />
              </Grid>
              <Grid item spacing={2} xs={12} className="job-form-field">
                <label className={"required"}>Job Location</label>
                <Location
                  placeholder={detail.location || undefined}
                  onChangeCallback={onChangeLocation}
                />
                {errors.location && <p className="MuiFormHelperText-root Mui-error"> {_.get(errors, 'location.message', '')} </p>}
              </Grid>
              <Grid item xs={12}>
                <Radio 
                  name="remote"
                  externalLabel={{ label: "Remote" }}
                  validationObj={errors}
                  defaultValue={_.get(detail, "is_remote", "0")}
                  onChange={(e) =>  setValue("remote", _.get(e, "target.value", ""))}
                  options={[
                    { label:"Yes", value: "1"},
                    { label:"No", value: "0"}
                  ]}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please select remote choice",
                    },
                  })}
                  />
              </Grid>
              <Grid item spacing={2} xs={12} sm={_.isEmpty(detail) ? 12 : 6} className="job-form-field">
                <SelectNew
                  name="level"
                  externalLabel={{ label: "Job Level" }}
                  placeholder="Select job level"
                  className="select-box"
                  options={jobLevelOption}
                  defaultValue={_.find(jobLevelOption, { 'value': _.get(detail, "level", 0) })}
                  isSearchable={false}
                  validationObj={errors}
                  control={control}
                  required={true}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select job level",
                    },
                  }}
                />
              </Grid>
              <Grid item spacing={2} xs={12} sm={_.isEmpty(detail) ? 12 : 6} className="job-form-field">
                <SelectNew
                  name="department_id"
                  externalLabel={{ label: "Job Department" }}
                  placeholder="Select job department"
                  className="select-box"
                  options={departmentOptions}
                  isSearchable={false}
                  validationObj={errors}
                  control={control}
                  required={true}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select job department",
                    },
                  }}
                />
              </Grid>
              {!_.isEmpty(detail) && (
                <Grid item spacing={2} xs={12} sm={6} className="job-form-field job-status-wrapper">
                  <SelectNew
                    name="status"
                    externalLabel={{ label: "Status" }}
                    placeholder="Select job status"
                    className="select-box"
                    options={jobStatusOption}
                    isSearchable={false}
                    validationObj={errors}
                    control={control}
                    required={true}
                    rules={{
                      required: {
                        value: true,
                        message: "Please select job status",
                      },
                    }}
                  />
                </Grid>
              )}
              <Grid item spacing={2} xs={12} sm={6} className="job-form-field">
                <SelectNew
                  name="currency_id"
                  externalLabel={{ label: "Select Currency" }}
                  placeholder="Currency"
                  className="select-box"
                  options={currencyOption}
                  isSearchable={false}
                  validationObj={errors}
                  control={control}
                  required={true}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select currency",
                    },
                  }}
                />
              </Grid>
              <Grid item spacing={2} xs={12} sm={6} className="job-form-field salary-term-wrapper">
                <SelectNew
                  name="salary_term"
                  externalLabel={{ label: "Salary Term" }}
                  placeholder="Term"
                  className="select-box"
                  options={jobSalaryTerms}
                  // defaultValue={_.find(jobSalaryTerms, { 'value': _.get(detail, "salary_term", "") })}
                  isSearchable={false}
                  validationObj={errors}
                  control={control}
                  required={true}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select term",
                    },
                  }}
                />
              </Grid>
              <Grid item spacing={2} xs={12} sm={6} className="job-form-field">
                <Input
                  name="min_salary"
                  type="number"
                  min={0}
                  externalLabel={{ label: "Min Salary" }}
                  placeholder="Min"
                  validationObj={errors}
                  defaultValue={_.get(detail, "min_salary", "")}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please enter minimum amount",
                    },
                  })}
                />
              </Grid>
              <Grid item spacing={2} xs={12} sm={6} className="job-form-field salary-range-wrapper">
                <Input
                  name="max_salary"
                  type="number"
                  min={0}
                  externalLabel={{ label: "Max Salary" }}
                  placeholder="Max"
                  validationObj={errors}
                  defaultValue={_.get(detail, "max_salary", "")}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please enter maximum amount",
                    }
                  })}
                />
              </Grid>
              <Grid item spacing={2} xs={12} sm={6} className="job-form-field">
                <Input
                  name="min_exp"
                  type="number"
                  min={0}
                  externalLabel={{ label: "Min Experience" }}
                  placeholder="Min"
                  validationObj={errors}
                  defaultValue={_.get(detail, "min_experience", "")}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please enter minimum amount",
                    },
                  })}
                />
              </Grid>
              <Grid item spacing={2} xs={12} sm={6} className="job-form-field salary-range-wrapper">
                <Input
                  name="max_exp"
                  type="number"
                  min={0}
                  externalLabel={{ label: "Max Experience" }}
                  placeholder="Max"
                  validationObj={errors}
                  defaultValue={_.get(detail, "max_experience", "")}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please enter maximum amount",
                    }
                  })}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} sm={12} md={8} lg={8} className="add-job-right">
              <Grid item spacing={2} xs={12}>
                <TextEditor
                  name="description"
                  defaultValue={_.get(detail, "description", "")}
                  className="job-description slim-scrollbar"
                  externalLabel={{
                    label: "Job Description",
                    className: "required",
                  }}
                  placeholder="Enter Job Description"
                  validationObj={errors}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Please enter job description",
                    },
                  })}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className="text-center mt-10">
              <Button
                type="submit"
                color="light-green"
                loading={saveLoading}
                className="post-job-btn"
                onClick={() => validateForm()}
              >
                Post this job
              </Button>
              <Button
                type="submit"
                value="is_draft"
                disabled={saveLoading}
                className="btn-save-darft"
                onClick={() => validateForm()}
              >
                Save as Draft
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

export default Form;
