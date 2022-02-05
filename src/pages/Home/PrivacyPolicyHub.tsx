import React, { useEffect, useState } from "react";
import PrivacyHubHeader from "./components/PrivacyHubHeader";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { get } from "lodash";
import appRoutes from "../../routes/app.routes";
import { useHistory } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookiePolicy from "./components/CookiePolicy";

const _ = { get };


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`privacy-tabpanel-${index}`}
      aria-labelledby={`privacy-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function tabProps(index: any) {
  return {
    // id: `privacy-tab-${index}`,
    // 'aria-controls': `privacy-tabpanel-${index}`,
  };
}

const PrivacyPolicyHub = (props: any) => {

  const [value, setValue] = useState(1);
  const [currentTabName, setCurrentTabName] = useState("");

  const history = useHistory();

  useEffect(() => {
    const tabName = (_.get(props, "match.params.tab", "") || "privacy-policy");

    if (tabName === "terms-of-service") {
      setValue(1);
    } else if (tabName === "cookie-policy") {
      setValue(2);
    } else {
      setValue(0);
    }

    setCurrentTabName(tabName);
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);

    let tabPath = appRoutes.privacyPolicy.generatePath();

    if (newValue === 1) {
      tabPath = appRoutes.termsOfService.generatePath();
    } else if (newValue === 2) {
      tabPath = appRoutes.cookiePolicy.generatePath();
    }

    history.push(tabPath);

  };

  return (
    <div className="privacy-hub-wrapper">
      <PrivacyHubHeader />
      <div className="privacy-hub-tabs">
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="privacy hub" variant="fullWidth" >
            <Tab label="Privacy Policy" {...tabProps(0)} />
            <Tab label="Terms Of Services" {...tabProps(1)} />
            <Tab label="Cookie Policy" {...tabProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <PrivacyPolicy />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TermsOfService />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CookiePolicy />
        </TabPanel>
      </div>
    </div>
  )
}


export default PrivacyPolicyHub;
