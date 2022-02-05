import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CompanyHeader from "./CompanyHeader";
//import CompanyFooter from "./CompanyFooter";
import CompanySidebar from "./CompanySidebar";
import { getCurrentTab } from "../../utils/helper";
import { getCompanyDetailRequest } from "../../reducers/company/companyProfile.reducer";
import { isEmpty } from 'lodash';

const _ = { isEmpty };

const CompanyLayout = ({ children }) => {

  const dispatch = useDispatch();
  const { companyProfile: { data } } = useSelector(({ company }: any) => company);
  const currentTab = getCurrentTab(children);

  useEffect(() => {
    if (_.isEmpty(data)) {
      if (currentTab !== "profile") {
        dispatch(getCompanyDetailRequest())
      }
    }
  }, [data]);

  return (
    <div className="company-container">
      <CompanySidebar children={children} />
      <div className="company-body">
        <CompanyHeader />
        <div className="company-body-wrapper">
          <div className="inner-tab-container">
              {children}
              {/* <h3>Company side pages</h3> */}
          </div>
        </div>
      </div>
      {/* <CompanyFooter /> */}
    </div>
  )
}

export default CompanyLayout;
