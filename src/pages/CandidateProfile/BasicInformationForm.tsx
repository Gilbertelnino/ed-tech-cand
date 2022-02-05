import React from "react";
import { FormHelperText } from "@material-ui/core";
import _ from "lodash";
import PhotoUploadForm from "./PhotoUploadForm";
import Location from "../../components/common/Location";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { Input, SelectNew, EditableText,Radio, Checkbox } from "../../components/common";
import { LocationInput } from "../../types/location.types";
import { WorkStatusType } from "../../utils/appConstants";
import { ReactComponent as StarIcon } from "./images/star.svg";

const _BasicInformation: React.FC<any> = (props) => {
  const { errors } = props;
  const _handleLocationChange = (locationInput: LocationInput) => {
    if (typeof props.handleLocationChange === "function") {
      props.handleLocationChange(locationInput);
    }
  };
  return (
    <div className="info-wrapper basic-info-wrapper">
      <div className="user-info-row">
        <div className="user-img-col">
          <PhotoUploadForm
            profileImageUrl={_.get(props, "profile.profile_image", "")}
            uploadPhoto={(file, type) => props.uploadPhoto(file, type)}
            isUploading={props.isUploading}
            picturePath={props.picturePath}
          />
        </div>
        <div className="user-info-col">
          <div className="d-flex user-name">
            <div>
              <EditableText
                inputClassName="editable-input"
                control={props.control}
                name="name"
                error={errors.name}
                rules={{
                  required: { value: true, message: "Name is required" },
                  pattern: { value: /^[a-zA-Z]+( [a-zA-Z]+)+$/, message: "Last name is required" },
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <p className="about">A handy Lorem Ipsum Generator that.</p>
            <div>
              <div className="d-flex email-phone">
                {!_.isUndefined(errors.email) && <ReportProblemIcon className="problem-icon" />}
                <strong>E-mail :</strong>
                <p className="m-0" {...props.textProps}>
                  {_.get(props, "profile.email", "")}
                </p>
              </div>
              <div className="d-flex email-phone mt-3">
                {!_.isUndefined(errors.phone) && <ReportProblemIcon className="problem-icon" />}
                <strong>Phone :</strong>
                <EditableText
                  inputClassName="editable-input"
                  control={props.control}
                  name="contact_info"
                  error={errors.contact_info}
                  rules={{ required: { value: true, message: "Phone is required" } }}
                />
              </div>
            </div>
          </div>
          <div className="access-level">
            <StarIcon />
            <p>Super Admin</p>
          </div>
        </div>
      </div>
      <div className="user-job-info-row">
        <div className="user-job-inputs">
          <div>
            <label className={"required"}>Job Location</label>
            <Location placeholder={_.get(props, "profile.profile.job_location", "") || undefined} onChangeCallback={_handleLocationChange} />
            {_.get(props, "errors.profile.profile.job_location_json", null) && (
              <FormHelperText error={true}>{_.get(props, "errors.profile.profile.job_location_json.message", "")}</FormHelperText>
            )}
          </div>
          <div>
            <SelectNew
              name="profile[work_status]"
              externalLabel={{ label: "Work Status" }}
              placeholder="Work Status"
              defaultValue={{
                value: _.get(props, "profile.profile.work_status", ""),
                label: _.get(props, "profile.profile.work_status", ""),
              }}
              options={WorkStatusType}
              validationObj={props.errors}
              control={props.control}
              required={true}
              rules={{
                required: {
                  value: true,
                  message: "Please select work status",
                },
              }}
            />
          </div>
          <div>
            <Input
              name="profile[job_title]"
              placeholder="E.g., UX Designer, Product Designer"
              validationObj={props.errors}
              inputRef={props.register({
                required: {
                  value: true,
                  message: "Please enter a valid job title",
                },
              })}
              externalLabel={{ label: "Job Titles" }}
            />
          </div>
        </div>
      </div>
      <div className={`user-job-remote-row ${!_.isUndefined(props?.errors?.profile?.open_to) && "error-radio"}`}>
        <Checkbox
          name="profile[open_to_remote]"
          externalLabel={{ label: "Open to remote opportunities" }}
          color="primary"
          inputRef={props.register()}
          defaultChecked={props.watch("profile[open_to_remote]")}
        />
        <Checkbox
          name="profile[open_to_other]"
          externalLabel={{ label: "Open to other opportunities" }}
          color="primary"
          inputRef={props.register()}
          defaultChecked={props.watch("profile[open_to_other]")}
        />
      </div>
      <div className="user-pv-row">
        <Input
          name="profile[personal_values]"
          placeholder="Share about yourself in the simplest form. What makes you unique?"
          multiline={true}
          validationObj={props.errors}
          inputRef={props.register({
            maxLength: {
              value: 200,
              message: "Maximum text length exceeded",
            },
            required: {
              value: true,
              message: "Please enter about your personal values",
            },
          })}
          externalLabel={{ label: "Personal Values" }}
        />
      </div>
    </div>
  );
};

export default _BasicInformation;
