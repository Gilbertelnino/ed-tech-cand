import React from 'react';
import { isUndefined } from "lodash";
import Header from './Header';
import Banner from './Banner';
import Container from './Container';
import Footer from '../Default/Footer';

const _ = { isUndefined };
interface CompanyLayoutProps {
  children?: any;
}

const CompanyLayout = (prop: CompanyLayoutProps) => {
  const { children } = prop;
  const { props } = children;
  const { isPublic } = props;
  const publicClass = _.isUndefined(isPublic) ? "" : "public-company-wrapper";
  return (
    <div className="company-layout">
      <Header />
      {!_.isUndefined(isPublic) && (<Banner />)}
      <div className={`company-wrapper ${publicClass}`}>
        <Container children={children} />
      </div>
      {!_.isUndefined(isPublic) && (<Footer />)}
    </div>
  )
}
export default CompanyLayout;