import React from 'react';
import List from "./components/list";

const Admins = (props) => {
  return (
    <div className="page-admins">
      <div className="admin-list-wrapper">
        <List {...props} />
      </div>
    </div>
  );
}
export default Admins;