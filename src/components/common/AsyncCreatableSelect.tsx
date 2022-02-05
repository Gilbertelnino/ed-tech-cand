import React from "react";
import { Controller } from "react-hook-form";
// @ts-ignore
import AsyncCreatableSelectElement from "react-select/async-creatable";

import { get, chain, isString } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";

const _ = { get, chain, isString };

interface Props {

  name: string;
  // @ts-ignore
  onStartSearching: (inputValue) => void;
  className?: string;
  externalLabel?: externalLabel;
  createLabelText?: string;
  placeholder?: string;
  control: any; // Must be react-hook-form control
  rules?: object;

  // other props of the component which directly used in component
  [key: string]: any;
}

interface externalLabel {
  [key: string]: any;
}

const AsyncCreatableSelect = ({ onStartSearching, name, control, ...props }: Props) => {

  //  External label
  const externalLabel = (_.get(props, "externalLabel.label", "") || "");
  let externalLabelClass = (_.get(props, "externalLabel.className", "") || "");
  const externalLabelClasses = _.chain([externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();

  // Error message
  const errorMessage = _.get(props, `validationObj.${name}.message`, null);

  // Change create label if no options are found
  const formatCreateLabel = (_.get(props, "createLabelText", "") || "Create");
  const className = props.className ? props.className : "";

  /*
    References of hook form and react select
    https://codesandbox.io/s/goofy-flower-rzu9s
    https://github.com/JedWatson/react-select/issues/3855
    https://codesandbox.io/s/controller-rules-forked-m7k76?file=/src/App.tsx
  */

  return (
    <>
      {(externalLabel) && (<label htmlFor={props.name} className={externalLabelClasses}>{externalLabel}</label>)}
      <Controller
        name={name}
        rules={(props.rules || {})}
        isClearable
        control={control}
        as={<AsyncCreatableSelectElement
          name={name}
          className={(`${errorMessage ? "async-error custom-select-box" : "custom-select-box"} ${className}`)}
          classNamePrefix='eh-custom-dropdown-inner'
          cacheOptions
          defaultOptions
          loadOptions={onStartSearching}
          placeholder={(props.placeholder || "")}
          formatCreateLabel={(value: string) => `${formatCreateLabel} "${value}"`}
        />}
      />
      {errorMessage && (<ErrorTextHelper text={errorMessage} />)}
    </>
  );

}

export default AsyncCreatableSelect;
