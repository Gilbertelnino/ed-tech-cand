import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/common/Button';
import { ReactComponent as NoJobFound } from "../../../assets/svg/no-job-found.svg";

interface NoJobsFoundProps {
  handleClick?: () => void;
  displayAddNewJob?: boolean;
}

const NoJobsFound = (props: NoJobsFoundProps) => {
  return (
    <Grid container xs={12} className="no-jobs-found-wrapper">
      <Grid item spacing={8} xs={5} className="no-jobs-found-svg">
        <NoJobFound />
      </Grid>
      <Grid item spacing={8} xs={7} className="no-jobs-found-text">
        <div className="no-jobs-found">
          <h3 className="no-open-jobs">No jobs found</h3>
          {
            props.displayAddNewJob && (
              <p className="no-open-jobs-text">
                Add jobs to level up your empowerHER network
              </p>
            )
          }
        </div>
        {
          props.displayAddNewJob && (
            <div className="add-new-job-button">
              <Button variant={"outlined"} className={'btn-transparent'} onClick={props.handleClick}> {'Add new Job'} </Button>
            </div>
          )
        }
      </Grid>
    </Grid>
  )
}
export default NoJobsFound;
