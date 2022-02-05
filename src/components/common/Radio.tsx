import React from 'react';
import TextField from '@material-ui/core/TextField';
import RadioInput from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import InputMask from 'react-input-mask';
import { get, chain, isString, isEmpty } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";

const _ = { get, chain, isString, isEmpty };

// We will explicity destruct props which are not Mui props or want to manipulates
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface InputProps {
  // Primary props
  name: string;
  options: Array<RadioOptionsProp>;
  className?: string;
  inputRef?: any;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  radioPlacement?: 'inline' | 'block';


  // Validation handling (NOTE: only supports react-hook-form for the moment)
  validationObj?: object;
  externalLabel?: externalLabel;

  // other props of the component which directly used in component
  [key: string]: any;
}

interface RadioOptionsProp {
  label: string; value: string;
}

interface externalLabel {
  [key: string]: any;
}


// Radio inputs
const Radio = ({
  validationObj, options, externalLabel, labelClassName = "", wrapperClassName = "", labelPlacement = "start",
  inputRef, radioPlacement = "inline", ...props
}: InputProps): JSX.Element => {

  const inputRefClass = ((_.get(inputRef, "name", "") === "") && inputRef) ? "required" : "";

  //  External label
  const _externalLabel = (_.get(externalLabel, "label", "") || "");
  let externalLabelClass = (_.get(externalLabel, "className", "") || "");
  const externalLabelClasses = _.chain([inputRefClass, externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();

  // Other classes
  const elPlacement = radioPlacement === "inline" ? "" : "d-block";
  const labelClass = [labelClassName, elPlacement, "mr-3"].join(" ");
  const wrapperClass = [wrapperClassName, "radio-group"].join(" ");

  // Error message
  const errorMessage = _.get(validationObj, `${props.name}.message`, null);

  const defaultValue = ((!_.isEmpty(props.defaultValue)) ? { defaultValue: props.defaultValue } : {});

  return (
    <>
      {(_externalLabel) && (<label htmlFor={props.name} className={externalLabelClasses}>{_externalLabel}</label>)}
      <RadioGroup {...defaultValue} aria-label={props.name} name={props.name} className={wrapperClass}>
        {
          (options || []).map((opt: RadioOptionsProp, key: number) => {
            return (
              <FormControlLabel
                key={`${key}-${(opt.label || "")}-radio`}
                value={opt.value}
                control={(
                  <RadioInput
                    {...props}
                    inputRef={inputRef}
                    id={props.name}
                  />
                )}
                label={opt.label || ""}
                className={labelClass}
                labelPlacement={labelPlacement || ""}
              />
            )

          })
        }
        {errorMessage && (<ErrorTextHelper text={errorMessage} />)}
      </RadioGroup>
    </>
  );

}


export default Radio;
