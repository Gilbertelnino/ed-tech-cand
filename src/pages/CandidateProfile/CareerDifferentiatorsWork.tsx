import React from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutline";
import { Button, IconButton, InputLabel } from "@material-ui/core";
import moment from "moment";
import { Checkbox, Input } from "../../components/common";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete-icon.svg";

const FormItem = ({ item, index, value, remove, ...props }) => (
  <div className="career-differentiators-form-item">
    <div className="career-differentiators-row">
      <div>
        <Input
          name={`experiences[${index}].job_position`}
          placeholder="Title"
          externalLabel={{ label: "Job Title" }}
          defaultValue={item.job_position}
          validationObj={props.errors}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid Job Title",
            },
          })}
        />
      </div>
      <div>
        <Input
          name={`experiences[${index}].company_name`}
          placeholder="Name"
          externalLabel={{ label: "Company Name" }}
          validationObj={props.errors}
          defaultValue={item.company_name}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid Project",
            },
          })}
        />
      </div>
      <div className="date-input">
        <div>
          <Input
            externalLabel={{ label: "Select Date" }}
            name={`experiences[${index}].job_started`}
            placeholder="Work Experience"
            type="date"
            defaultValue={item.job_started}
            validationObj={props.errors}
            required={false}
            inputRef={props.register({
              required: {
                value: false,
                message: "Please enter a valid Work Experience",
              },
            })}
          />
        </div>
        <div>
          <Checkbox
            onChange={(e) => props._handlePresentCheckBoxChange(e, index)}
            inputRef={props.register}
            externalLabel={{ label: "Present" }}
            checked={value[index]?.is_present}
            name={`experiences[${index}].is_present`}
          />
          {value[index]?.is_present ? (
            <InputLabel className="present-label">Present</InputLabel>
          ) : (
            <Input
              name={`experiences[${index}].job_ended`}
              placeholder="early career"
              type="date"
              defaultValue={item.job_ended}
              validationObj={props.errors}
              required={false}
              inputRef={props.register({
                required: {
                  value: false,
                  message: "Please enter a valid Date",
                },
              })}
            />
          )}
        </div>
      </div>
    </div>
    <div>
      <Input
        name={`experiences[${index}].description`}
        placeholder="Job Description"
        externalLabel={{ label: "Job Description" }}
        multiline={true}
        defaultValue={item.description}
        validationObj={props.errors}
        required={false}
        inputRef={props.register({
          required: {
            value: false,
            message: "Please enter a valid job Description",
          },
          maxLength: {
            value: 1000,
            message: "Maximum text length exceeded",
          },
        })}
      />
    </div>
    <div className="delete-icon-wrapper">
      <Button onClick={() => remove(index)} variant="text" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </div>
  </div>
);

const CareerDifferentiatorsWork: React.FC<any> = (props) => {
  const control: Control<Record<string, any>> = props.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  const value = useWatch({
    name: "experiences",
    control,
  });
  const _handlePresentCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    const { checked } = e.target;
    if (checked) {
      props.setValue(`experiences[${index}].job_ended`, moment().format("YYYY-MM-DD"));
    } else {
      props.setValue(`experiences[${index}].job_ended`, "");
    }
  };

  return (
    <div>
      <div className="career-title">
        <h5>Work Experience</h5>
        <IconButton
          onClick={() => {
            append({
              is_current_job: false,
              job_position: "",
              description: "",
              company_name: "",
              job_location: "",
              job_started: "",
              job_ended: "",
              is_present: true,
            });
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      {fields.map((item, index) => {
        return (
          <FormItem
            value={value}
            key={item.id}
            _handlePresentCheckBoxChange={_handlePresentCheckBoxChange}
            item={item}
            index={index}
            remove={remove}
            {...props}
          />
        );
      })}
    </div>
  );
};

export default CareerDifferentiatorsWork;
