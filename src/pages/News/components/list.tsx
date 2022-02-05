import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Spinner } from "../../../components/common";

const List = (props) => {
  const loading = false;
  return (
    <Scrollbars
      renderThumbHorizontal={() => <div />}
      renderView={({ children }) => (
        <div className="company-home-page-news">
          {children}
        </div>
      )}
      className="company-page-news-scroller"
    >
      <Spinner visible={loading} >
        <div className="company-profile-intro text-center">
          <h1 className="pink-text">Coming soon.</h1>
        </div>
      </Spinner>
    </Scrollbars>
  );
}
export default List;
