import React from 'react';
import News from "./components/list";

const Page = (props) => {
  return (
    <div className="page-company">
      <div className="company-page-news-container">
        <News {...props} />
      </div>
    </div>
  );
}
export default Page;