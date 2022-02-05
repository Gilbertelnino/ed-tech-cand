import React from "react";
import { Controller } from "react-hook-form";
// @ts-ignore
import ReactSelect, { components, DropdownIndicatorProps } from "react-select";

import { get, chain, isString, isUndefined } from "lodash";
import ErrorTextHelper from "./ErrorTextHelper";
import { ReactComponent as SelectDropdownIndicator } from './../../assets/svg/dropdown-indicator.svg'
 

const _ = { get, chain, isString, isUndefined };

interface Props {

	name: string;
	options: Array<OptionsProp>;
	control?: any; // Must be react-hook-form control

	// @ts-ignore
	externalLabel?: externalLabel;
	placeholder?: string;
	rules?: object;
	value?: any;

	// other props of the component which directly used in component
	[key: string]: any;
}


interface OptionsProp {
	label: string; value: string;
}

interface externalLabel {
	[key: string]: any;
}

const SelectNew = ({ options, name, control,value, ...props }: Props) => {

	let inputRefClass = "";
	const isRequired = _.get(props, "required", "");
	if (isRequired === true) {
		inputRefClass = "required";
	} else if (isRequired === false) {
		inputRefClass = "";
	}
	//  External label
	const externalLabel = (_.get(props, "externalLabel.label", "") || "");
	let externalLabelClass = (_.get(props, "externalLabel.className", "") || "");
	const externalLabelClasses = _.chain([inputRefClass, externalLabelClass]).uniq().join(" ").split(" ").uniq().join(" ").trim().value();

	// Error message
	const errorMessage = _.get(props, `validationObj.${name}.message`, null);

	// Change create label if no options are found
	const noOptionsMessage = (_.get(props, "noOptionsMessage", "") || "No Options");

	const _handleOnChange = (val: any) => {
		const { onChange } = props;
		if (typeof onChange === "function") {
			onChange(val)
		}
	}

	const DropdownIndicator = (
		props: DropdownIndicatorProps
	) => {
		return (
			<components.DropdownIndicator {...props}>
				<SelectDropdownIndicator />
			</components.DropdownIndicator>
		);
	};
	
	if(_.isUndefined(control))
	 return (
		<>
			{(externalLabel) && (<label htmlFor={props.name} className={externalLabelClasses}>{externalLabel}</label>)}
			<ReactSelect
				onChange={(val: any) => _handleOnChange(val)}
				name={name}
				className={`${errorMessage ? "async-error custom-select-box" : "custom-select-box"}`}
				classNamePrefix="eh-custom-dropdown-inner"
				cacheOptions
				defaultOptions
				options={options}
				value={value}
				isSearchable={_.get(props, "isSearchable", true)}
				placeholder={_.get(props, "placeholder", "Please select")}
				noOptionsMessage={() => noOptionsMessage}
			/>
		</>
	)

	return (
		<>
			{(externalLabel) && (<label htmlFor={props.name} className={externalLabelClasses}>{externalLabel}</label>)}
			<Controller
				name={name}
				rules={(props.rules || {})}
				isClearable
				control={control}
				onChange={(val: any) => _handleOnChange(val)}
				render={({ onChange, value, name, ref }: any) => (
					<ReactSelect
						onChange={(val: any) => onChange(val)}
						components={{ DropdownIndicator, IndicatorSeparator: () => null }}
						name={name}
						className={(`${errorMessage ? "async-error custom-select-box" : "custom-select-box"}`)}
						classNamePrefix="eh-custom-dropdown-inner"
						cacheOptions
						defaultOptions
						options={options}
						value={value}
						isSearchable={_.get(props, "isSearchable", true)}
						placeholder={_.get(props, "placeholder", "Please select")}
						noOptionsMessage={() => noOptionsMessage}
					/>
				)}
			/>
			{errorMessage && (<ErrorTextHelper text={errorMessage} />)}
		</>
	);

}

export default SelectNew;
