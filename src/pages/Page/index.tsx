import React from 'react';
import CompanyPrivateHome from "./private";
import CompanyPublicHome from "./public";

import { isUndefined } from "lodash";

const _ = { isUndefined };
const Page = (props) => {
  const { isPublic } = props;
  return (
    <div className="page-company">
      {_.isUndefined(isPublic) ? <CompanyPrivateHome {...props} /> : <CompanyPublicHome />}
    </div>
  );
}
export default Page;