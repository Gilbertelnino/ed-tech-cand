import * as React from "react";
import PeopleList from "./peopleList";

const people = (props) => (
  <div className="page-people">
    <div className="people-wrapper">
      <div className="people-content">
        <div className="people-list">
          <PeopleList {...props} />
        </div>
      </div>
    </div>
  </div>
);
export default people;
