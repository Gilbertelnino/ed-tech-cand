import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/common/Button';
import { ReactComponent as NoAdminFoundSvg } from "../../../assets/svg/no-job-found.svg";

interface NoAdminFoundProps {
  handleClick?: () => void;
}

const NoAdminFound = (props: NoAdminFoundProps) => {
  return (
    <Grid container xs={12} className="no-jobs-found-wrapper no-admin-found-wrapper">
      <Grid item spacing={8} xs={5} className="no-jobs-found-svg">
        <NoAdminFoundSvg />
      </Grid>
      <Grid item spacing={8} xs={7} className="no-jobs-found-text">
        <div className="no-jobs-found">
          <h3 className="no-open-jobs">No admins found</h3>
          {
            <p className="no-open-jobs-text">
              Add admins to level up your empowerHER network
            </p>
          }
        </div>
        {
          <div className="add-new-job-button">
            <Button variant={"outlined"} className={'btn-transparent'} onClick={props.handleClick}> {'Add new admin'} </Button>
          </div>
        }
      </Grid>
    </Grid>
  )
}
export default NoAdminFound;