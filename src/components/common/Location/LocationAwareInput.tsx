import React, { FunctionComponent } from "react";
// @ts-ignore
import AlgoliaPlaces from "algolia-places-react";
import { Suggestion } from "places.js";
import _ from "lodash";
import { LocationInput, Environment } from "../../../types/location.types";
import { getAlgoliaConfig } from "./AlgoliaLocationUtils";

export interface LocationAwareInputProps {
	environment: Environment;
	placeholder?: string;
	onChangeCallback: (locationInput: LocationInput) => void;
	onClear?: () => void;
}

export const LocationAwareInput: FunctionComponent<LocationAwareInputProps> = ({ onChangeCallback, onClear, environment, placeholder }) => {
	const config = getAlgoliaConfig(environment);

	return (
		<AlgoliaPlaces
			placeholder={placeholder || "Enter City/Town/Village"}
			options={config}
			onClear={() => {
				if (typeof onClear === "function") {
					onClear();
				}
			}}
			onChange={
				({ suggestion }: any) => {
					const typedSuggestion: Suggestion = suggestion;

					const input = {
						city: _.get(typedSuggestion, "name", ""),
						region: _.get(typedSuggestion, "administrative", ""),
						countryCode: _.get(typedSuggestion, "countryCode", ""),
						country: _.get(typedSuggestion, "country", "")
					};
					onChangeCallback(input);
				}
			}
		/>
	);
};
