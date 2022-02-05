import React from "react";
import { Button, IconButton, InputLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutline";
import moment from "moment";
import { Checkbox, Input } from "../../components/common";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete-icon.svg";

const FormItem = ({ item, value, remove, index, ...props }) => (
  <div className="career-differentiators-form-item education-form-item">
    <div className="career-differentiators-row education-form-row">
      <div>
        <Input
          name={`education[${index}].institute_name`}
          placeholder="Name"
          externalLabel={{ label: "Institution Name" }}
          defaultValue={item.institute_name}
          validationObj={props.errors}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid Institution Name",
            },
          })}
        />
      </div>
      <div className="date-input">
        <div>
          <Input
            externalLabel={{ label: "Select Date" }}
            name={`education[${index}].degree_from`}
            placeholder="Start Date"
            type="date"
            defaultValue={item.degree_from}
            validationObj={props.errors}
            required={false}
            inputRef={props.register({
              required: {
                value: false,
                message: "Please enter a valid Date",
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
            name={`education[${index}].is_present`}
          />
          {value[index].is_present ? (
            <InputLabel className="present-label">Present</InputLabel>
          ) : (
            <Input
              name={`education[${index}].degree_to`}
              defaultValue={item.degree_to}
              placeholder="End date"
              type="date"
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

    <div className="career-differentiators-row education-form-row">
      <div>
        <Input
          name={`education[${index}].field_of_study`}
          placeholder="Field of study"
          externalLabel={{ label: "Field of Study" }}
          validationObj={props.errors}
          defaultValue={item.degree_title}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid field of study",
            },
          })}
        />
      </div>
      <div>
        <Input
          name={`education[${index}].degree_title`}
          placeholder="Degree"
          externalLabel={{ label: "Degree" }}
          validationObj={props.errors}
          defaultValue={item.field_of_study}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid degree",
            },
          })}
        />
      </div>
    </div>
    <div className="delete-icon-wrapper">
      <Button onClick={() => remove(index)} variant="text" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </div>
  </div>
);
function _Education(props) {
  const control: Control<Record<string, any>> = props.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const value = useWatch({
    name: "education",
    control,
  });

  const _handlePresentCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    const { checked } = e.target;
    if (checked) {
      props.setValue(`education[${index}].degree_to`, moment().format("YYYY-MM-DD"));
    } else {
      props.setValue(`education[${index}].degree_to`, "");
    }
  };

  return (
    <div className="info-wrapper career-differentiators-wrapper education-form-wrapper">
      <div className="career-title">
        <h5>Education</h5>
        <IconButton
          onClick={() => {
            append({
              degree_title: "",
              institute_name: "",
              degree_from: "",
              degree_to: "",
              field_of_study: "",
              is_present: false,
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
            item={item}
            _handlePresentCheckBoxChange={_handlePresentCheckBoxChange}
            index={index}
            remove={remove}
            {...props}
          />
        );
      })}
    </div>
  );
}

export default _Education;
