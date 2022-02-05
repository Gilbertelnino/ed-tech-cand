import React from "react";
import { Controller } from "react-hook-form";
// @ts-ignore
import AsyncSelectElement from "react-select/async";

import { get, chain, isString } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";

const _ = { get, chain, isString };

interface Props {

  name: string;
  // @ts-ignore
  onStartSearching: (inputValue) => void;
  externalLabel?: externalLabel;
  placeholder?: string;
  control: any; // Must be react-hook-form control
  rules?: object;

  // other props of the component which directly used in component
  [key: string]: any;
}

interface externalLabel {
  [key: string]: any;
}

const AsyncSelect = ({ onStartSearching, name, control, ...props }: Props) => {

  //  External label
  const externalLabel = (_.get(props, "externalLabel.label", "") || "");
  let externalLabelClass = (_.get(props, "externalLabel.className", "") || "");
  const externalLabelClasses = _.chain([externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();

  // Error message
  const errorMessage = _.get(props, `validationObj.${name}.message`, null);

  // Change create label if no options are found
  const noOptionsMessage = (_.get(props, "noOptionsMessage", "") || "No Options");

  return (
    <>
      {(externalLabel) && (<label htmlFor={props.name} className={externalLabelClasses}>{externalLabel}</label>)}
      <Controller
        name={name}
        rules={(props.rules || {})}
        isClearable
        control={control}
        as={<AsyncSelectElement
          name={name}
          className={(`${errorMessage ? "async-error custom-select-box" : "custom-select-box"}`)}
          classNamePrefix='eh-custom-dropdown-inner'
          cacheOptions
          defaultOptions
          loadOptions={onStartSearching}
          placeholder={(props.placeholder || "")}
          noOptionsMessage={() => noOptionsMessage}
        />}
      />
      { errorMessage && (<ErrorTextHelper text={errorMessage} />)}
    </>
  );

}

export default AsyncSelect;
