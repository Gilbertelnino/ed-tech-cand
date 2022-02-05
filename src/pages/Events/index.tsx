import React from 'react';
import Events from "./components/list";

const Page = (props) => {
  return (
    <div className="page-company">
      <div className="company-page-events-container">
        <Events {...props} />
      </div>
    </div>
  );
}
export default Page;