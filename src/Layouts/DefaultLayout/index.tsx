import React from "react";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";

const DefaultLayout = ({ children }) => {

  return (
    <div className="default-container">
       <div className="bg-pink-circle"></div>
      <DefaultHeader />
      {children}
      <DefaultFooter />
    </div>
  )
}

export default DefaultLayout;
