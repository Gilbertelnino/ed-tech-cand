import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { get, chain, isString } from "lodash";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const _ = { get, chain, isString };

// We will explicity destruct props which are not Mui props or want to manipulates
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface InputProps {
  // Primary props
  name: string;
  className?: string;
  type?: "text" | "email" | "password" | "file" | "date";
  variant?: "filled" | "outlined" | "standard";
  size?: "small" | "medium";
  isPassword?: true | false; // Whether input should show/hide password characters
  fullWidth?: true | false;
  multiline?: true | false;
  inputRef?: any;
  mask?: string;

  // Validation handling (NOTE: only supports react-hook-form for the moment)
  validationObj?: object;
  externalLabel?: externalLabel;

  // other props of the component which directly used in component
  [key: string]: any;
}

interface externalLabel {
  [key: string]: any;
}

const Input = ({ validationObj, externalLabel, mask, inputRef, isPassword, type, ...props }: InputProps) => {

  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);

  let inputRefClass = ((_.get(inputRef, "name", "") === "") && inputRef) ? "required" : "";
  const isRequired = _.get(props, "required", "");
  if (isRequired === false) {
    inputRefClass = "";
  }
  //  External label
  const _externalLabel = (_.get(externalLabel, "label", "") || "");
  let externalLabelClass = (_.get(externalLabel, "className", "") || "");
  const externalLabelClasses = _.chain([inputRefClass, externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();
  const inputMask = _.isString(mask) ? mask : "";

  const _renderPasswordIcon = () => {

    if (type === "password") {
      return {
        endAdornment: (showPassword ? (
          <Visibility className="password-eye-icon" onClick={() => {
            setShowPassword(false);
            setInputType("password");
          }} />
        ) : (
          <VisibilityOff className="password-eye-icon" onClick={() => {
            setShowPassword(true);
            setInputType("text");
          }} />
        ))
      }
    } else {
      return {}
    }
  }

  const renderInput = (props: any) => {

    return (
      <TextField

        // To override these property pass it in props of controller
        
        // Regular props
        {...props}
        InputProps={{...props.InputProps,..._renderPasswordIcon()}}
        id={props.name}
        type={inputType}
        error={(_.get(validationObj, `${_.get(props, "name", "")}.type`, false)) && true}
        helperText={(_.get(validationObj, `${_.get(props, "name", "")}.message`, null)) && _.get(validationObj, `${props.name}.message`, null)}
      />
    )
  }

  return (
    <>
      {(_externalLabel) && (<label htmlFor={props.name} className={externalLabelClasses}>{_externalLabel}</label>)}
      {inputMask !== "" ? (
        // @ts-ignore
        <InputMask
          mask={inputMask}
          {...props}
        >
          {(inputProps: any) => renderInput({ ...inputProps, inputRef })}
        </InputMask>
      ) : (
        renderInput({ ...props, inputRef })
      )}
    </>
  );

}

// Default props of the component
Input.defaultProps = {
  type: "text",
  variant: "outlined",
  size: "small",
  fullWidth: true,
}

export default Input;
