import React from 'react';
import { Controller } from "react-hook-form";
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { isEmpty, get, chain } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";
const _ = { isEmpty, get, chain };
// We will explicity destruct props which are not Mui props or want to manipulates. e.g. children etc...
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface SelectProps {
  // Primary props
  name: string;
  className?: string;
  variant?: "filled" | "outlined" | "standard";
  empty?: string;
  options?: SelectOptions;
  // Validation handling (NOTE: only supports react-hook-form for the moment)
  validationObj?: object;
  // other props of the component which directly used in component
  [key: string]: any;
}
interface SelectOptions {
  [index: string]: { value: any; label: any; disabled?: boolean };
}

const SelectTag = ({ name, control, variant, empty, options, className, validationObj, externalLabel, rules, ...props }: SelectProps) => {

  //  External label
  const ruleClass = (_.get(rules, "required.value", false)) ? "required" : "";
  const _externalLabel = (_.get(externalLabel, "label", "") || "");
  let externalLabelClass = (_.get(externalLabel, "className", "") || "");
  const externalLabelClasses = _.chain([ruleClass, externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();

  // Error message
  const errorMessage = _.get(validationObj, `${name}.message`, "");

  const _displayOptions = () => {

    if (Array.isArray(options) && options) {
      return options.map(o => <MenuItem value={o.key}>{o.value}</MenuItem>);
    }
  }

  return (
    <FormControl variant={variant} className={`eh-select ${className}`}>
      {(_externalLabel) && (<label htmlFor={name} className={externalLabelClasses}>{_externalLabel}</label>)}
      <Controller
        name={name}
        rules={(rules || {})}
        control={control}
        as={
          <Select
            displayEmpty
            autoWidth
            error={(_.get(validationObj, `${name}.type`, false)) && true}
            {...props}
          >
            {empty && (<MenuItem value="" disabled>{empty}</MenuItem>)}
            {_displayOptions()}
          </Select>

        }
      />
      {!_.isEmpty(errorMessage) && <ErrorTextHelper text={errorMessage} />}
    </FormControl>
  );

}

// Default props of the component
SelectTag.defaultProps = {
  variant: "outlined"
}

export default SelectTag;