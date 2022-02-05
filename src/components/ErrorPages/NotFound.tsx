import React from 'react';
import { ReactComponent as PageNotfoundImg } from "../../assets/svg/not-found-404.svg";

import Container from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';

const NotFoundPage = () => {
  return (
    <Container maxWidth="lg">
      <div className="page-not-found">
        <div className="nfi-wrap">
          <div className="nf-img-wrap">
            <PageNotfoundImg />
          </div>
          <div className="nfc-wrap">
            <h2>Oops!</h2>
            <p>We cannot find the page you are looking for.</p>
            <Button variant="outlined" color="secondary" className="border-button btn-transparent">
              Go To Home Page
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default NotFoundPage;
