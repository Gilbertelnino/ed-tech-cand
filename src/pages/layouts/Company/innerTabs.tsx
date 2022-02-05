import React, { ChangeEvent, ReactNode } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Buttons from './actionButtons';
import { useParams } from "react-router-dom";
import { companyPrefix } from "../../../routes/app.routes";
import { tabChangeRequest } from "../../../reducers/company/tabChange.reducer";
import { clearString } from "../../../utils/helper";
import { map, isEmpty, isUndefined, get } from "lodash";
import { getCurrentTab } from "../../../utils/helper";

const _ = { map, isEmpty, isUndefined, get };

interface TabPanelProps {
  children?: ReactNode;
  index: string;
  value: string;
  className: string;
}
interface InnerTabProps {
  children?: any;
  handleChange?: (event: ChangeEvent<{}>, value: string) => any;
  data: any;
}

let setClick = (type: string, e: any) => { };

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const tabProps = (index: any) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const getTabs = (data: any) => {
  const { tabs } = data;
  const tab = _.map(tabs, (label, index) => {
    return (
      <Tab key={index} value={label.toLowerCase()} label={label} {...tabProps(index)} />
    )
  });
  return tab;
}
const getTabPanel = (c, v) => {
  const children = getChild(c);
  return (
    <TabPanel value={v} index={v} className={"inner-tab-container"}>
      {children}
    </TabPanel>
  )
}

const handleButtonClick = (e: any, type: string) => {
  setClick(type, e);
  return;
};

const getChild = (children) => {
  const setChild = React.Children.map(children, child =>
    React.cloneElement(child, { setButtonClick: (click) => (setClick = click) })
  );
  return setChild;
}

const InnerTabs = (prop: InnerTabProps) => {
  const { data, children } = prop;
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { tabs } = data;
  const { props } = children;
  const { isPublic } = props;
  const companySlug = _.get(params, "slug", "");
  const currentSubTab = getCurrentTab(children, true);
  let { tab, innerTab } = useSelector(({ company }) => company.tab);
  const value = _.isEmpty(innerTab) ? _.isUndefined(currentSubTab) ? tabs[0] : currentSubTab : innerTab;
  tab = isPublic === true ? "page" : _.isUndefined(tab) ? getCurrentTab(children) : tab;
  const onHandleChange = (event: ChangeEvent<{}>, value: string) => {
    const subtab = value !== "all" ? `/${clearString(value)}` : ``;
    dispatch(tabChangeRequest({ tab: tab, innerTab: value }));
    if (_.isEmpty(companySlug)) {
      history.push(`/${companyPrefix}/${tab}${subtab}`);
    } else {
      history.push(`/${companyPrefix}/profile${subtab}/${companySlug}`);
    }
  };
  return (
    <div className={"inner-navigation-tabs"}>
      {_.isUndefined(isPublic) && <Buttons data={data} handleClick={(e: any, type: string) => handleButtonClick(e, type)} tab={tab} />}
      <div className="tab-inner-wrap">
        <Tabs value={value?.toLowerCase()} onChange={onHandleChange} aria-label="inner tabs" variant="scrollable" scrollButtons="auto">
          {getTabs(data)}
        </Tabs>
      </div>
      {getTabPanel(children, value)}
    </div>
  );
}
export default InnerTabs;
