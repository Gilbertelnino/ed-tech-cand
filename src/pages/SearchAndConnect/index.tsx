import React, { useState, useEffect, ChangeEvent } from "react";
import CandidateProfileModal from './components/CandidateProfileModal';
import NoResultFound from './components/noResultFound';
import InvitationModal from './components/InvitationModal';
import VideoModal from './components/profileVideoModal';
import CreateSearchAlert from './components/CreateSearchAlert';
import { Container } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Paper, GridList, GridListTile, MenuItem, Select } from '@material-ui/core/';
import { Button } from "../../components/common";
import unknownProfile from "../../assets/images/unknownProfile.jpeg";
import { get, isEmpty } from "lodash";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { ReactComponent as PlayVideoText } from "../../assets/svg/play-video-text.svg";
import UserAvatar from "../../components/common/UserAvatar";
import Pagination from "@material-ui/lab/Pagination";
import { searchAllRequest, followCompanyRequest, updateCandidateConnectionRequest } from "../../reducers/SearchAndConnect/searchAndConnect.reducer";
import { useSelector, useDispatch } from "react-redux";
import { getInitialLetter } from "../../utils/helper";
import appRoutes from "../../routes/app.routes";
import moment from "moment";


const _ = { get, isEmpty };

export default function Candidates() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [candidateModalStatus, setCandidateOpen] = useState(false);
  const [invitationModalStatus, setInvitationOpen] = useState(false);
  const [candidateVideoUrl, setCandidateVideoUrl] = useState("");
  const [videoModalStatus, setvideoOpen] = useState(false);
  const [candidatePayload, setCandidatePayload] = useState({});
  const [createSearchAlertModalStatus, setCreateSearchAlertOpen] = useState(false);
  const [searchFilter, setsearchFilter] = useState('user');

  const { search: { searchData, loading, pagination, searchTerm, allResult, searchType } } = useSelector(({ search }) => search);
  const rows = _.get(searchData, "rows", []);

  useEffect(() => {
    if (searchType && searchType !== "all") {
      setsearchFilter(searchType)
    }
  }, [searchType]);

  useEffect(() => {
    dispatch(searchAllRequest({ q: searchTerm, type: "user", allResult: true, pageSize: 21 }));
  }, []);

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    dispatch(searchAllRequest({ q: searchTerm, type: searchFilter, allResult: true, page: value, pageSize: 21 }));
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    })
  };

  const candidateShowModal = (row) => {
    setCandidatePayload(row)
    setCandidateOpen(true);
  };

  const handleSearchFilterChange = (event) => {
    setsearchFilter(event.target.value);
    dispatch(searchAllRequest({ q: searchTerm, type: event.target.value, allResult: true, pageSize: 21 }));
  };

  const candidateModalHandleClose = () => {
    setCandidateOpen(false);
  };

  const invitationShowModal = (row) => {
    setCandidatePayload(row)
    setInvitationOpen(true);
  };

  const invitationModalHandleClose = () => {
    setInvitationOpen(false);
  };

  const createSearchAlertShowModal = () => {
    setCreateSearchAlertOpen(true);
  };

  const createSearchAlertModalHandleClose = () => {
    setCreateSearchAlertOpen(false);
  };

  const videoShowModal = (url) => {
    setCandidateVideoUrl(url)
    setvideoOpen(true);
  };

  const videoModalHandleClose = () => {
    setvideoOpen(false);
  };

  const handleFollowCompany = (payload) => {
    dispatch(followCompanyRequest({ id: _.get(payload, "id", 0), type: _.get(payload, "type", "") }));
    refreshList();
  };

  const refreshList = () => {
    setTimeout(
      function () {
        dispatch(searchAllRequest({ q: searchTerm, page: page, type: searchFilter, allResult: true, pageSize: 21 }));
      }
        .bind(this),
      1000
    );
  };

  const handleAcceptConnection = (id) => {
    dispatch(updateCandidateConnectionRequest({ id: id, type: "accepted" }));
    refreshList();
  }

  const getUserCardActionButton = (data: object) => {

    let cancelled_time = "";
    let current_time = "";
    const hasFollowers = _.get(data, 'follower', []);
    const hasRequester = _.get(data, 'requester', []);
    const isConnected = _.isEmpty(hasFollowers) && _.isEmpty(hasRequester);
    const connectionData = !_.isEmpty(hasFollowers) ? hasFollowers : !_.isEmpty(hasRequester) ? hasRequester : [];
    const type = isConnected ? "Connect" : !_.isEmpty(hasFollowers) && _.get(connectionData[0], 'status', 0) === 1 ? "Invite Sent" : !_.isEmpty(hasRequester) && _.get(connectionData[0], 'status', 0) === 1 ? "Accept" : (!_.isEmpty(hasFollowers) || !_.isEmpty(hasRequester)) && _.get(connectionData[0], 'status', 0) === 2 ? "Email" : "Disabled";

    if (!_.isEmpty(connectionData) && _.get(connectionData[0], 'status', 0) === 4) {
      cancelled_time = moment(_.get(connectionData[0], 'cancelled_at', "")).add(72, "hours").format("YYYY-MM-DD HH:mm:ss")
      current_time = moment().format("YYYY-MM-DD HH:mm:ss")
      if (current_time > cancelled_time) {
        return null
      }
    } else {
      switch (type) {
        case "Connect":
          return <Button onClick={() => invitationShowModal(data)} className="btn-primary btn profle-card-connect-button"> {type} </Button>
        case "Accept":
          return <Button onClick={() => handleAcceptConnection(_.get(connectionData[0], 'id', 0))} className="btn-primary btn profle-card-connect-button">{type}</Button>
        case "Invite Sent":
          return <Button disabled className="btn-primary btn profle-card-connect-button-disabled">{type}</Button>
        case "Email":
          return <Button className="btn-primary btn profle-card-connect-button">{type}</Button>
        default:
          return null
      }
    }
  }

  const userCard = (row) => {
    return <Grid item className="search-result-profle-card-container search-result-profile-card-wrap" xs={12} sm={6} md={4}>
      <Paper className="search-result-profle-card">
        <Grid >
          <Grid item xs={12} className="profle-card-top">

            <div className="profle-card-top-img">

              <div className="profile-picture">
                <div className="profile-img">
                  <UserAvatar
                    size="md"
                    className="cursor-pointer"
                    src={_.get(row, "profile_image", { unknownProfile })}
                    variant="circle"
                  >
                    {/* Fallback initial letters of candidate */}
                    <span className="text-black">{getInitialLetter(`${_.get(row, "first_name", "")} ${_.get(row, "last_name", "")}`)}</span>
                  </UserAvatar>
                </div>
                {_.get(row, "candidateProfile.profile_video", "") && (
                  <>
                    <div className="video-play-btn">
                      <PlayArrowIcon onClick={() => videoShowModal(_.get(row, "candidateProfile.profile_video", ""))} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="profle-card-top-info">
              <h3>{`${_.get(row, "first_name", "")} ${_.get(row, "last_name", "")}`}</h3>
              <p className="job-type">{_.get(row, "candidateProfile.job_title", "")}</p>
            </div>



          </Grid>
          <Grid item xs={12} className="profle-card-middle">
            <p>{_.get(row, "candidateProfile.personal_values", "")}</p>
          </Grid>
          <Grid item xs={12} className="profle-card-bottom">
            <Button color="secondary" onClick={() => candidateShowModal(row)}>
              Quick View
            </Button>
            {getUserCardActionButton(row)}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  }

  const viewJobs = (slug: string) => {
    const win = window.open(appRoutes.companyPublicPageJobs.generatePath(slug), "_blank");
    win.focus();
  }

  const companyCard = (row) => {
    return <Grid item className="search-result-profle-card-container" xs={12} sm={6} md={4}>
      <Paper className="search-result-profle-card">
        <Grid >
          <Grid item xs={12} className="profle-card-top">
            <div className="profle-card-top-img">

              <div className="profile-picture">
                <div className="profile-img">
                  <UserAvatar
                    size="md"
                    className="cursor-pointer"
                    src={_.get(row, "profile_image", { unknownProfile })}
                    variant="circle"
                  >
                    {/* Fallback initial letters of candidate */}
                    <span className="text-black">{getInitialLetter(`${_.get(row, "companyProfile.company_name", "")}`)}</span>
                  </UserAvatar>
                </div>
              </div>
            </div>
            <div className="profle-card-top-info">
              <h3>{_.get(row, "companyProfile.company_name", "")}</h3>
              <p className="job-type">{!_.isEmpty(_.get(row, "companyProfile.industry.title", "")) ? `${_.get(row, "companyProfile.industry.title", "")} |` : ""} {_.get(row, "companyProfile.employeeSize.title", "")}</p>
            </div>
          </Grid>
          <Grid item xs={12} className="profle-card-middle">
            <p>{_.get(row, "companyProfile.who_we_are", "")}</p>
          </Grid>
          <Grid item xs={12} className="profle-card-bottom">
            <Button color="secondary" onClick={() => viewJobs(_.get(row, "slug", ""))}>
              View Jobs
            </Button>
            {_.isEmpty(_.get(row, "follower", [])) ?
              <Button onClick={() => handleFollowCompany({ ...row, type: "follow" })} className="btn-primary btn profle-card-connect-button">
                Follow
              </Button> :
              <Button disabled className="btn-primary btn profle-card-connect-button-disabled">
                Following
              </Button>
            }
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  }

  const getResultCard = (row) => {
    return <>
      {searchType == "user" ? userCard(row) : null}
      {searchType == "company" ? companyCard(row) : null}
    </>
  }

  return (
    <div className={"main-container"}>
      <Container maxWidth="lg" className="p-0 sub-container search-main-container">
        <Grid container className="search-result-container">
          <Grid className="search-result-filters" item xs={12} md={9}>
            <Select
              className="search-result-filters-button"
              value={searchFilter}
              onChange={handleSearchFilterChange}
            >
              <MenuItem selected value={"user"}>Profiles</MenuItem>
              <MenuItem value={"company"}>Companies</MenuItem>
            </Select>
            <Select disabled className="search-result-filters-button" value={"Schools"}>
              <MenuItem selected value={"Schools"}>Schools</MenuItem>
            </Select>
            <Select disabled className="search-result-filters-button" value={"Skills"}>
              <MenuItem selected value={"Skills"}>Skills</MenuItem>
            </Select>
            <Select disabled className="search-result-filters-button" value={"Connections"}>
              <MenuItem selected value={"Connections"}>Connections</MenuItem>
            </Select>
          </Grid>
          <Grid className="search-result-create-alert" item xs={12} md={3}>
            <Button disabled color="secondary" onClick={createSearchAlertShowModal} className="search-result-create-alert-button">
              Create Alert
            </Button>
          </Grid>
          <p className="search-result-countText">
            {loading ?
              <GridList
                cellHeight="auto"
                cols={1}>
                <GridListTile cols={1}>
                  <Skeleton width={150} />
                </GridListTile>
              </GridList> : <>
                About {searchData?.count} Results
              </>}
          </p>

        </Grid>
        {loading ?
          <GridList
            cellHeight="auto"
            cols={3}
            spacing={50}>
            {["20%", "20%", "20%"].map((per, i) => {
              return (
                <GridListTile cols={0}>
                  <Skeleton height={520} />
                </GridListTile>
              );
            })}
          </GridList>
          :
          _.isEmpty(rows) ?
            <NoResultFound />
            :
            <>
              {/* Search result user cards */}
              <Grid container spacing={3} className="search-result-grid">
                {(rows || []).map((row) => {
                  return getResultCard(row)
                })}
              </Grid>
            </>
        }
        {
          !_.isEmpty(rows)
          && <Grid container className="search-result-pagination">
            <div className="pagination">
              <Pagination
                className="mb-20"
                variant="outlined"
                color="secondary"
                defaultPage={page}
                count={_.get(pagination, "total", 0)}
                onChange={(e, value) =>
                  handlePaginationChange(e, value)
                }
              />
            </div>
          </Grid>
        }
      </Container>

      <CandidateProfileModal
        status={candidateModalStatus}
        payload={candidatePayload}
        handleOnClose={candidateModalHandleClose}
      />

      <InvitationModal
        status={invitationModalStatus}
        payload={candidatePayload}
        handleOnClose={invitationModalHandleClose}
        refreshList={refreshList}
      />

      <CreateSearchAlert
        status={createSearchAlertModalStatus}
        handleOnClose={createSearchAlertModalHandleClose}
      />

      <VideoModal
        status={videoModalStatus}
        candidateVideoUrl={candidateVideoUrl}
        handleOnClose={videoModalHandleClose}
      />
    </div >
  );
}
