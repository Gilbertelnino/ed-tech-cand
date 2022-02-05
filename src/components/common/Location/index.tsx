import React from "react"
import { LocationAwareInput } from "./LocationAwareInput";
import { Environment } from "../../../types/location.types";

const Location = (props: any) => {
  return (
    <LocationAwareInput
      environment={Environment.DEVO}
      onChangeCallback={props.onChangeLocation}
      {...props}
    />
  );
}

export default Location;
