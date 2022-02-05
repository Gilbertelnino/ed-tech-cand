import React from "react";
import { Helmet } from "react-helmet";

export const PageTitle = (pgTitle: string) => {
  return (
    <Helmet>
      <title>employHER | {pgTitle}</title>
    </Helmet>
  )
}

export default PageTitle;
