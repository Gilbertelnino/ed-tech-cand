import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import {
  Button, Checkbox, Input, ConfirmDialog, ErrorTextHelper, MessageHelper
} from "../../components/common";
import { ReactComponent as InternalErrorIcon } from "../../assets/svg/internal_error.svg";

const InternalError = () => {

  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState<boolean>(false);

  return (
    <Container fixed>
    <div className="bg-pink-circle"></div>
        <div className="internal-error-wrapper">
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="internal-error-image">
                <InternalErrorIcon />
              </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="internal-error-text">
                <h3 className='internal-error-msg'> Ruh-Roh... </h3>
                <p className='internal-error-body'> looks like we are experiencing an internal server issue. <br /> Please try refreshing this page later, or Feel free to contact Us at. <br /> <a href='mailto:support@employher.com' className='internal-error-link'>support@employher.com</a></p>
                </div>
            </Grid>
          </Grid>
        </div>
    </Container>
  )
};

export default InternalError;
