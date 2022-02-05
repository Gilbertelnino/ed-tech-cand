import React from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutline";
import { Button, IconButton, InputLabel } from "@material-ui/core";
import { Checkbox, Input } from "../../components/common";
import moment from "moment";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete-icon.svg";

const FormItem = ({ item, value, remove, index, ...props }) => (
  <div className="career-differentiators-form-item">
    <div className="career-differentiators-row">
      <div>
        <Input
          name={`projects[${index}].title`}
          placeholder="Project Title"
          externalLabel={{ label: "Project Title" }}
          defaultValue={item.title}
          validationObj={props.errors}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid Project Title",
            },
          })}
        />
      </div>
      <div>
        <Input
          name={`projects[${index}].link`}
          placeholder="Project URL"
          externalLabel={{ label: "Project URL" }}
          validationObj={props.errors}
          defaultValue={item.link}
          required={false}
          inputRef={props.register({
            required: {
              value: false,
              message: "Please enter a valid Project URL",
            },
            pattern: {
              value: /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g,
              message: "Enter a valid Project URL",
            },
          })}
        />
      </div>
      <div className="date-input">
        <div>
          <Input
            externalLabel={{ label: "Select Date" }}
            name={`projects[${index}].start_date`}
            placeholder="Work Experience"
            type="date"
            defaultValue={item.start_date}
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
            checked={value[index]?.is_present}
            externalLabel={{ label: "Present" }}
            name={`projects[${index}].is_present`}
          />
          {value[index]?.is_present ? (
            <InputLabel className="present-label">Present</InputLabel>
          ) : (
            <Input
              name={`projects[${index}].end_date`}
              defaultValue={item.end_date}
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
    <div>
      <Input
        name={`projects[${index}].description`}
        placeholder="Project Description"
        externalLabel={{ label: "Project Description" }}
        multiline={true}
        defaultValue={item.description}
        validationObj={props.errors}
        required={false}
        inputRef={props.register({
          required: {
            value: false,
            message: "Please enter a valid Project Description",
          },
          maxLength: {
            value: 500,
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
    name: "projects",
  });

  const value = useWatch({
    name: "projects",
    control,
  });

  const _handlePresentCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    const { checked } = e.target;
    if (checked) {
      props.setValue(`projects[${index}].end_date`, moment().format("YYYY-MM-DD"));
    } else {
      props.setValue(`projects[${index}].end_date`, "");
    }
  };

  return (
    <div>
      <div className="career-title">
        <h5>Projects</h5>
        <IconButton
          onClick={() => {
            append({
              link: "",
              title: "",
              end_date: "",
              start_date: "",
              description: "",
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
