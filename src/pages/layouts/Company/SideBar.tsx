import React, { ChangeEvent } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import {
  FileCopy as PageIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  RecentActors as CandidateIcon,
  QuestionAnswer as MessageIcon,
  WorkOutlineOutlined as JobIcon,
  SupervisorAccount as AdminIcon,
} from '@material-ui/icons';
import _ from 'lodash';

interface SideBarProps {
  handleChange: (event: ChangeEvent<{}>, value: string) => any;
  value: string;
  profile: string;
}
const tabProps = (index: Number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const SideBar = (props: SideBarProps) => {
  const { value, handleChange, profile } = props;

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Company Navigation"
      className={`navigation-tabs`}
    >
      <Tab icon={<DashboardIcon />} value="dashboard" label="Dashboard" {...tabProps(0)} />
      <Tab icon={<CandidateIcon />} value="candidates" label="Candidates" {...tabProps(1)} />
      <Tab icon={<JobIcon />} value="jobs" label="Jobs" {...tabProps(2)} />
      <Tab icon={<PageIcon />} value="page" label="Page" {...tabProps(3)} />
      <Tab icon={<AdminIcon />} value="admins" label="Admins" {...tabProps(4)} />
      <Tab icon={<MessageIcon />} value="messages" label="Messages" {...tabProps(5)} />
      {/* <Tab icon={<SettingsIcon />} value="settings" label="Settings" {...tabProps(6)} /> */}
      {!_.isEmpty(profile) && (
        <Tab value="preview" icon={<img src={profile} className="company-logo" />} className="microsoft-logo sidebar-company-logo" />
      )}
    </Tabs>
  );
}
export default SideBar;
