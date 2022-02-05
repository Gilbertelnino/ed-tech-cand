import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import {
  Button, Checkbox, Input, ConfirmDialog, ErrorTextHelper, MessageHelper
} from "../../components/common";
import { ReactComponent as UnauthorizedErrorIcon } from "../../assets/svg/unauthorized_error.svg";
import appRoutes from '../../routes/app.routes';

const UnauthorizedError = () => {

  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState<boolean>(false);

  return (
    
    <Container fixed>
    <div className="bg-pink-circle"></div>       
       <div className="unauthorized-error-wrapper">
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="unauthorized-error-image">
              <UnauthorizedErrorIcon />
              </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="unauthorized-error-text">
              <h3 className='unauthorized-error-msg'> Not Authorized </h3>
              <p className='unauthorized-error-body'> Access to this page is allowed only for authorized users.</p>
              <Button className='unauthorized-error-btn'>Switch An Account</Button>
              <Link to ={appRoutes.home.path} className='unauthorized-error-link'> Home Page </Link>
                </div>
            </Grid>
          </Grid>
        </div>


    </Container>
  )
};

export default UnauthorizedError;
