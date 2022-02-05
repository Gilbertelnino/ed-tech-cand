import React, { ChangeEvent, ReactNode } from 'react';
import { map, includes, find, startCase, isEmpty } from "lodash";
import { Spinner } from "../../../components/common";
import Tab from "./innerTabs";
import navData from "./navData";
import ReactSelect from "react-select";
//Material Icons
import PageIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CandidateIcon from '@material-ui/icons/RecentActors';
import MessageIcon from '@material-ui/icons/QuestionAnswer';
import JobIcon from '@material-ui/icons/WorkOutlineOutlined';
import AdminIcon from '@material-ui/icons/SupervisorAccount';

const _ = { map, includes, find, startCase, isEmpty };
interface TabPanelProps {
  children?: ReactNode;
  index: string;
  value: string;
  className: string;
}
interface ContainerProps {
  handleChange: (event: ChangeEvent<{}>, value: string) => any;
  children?: ReactNode;
  value: string;
  loading: boolean;
  profile: string;
}

interface iconProp {
  [key: string]: ReactNode
}

const icons: iconProp = {
  dashboard: <DashboardIcon />,
  candidates: <CandidateIcon />,
  jobs: <JobIcon />,
  page: <PageIcon />,
  admins: <AdminIcon />,
  messages: <MessageIcon />,
  settings: <SettingsIcon />,
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const getIcon = (icon: string) => {
  if (!_.isEmpty(icon)) {
    return icons[icon];
  }
}

const handleOnTabChange = (selectedTab, handleChange) => {
  handleChange({}, selectedTab.value);
}

const setMobileNav = (value: string, profile: string, e: void, option: Array<[]>) => {
  const mobiNavOption = option.map(o => { return { 'label': <>{getIcon(o)} {_.startCase(o)}</>, 'value': o, 'icon': 'fa fa-check' } });
  return (
    <div className="mobile-nav-wrapper">
      <ReactSelect
        name="type"
        externalLabel={{ label: "Job Type" }}
        placeholder="Select job type"
        className="mobile-nav-select-box"
        options={mobiNavOption}
        value={{ 'label': <b className="active-nav">{getIcon(value)} {_.startCase(value)}</b>, 'value': value }}
        isSearchable={false}
        onChange={(val: string) => handleOnTabChange(val, e)}
      />
      <img src={profile} className="company-logo" />
    </div>
  )
}
const getTabPanel = (children, value, profile, handleChange) => {
  const menuList = navData.map(({ name }) => name);
  const data = _.find(navData, { 'name': value });
  const { props } = children;
  const { isPublic } = props;
  const tabClass = isPublic ? "public-tab-container" : "tab-container";
  return (
    <TabPanel value={value} index={value} className={tabClass}>
      {!isPublic && setMobileNav(value, profile, handleChange, menuList)}
      {!_.includes(menuList, value) ? children : <Tab children={children} data={data} />}
    </TabPanel>
  )
}
const Container = (props: ContainerProps) => {
  const { children, value, loading, profile, handleChange } = props;
  return (
    <Spinner className={`tab-container`} visible={loading} >
      {getTabPanel(children, value, profile, handleChange)}
    </Spinner>
  );
}
export default Container;