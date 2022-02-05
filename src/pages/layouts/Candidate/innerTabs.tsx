import React, { ChangeEvent, ReactNode } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Buttons from './actionButtons';
import { companyPrefix } from "../../../routes/app.routes";
import { tabChangeRequest } from "../../../reducers/companyPortal/tabChange.reducer";
import { clearString } from "../../../utils/helper";
import { map, isEmpty, isUndefined } from "lodash";
import { getCurrentTab } from "../../../utils/helper";

const _ = { map, isEmpty, isUndefined };

interface TabPanelProps {
  children?: ReactNode;
  index: string;
  value: string;
  className: string;
}
interface InnerTabProps {
  children?: ReactNode;
  handleChange: (event: ChangeEvent<{}>, value: string) => any;
  data: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inner-tabpanel-${index}`}
      aria-labelledby={`inner-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const tabProps = (index: any) => {
  return {
    id: `inner-tab-${index}`,
    'aria-controls': `inner-tabpanel-${index}`,
  };
}

const getTabs = (data: any) => {
  const { tabs } = data;
  const tab = _.map(tabs, (label, index) => {
    return (
      <Tab key={index} value={label} label={label} {...tabProps(index)} />
    )
  });
  return tab;
}
const getTabPanel = (children, value) => {
  return (
    <TabPanel value={value} index={value} className={"inner-tab-container"}>
      {children}
    </TabPanel>
  )
}
const InnerTabs = (props: InnerTabProps) => {
  const { data, children } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { tabs } = data;
  const currentSubTab = getCurrentTab(children, true);
  let { tab, innerTab } = useSelector(({ company }) => company.tab);
  const value = _.isEmpty(innerTab) ? _.isUndefined(currentSubTab) ? tabs[0] : currentSubTab : innerTab;
  const onHandleChange = (event: ChangeEvent<{}>, value: string) => {
    tab = _.isUndefined(tab) ? getCurrentTab(children) : tab;
    const subtab = value !== "All" ? `/${clearString(value)}` : ``;
    dispatch(tabChangeRequest({ tab: tab, innerTab: value }));
    history.push(`/${companyPrefix}/${tab}${subtab}`);
  };

  return (
    <div className={"inner-navigation-tabs"}>
      <Tabs value={value} onChange={onHandleChange} aria-label="inner tabs">
        {getTabs(data)}
        <Buttons data={data} />
      </Tabs>
      {getTabPanel(children, value)}
    </div>
  );
}
export default InnerTabs;
