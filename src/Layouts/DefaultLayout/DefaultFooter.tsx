// import React from "react";


// const DefaultFooter = () => {


//   return (
//     <footer className="default-footer">
//       default footer
//     </footer>
//   )
// }

// export default DefaultFooter;



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Input } from './../../components/common';
import { ReactComponent as Footerlogo } from "./../../assets/svg/footerlogo.svg";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from "react-router-dom";
import appRoutes from "../../routes/app.routes";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

type Inputs = {
  email: string;
  password: string;
};

// const { register, handleSubmit, errors } = useForm<Inputs>();

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className="footer-container">
            <Container fixed>
              <div className={classes.root} className="footer-wrap">
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={3}>
                    <div className="f-column">
                      <Footerlogo />
                      <ul className="social-icon">
                        <li>
                          <a href="" className="fb"> <FacebookIcon /> </a>
                        </li>
                        <li>
                          <a href="" className="tw"> <TwitterIcon /> </a>
                        </li>
                        <li>
                          <a href="" className="ig"> <InstagramIcon /> </a>
                        </li>
                      </ul>
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <div className="f-column">
                      {/* <h5>Menu</h5>
                      <ul>
                        <li>
                          <a href="" className="link">Demo link 1</a>
                        </li>
                        <li>
                          <a href="" className="link">Demo link 2</a>
                        </li>
                        <li>
                          <a href="" className="link">Demo link 3</a>
                        </li>
                        <li>
                          <a href="" className="link">Demo link 4</a>
                        </li>
                      </ul> */}
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <div className="f-column">
                      {/* <h5>Features</h5>
                      <ul>
                        <li>
                          <a href="" className="link">Demo link 5</a>
                        </li>
                        <li>
                          <a href="" className="link">Demo link 6</a>
                        </li>
                        <li>
                          <a href="" className="link">Demo link 7</a>
                        </li>
                        <li>
                          <a href="" className="link">Demo link 8</a>
                        </li>
                      </ul> */}
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <div className="f-column">
                      <h5>Newsletter</h5>
                      <div className="">
                        <Input
                          name="email"
                          externalLabel={{ label: "" }}
                          placeholder="Your Email"
                        // validationObj={errors}
                        // inputRef={register({
                        //   required: {
                        //     value: true,
                        //     message: "Please enter email address"
                        //   },
                        //   pattern: {
                        //     value: /\S+@\S+\.\S+/,
                        //     message: "Enter valid email address"
                        //   }
                        // })}
                        />
                        <Button >Subscribe</Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="footer-mini">
                <div className="f-mini-left">
                  <p>Copyright © 2022 employ<span>HER</span>. All Rights Reserved.</p>
                </div>
                <div className="f-mini-right">
                  <Link to={appRoutes.privacyPolicy.generatePath()} className="tu-link link">Terms of Use</Link>
                  <Link to={appRoutes.privacyPolicy.generatePath()} className="pp-link link">Privacy Policy</Link>
                </div>

              </div>
            </Container>
    </div>
  );
}
