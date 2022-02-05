import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Paper, Typography, Container } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal, FlashMessage } from '../../../components/common';
import { isUndefined, get, isEmpty } from "lodash";
import { getJobRequest, jobListRequest, jobDetailReset, jobAddFilter } from "../../../../src/reducers/job/jobs.reducer";
import { tabChangeRequest } from "../../../../src/reducers/company/tabChange.reducer";
import { formatDate, openUrlInNewTab, scrollToTop } from "../../../utils/helper";
import { truncateCharacters } from "./../../../components/helpers/textFormatter";
import appRoutes, { companyPrefix } from '../../../routes/app.routes';
import { Edit as EditIcon, Business as BusinessIcon, LocationOn as LocationOnIcon } from '@material-ui/icons';
import Pagination from "@material-ui/lab/Pagination";
import Spinner from "../../../../src/components/common/Spinner";
import Skeleton from '@material-ui/lab/Skeleton';
import NoJobsFound from "./noJobsFound";
import companyStock from "../../../assets/images/company_stock.png";

const _ = { isUndefined, get, isEmpty };

const JobGrid = (props) => {

  const { isPublic } = props;
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [picture, setCompanyProfile] = useState(companyStock);
  const dispatch = useDispatch();
  const history = useHistory();
  const { companyProfile: { data: { profile_image: privatePic, slug, id: privateId } } } = useSelector(({ company }) => company);
  const { companyPublicProfile: { data: { profile_image: publicPic, id: publicId } } } = useSelector(({ company }) => company);
  const { jobs } = useSelector(({ job }) => job);
  const data = _.get(jobs, "data", []);
  const detail = _.get(jobs, "detail", {});
  const loading = _.get(jobs, "loading", false);
  const detailLoading = _.get(jobs, "detailLoading", false);
  const jobFilter = _.get(jobs, "jobFilter", {});
  const pagination = _.get(jobs, "pagination", {});

  useEffect(() => {
    props.setButtonClick(handleButtonClick);
  }, []);

  useEffect(() => {
    const profilePicture = privatePic ? privatePic : publicPic ? publicPic : "";
    if (!_.isEmpty(profilePicture)) {
      setCompanyProfile(profilePicture);
    }
  }, [privatePic, publicPic]);

  useEffect(() => {
    const companySlug = _.get(props, "match.params.slug", undefined);
    dispatch(jobListRequest({ page: page, public: "1", archive: "0", isPublic, companySlug }));
  }, []);

  // Job Filter Hook
  useEffect(() => {
    if (!_.isEmpty(jobFilter)) {
      const companySlug = _.get(props, "match.params.slug", undefined);
      dispatch(jobListRequest({ ...jobFilter, isPublic, companySlug }));
      scrollToTop(300)
    }
  }, [jobFilter]);

  const handleButtonClick = (type: string, text: any) => {
    switch (type) {
      case "Preview":
        setProfilePreview()
        break;
      default:
        break;
    }
  };

  const setProfilePreview = () => {
    //history.push(`/${companyPrefix}/profile/jobs/${slug}`);
    if (!_.isUndefined(slug)) {
      const win = window.open(appRoutes.companyPublicPageJobs.generatePath(slug), "_blank");
      win.focus();
    }
  }

  const handleCardClick = (data) => {
    const slug = _.get(data, "slug", null);

    if (slug) {
      openUrlInNewTab(appRoutes.jobDetail.generatePath(slug));
    } else {
      FlashMessage("Unable to find the route for job", "error");
    }
  }

  const handleClose = () => {
    dispatch(jobDetailReset());
    setOpen(false);
  };

  const handleEditJobsClick = () => {
    dispatch(tabChangeRequest({ tab: 'jobs' }));
  }

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    dispatch(jobAddFilter({ ...jobFilter, page: value }));
  };

  const getJobBasicInfo = (d) => {
    return (
      <div className="job-basic-info">
        <Grid xs={10} item>
          <h4 className="job-title">{_.get(d, "title", "")}</h4>
          <p className="company-name"><BusinessIcon />{_.get(d, "createdBy.companyProfile.company_name", "")}</p>
          <p className="job-location"><LocationOnIcon />{_.get(d, "location", "")}</p>
        </Grid>
        <Grid xs={2} item className="microsoft-logo-wrapper job-logo-wrapper">
          <img src={picture} className="microsoft-logo" />
        </Grid>
      </div>
    )
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const getCards = () => {
    let cards = [];
    if (loading) {
      cards = [1, 2, 3, 4].map((i) => {
        return (
          <Grid xs={12} sm={4} lg={3} key={i} item>
            <Skeleton className="job-card-skeleton" />
          </Grid>
        )
      });
    } else if (_.isEmpty(data)) {
      return <NoJobsFound handleClick={() => handleOpen()} displayAddNewJob={false} />
    } else {
      cards = (data || []).map((s) => {
        return (
          <Grid xs={12} sm={4} lg={3} key={s.id || ""} item>
            <Paper className="job-card-wrapper" onClick={() => handleCardClick(s)}>
              <div className="job-card">
                {getJobBasicInfo(s)}
                <div className="job-other-info">
                  <Typography variant="body2" color="textSecondary" className="job-description">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: _.get(s, "description", ""),
                      }}
                    ></div>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="job-posted-date">
                    posted on {formatDate(s.created_at) || ""}
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        )
      });
    }
    return cards;
  }

  const getJobGrid = () => {
    return (
      <Scrollbars
        renderThumbHorizontal={() => <div />}
        renderView={({ children }) => (
          <div className="job-grid-container">{children}</div>
        )}
        className="job-grid-scroller"
      >
        <p className="edit-jobs">
          <span onClick={() => handleEditJobsClick()}>
            EDIT JOBS
            <EditIcon />
          </span>
        </p>
        <p className="all-jobs">All</p>
        <Grid container className="job-grid-wrapper" spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {getCards()}
            </Grid>
            {setPagination()}
          </Grid>
        </Grid>
      </Scrollbars>
    );
  }

  const getPublicJobGrid = () => {
    return (
      <div className="job-grid-container">
        <Container maxWidth="lg">
          <Grid container className="job-grid-wrapper" spacing={2}>
            <Grid item xs={12}>
              <Grid container className="job-list-wrap slim-scrollbar" spacing={2}>
                {getCards()}
              </Grid>
              {setPagination()}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  const getJobDetailModal = () => {
    return (
      <Modal visible={open} size="x-large" closeButtonCross={true} onClose={() => handleClose()}>
        <Spinner visible={detailLoading} loadingTip={""}>
          <div className="job-detail">
            {getJobBasicInfo(detail)}
            <div className="job-description slim-scrollbar">
              <div
                dangerouslySetInnerHTML={{
                  __html: _.get(detail, "description", ""),
                }}
              ></div>
            </div>
          </div>
        </Spinner>
      </Modal>
    )
  }

  const setPagination = () => {
    return (
      <Grid container justify="center">
        {!_.isEmpty(data) && (
          <Pagination
            count={_.get(pagination, "total", 0)}
            defaultPage={page}
            variant="outlined"
            color="secondary"
            className="jobs-pagination"
            onChange={(e, value) => handlePaginationChange(e, value)}
          />
        )}
      </Grid>
    )
  }

  return (
    <>
      {!isPublic ? (
        getJobGrid()
      ) : (
        getPublicJobGrid()
      )}
      {getJobDetailModal()}
    </>
  );
}
export default JobGrid;
