import React from "react";
import { ReactComponent as EditIcon } from "./icon.svg";
import { Controller } from "react-hook-form";

interface IEditableText {
  name: string;
  control: any;
  rules?: any;
  textProps?: any;
  inputClassName?: string;
  error?: any;
}

const EditableText = (props: IEditableText) => {
  const [isFocused, setFocused] = React.useState(false);
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ name, ref, value, onChange, onBlur }) => {
        return !isFocused ? (
          <>
            <div className="d-flex align-items-center">
              <input type="text" name={name} ref={ref} hidden />
              <p className="m-0" {...props.textProps}>
                {value}
              </p>

              <EditIcon
                className="ml-2"
                onClick={() => {
                  setFocused(true);
                }}
              />
            </div>
            {props.error && <span className="error-helper mt-2">{props.error.message}</span>}
          </>
        ) : (
          <input
            autoFocus
            className={props.inputClassName}
            name={name}
            ref={ref}
            onChange={onChange}
            value={value}
            onBlur={() => {
              if (value !== "") {
                setFocused(false);
                onBlur();
              }
            }}
          />
        );
      }}
    />
  );
};
export default EditableText;
