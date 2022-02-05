import React from "react";

interface Props {
  type: "success" | "error";
  text: any;
}

const MessageHelper = (props: Props) => {

  return (
    <span
      className={`text-sm ${props.type === "success" ? "text-success" : "text-danger"}`}
    >
      {props.text || ""}
    </span>
  )
}


// Default props of the component
MessageHelper.defaultProps = {
  type: "success",
  text: ""
}

export default MessageHelper;
