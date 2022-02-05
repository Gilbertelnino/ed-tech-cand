import React from 'react';
import { isEmpty, get, chain } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";
import CheckboxMUI from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const _ = { isEmpty, get, chain };
// We will explicity destruct props which are not Mui props or want to manipulates. e.g. children etc...
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface CheckboxProps {
  // Primary props
  name: string;
  color?: "default" | "primary" | "secondary";
  // Validation handling (NOTE: only supports react-hook-form for the moment)
  validationObj?: object;
  // other props of the component which directly used in component
  [key: string]: any;
}

const Checkbox = ({ name, color, control, validationObj, externalLabel, rules, ...props }: CheckboxProps) => {

  //  External label
  const _externalLabel = (_.get(externalLabel, "label", "") || "");

  // Error message
  const errorMessage = _.get(validationObj, `${name}.message`, "");

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <CheckboxMUI
              {...props}
              name={name}
              color={color}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label={_externalLabel}
        />
        {!_.isEmpty(errorMessage) && <ErrorTextHelper text={errorMessage} />}
      </FormGroup>
    </>
  );

}

// Default props of the component
Checkbox.defaultProps = {
  color: "primary"
}

export default Checkbox;
