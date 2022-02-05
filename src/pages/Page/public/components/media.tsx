import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import BlackLogo from '../../../../assets/svg/black-round-logo.svg';
import Spinner from "../../../../components/common/Spinner";
import Skeleton from '@material-ui/lab/Skeleton';
import { useParams } from "react-router-dom";
import { getCompanyProfileDetailRequest, resetCompanyProfileRequest } from "../../../../reducers/company/companyPublicProfile.reducer";
import { get, isEmpty } from "lodash";

const _ = { get, isEmpty };

const Banner = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { companyPublicProfile: { data, profileGetFailed, loading } } = useSelector(({ company }) => company);
  const bannerImage = _.get(data, 'companyProfile.banner_image', "");
  const profileImage = _.get(data, 'profile_image', "");

  useEffect(() => {
    if (_.isEmpty(data)) {
      const companySlug = _.get(params, "slug", "");
      dispatch(getCompanyProfileDetailRequest({ slug: companySlug }));
    }
  }, []);

  useEffect(() => {
    if (profileGetFailed === true) {
      dispatch(resetCompanyProfileRequest());
      history.push(`/`);
    }
  }, [profileGetFailed]);

  return (
    <div className="company-public-profile-header text-center">
      {/* <Spinner visible={loading} loadingTip={""}> */}
      <Grid container justify="center" xs={12}>
        {
         loading ?
            (
              /*<Grid item spacing={2} xs={12}>
                <p className="profile-slogan">
                  We are an ecosystem connecting diverse professionals globally one video at a time.
                </p>
                <div className="">
                  <p className="profile-slogan-logo">
                    empower | inspire | employ
                  </p>
                  <div className="">

                  </div>
                </div>
              </Grid>*/
              <Skeleton variant="rect" width={1500} height={250} />
            ) :
            (
              <img src={bannerImage} />
            )
        }
      </Grid>
      <div className="black-logo">
        {
          loading ? (
            <Skeleton variant="circle" width={135} height={135} />
          ) : (
            <img src={profileImage} />
          )
        }
      </div>
      {/* </Spinner> */}
    </div>
  )
}

export default Banner;
