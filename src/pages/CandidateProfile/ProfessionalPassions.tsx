import React from "react";
import { Input } from "../../components/common";

const ProfessionalPassions = (props) => {
  return (
    <div className="info-wrapper profession-passions-wrapper">
      <div>
        <Input
          name="profile[recent_life]"
          multiline={true}
          className="text-area"
          placeholder={"My recent career emphasizes on..."}
          validationObj={props.errors}
          // InputProps={{ className: classes.textArea }}
          inputRef={props.register({
            required: {
              value: true,
              message: "Please enter something about your recent career",
            },
            maxLength: {
              value: 1000,
              message: "Maximum text length exceeded",
            },
          })}
          externalLabel={{ label: "Recent Career" }}
        />
      </div>
      <div>
        <Input
          name="profile[mid_career]"
          multiline={true}
          placeholder={"My mid journey focused on..."}
          className="text-area"
          validationObj={props.errors}
          inputRef={props.register({
            required: {
              value: true,
              message: "Please enter something about your mid journey",
            },
            maxLength: {
              value: 1000,
              message: "Maximum text length exceeded",
            },
          })}
          externalLabel={{ label: "Mid Journey" }}
        />
      </div>
      <div>
        <Input
          name="profile[early_career]"
          placeholder="My earlier years exemplified..."
          multiline={true}
          className="text-area"
          validationObj={props.errors}
          inputRef={props.register({
            required: {
              value: true,
              message: "Please enter something about your earlier years",
            },
            maxLength: {
              value: 1000,
              message: "Maximum text length exceeded",
            },
          })}
          externalLabel={{ label: "Earlier Years" }}
        />
      </div>
    </div>
  );
};

export default ProfessionalPassions;
