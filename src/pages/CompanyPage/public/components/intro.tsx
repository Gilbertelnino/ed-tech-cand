import React from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { sanitizeUrl } from "../../../../utils/helper";
import LanguageIcon from '@material-ui/icons/Language';
import { get, isEmpty, isNull } from "lodash";
import Skeleton from "@material-ui/lab/Skeleton";

const _ = { get, isEmpty, isNull };

const Intro = () => {

  const { companyPublicProfile: { data, loading } } = useSelector(({ company }:any) => company);
  const companyName = _.get(data, 'companyProfile.company_name', "");
  const industryName = _.get(data, 'companyProfile.industry.title', "");
  const location = _.get(data, "companyProfile.location_json", "");
  const locationData = !_.isEmpty(location) ? JSON.parse(location) : {};
  const locationCityName = _.get(locationData, "city", "");
  const locationRegion = _.get(locationData, "region", "");
  const employeeSize = _.get(data, 'companyProfile.employeeSize.title', "");
  const companyWebsite = _.get(data, 'companyProfile.website', "");
  const sanitizeLink = _.isNull(companyWebsite) ? '' : sanitizeUrl(companyWebsite);
  return (
    <Container maxWidth="sm">
      <Grid container justify="center" xs={12}>
        <Grid item spacing={2} xs={12}>
          <div className="intro-header">
            <div className="intro-logo">
              {companyName}  
            </div>
            <div className="address">
              <div className="indus-name"> { loading ? <Skeleton width={100} /> : industryName} </div>
              <span>|</span>
              <div className="location-name">{ loading ? <Skeleton width={50} /> : `${locationCityName}, ${locationRegion}`} </div>
              <span>|</span>
              <div className="emp-size"> { loading ? <Skeleton width={80} /> : employeeSize}</div>
            </div>
            <div className="external-link">
              <LanguageIcon /> { loading ? <Skeleton width={300} className="external-link-skeleton" /> :  <a target="_blank" href={sanitizeLink}>{companyWebsite}</a> }
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Intro;