import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import {
  Button, Checkbox, Input, ConfirmDialog, ErrorTextHelper, MessageHelper
} from "../../components/common";

import { ReactComponent as NotFound} from "../../assets/svg/not-found-404.svg";
import appRoutes from "../../routes/app.routes";

const NotFoundError = () => {

  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState<boolean>(false);

  return (
    
    <Container fixed>
    <div className="bg-pink-circle" />
    <div className="notFound-error-wrapper">
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="notFound-error-image">
              <NotFound />
              </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="notFound-error-text">
                <h3 className='oops'> Oops! </h3>
                <p className='notFound-error-message'> We cannot find the page you are looking for.</p>
                <Link to={appRoutes.home.path} className='notFound-link'>
                <Button className='notFound-btn'>Go To Home Page</Button>
                </Link>
                </div>
            </Grid>
          </Grid>
        </div>
    </Container>
  )
};

export default NotFoundError;
