import React from "react";

interface Props {
  text: string;
}

const ErrorTextHelper = (props: Props) => {
  return (<p className="error-helper">{props.text}</p>)
}

export default ErrorTextHelper;
