import React, { ReactNode } from 'react';
import map from "lodash/map";
const _ = { map };

interface ContainerProps {
  children?: ReactNode;
}
const Container = (props: ContainerProps) => {
   const { children } = props;
  return (
      <div className="admin-content">
        {children}
      </div>
  );
}
export default Container;