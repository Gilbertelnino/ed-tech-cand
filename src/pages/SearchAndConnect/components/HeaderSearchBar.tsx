import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import { InputAdornment, CircularProgress } from '@material-ui/core/';
import { Input, Button } from "../../../components/common";
import SearchIcon from '@material-ui/icons/Search';
import Modal from "../../../components/common/Modal";
import articleImg from "../../../assets/images/article.png";
import unknownProfile from "../../../assets/images/unknownProfile.jpeg";
import UserAvatar from "../../../components/common/UserAvatar";
import { getInitialLetter } from "../../../utils/helper";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { searchListRequest, searchAllRequest } from "../../../reducers/SearchAndConnect/searchAndConnect.reducer";
import appRoutes from '../../../routes/app.routes';
import { ReactComponent as CloseButton } from "../../../assets/svg/searchbar-close.svg";
import { ReactComponent as PlayButton } from "../../../assets/svg/play-button.svg";
import { openUrlInNewTab } from "../../../utils/helper";


const _ = { get, isEmpty };

const HeaderSearchBar = () => {

  const [openSearchModal, setSearchModal] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const { search: { data, searchModalLoader } } = useSelector(({ search }) => search);
  const users = _.get(data, "user", {});
  const companies = _.get(data, "company", {});
  const dispatch = useDispatch();
  const history = useHistory();

  let searchDelay: any = null;

  const handleOpenSearchModal = () => {
    setSearchModal(true);
  }

  const viewPublicProfile = (slug: string) => {
    openUrlInNewTab(appRoutes.candidatePublicProfile.generateFullPath(slug));
  }

  const viewCompanyPublicProfile = (slug: string) => {
    openUrlInNewTab(appRoutes.companyPublicPageJobs.generatePath(slug));
  }

  const getUserCard = (data) => {
    return (
      <div onClick={() => viewPublicProfile(_.get(data, "slug", ""))} className="search-data-details">
        <div className="search-data-details-left-wrapper">
          <div className="search-data-details-left">
            <UserAvatar
              size="xsm"
              className="cursor-pointer"
              src={_.get(data, "profile_image", { unknownProfile })}
              variant="circle"
            >
              {/* Fallback initial letters of candidate */}
              <span className="text-black">{getInitialLetter(`${_.get(data, "first_name", "")} ${_.get(data, "last_name", "")}`)}</span>
            </UserAvatar>
          </div>

          <div className="search-data-details-middle">

            <h4>{`${_.get(data, "first_name", "")} ${_.get(data, "last_name", "")}`}</h4>
            <p>{_.get(data, "candidateProfile.job_title", "")}</p>

          </div>
        </div>
        <div className="search-data-details-right">
          <PlayButton />
        </div>
      </div>
    )
  }

  const getCompanyCard = (data) => {
    return (
      <div onClick={() => viewCompanyPublicProfile(_.get(data, "User.slug", ""))} className="search-data-details">
        <div className="search-data-details-left-wrapper">
          <div className="search-data-details-left">
            <UserAvatar
              size="xsm"
              className="cursor-pointer"
              src={_.get(data, "User.profile_image", { unknownProfile })}
              variant="circle"
            >
              {/* Fallback initial letters of candidate */}
              <span className="text-black">{getInitialLetter(`${_.get(data, "company_name", "")}`)}</span>
            </UserAvatar>
          </div>

          <div className="search-data-details-middle">

            <h4>{_.get(data, "company_name", "")}</h4>
            <p>{_.get(data, "location", "")}</p>

          </div>
        </div>
        <div className="search-data-details-right">
          <PlayButton />
        </div>
      </div>
    )
  }

  const getResultArticleCard = () => {
    return (
      <div className="search-data-details">
        <div className="search-data-details-left-wrapper">
          <div className="search-data-details-left">
            <img src={articleImg} />
          </div>

          <div className="search-data-details-middle">

            <h4>The pandemic and the long haul</h4>
            <p>5512 <br /> Viewers</p>

          </div>
        </div>
        <div className="search-data-details-right">
          <ChevronRightIcon />
        </div>
      </div>
    )
  }

  const handleCloseSearchModal = () => {
    setSearchModal(false);
    setSearchTerms("");
  }

  const handleInstantSearch = (text: string) => new Promise(resolve => {
    clearTimeout(searchDelay);
    setSearchTerms(text);
    searchDelay = setTimeout(async () => {
      if (!_.isEmpty(text)) {
        resolve(dispatch(searchListRequest({ q: text, type: 'all', pageSize: 2 })));
      }
    }, 1000);
  });

  const getAllResult = (resultType) => {
    setSearchModal(false);
    dispatch(searchAllRequest({ q: searchTerms, type: resultType, allResult: true, pageSize: 21 }));
    history.push(appRoutes.searchAndConnect.path);
  };

  const getSearchModal = () => {

    return (
      <Modal
        visible={openSearchModal}
        closeOnBackDrop={true}
        onClose={handleCloseSearchModal}
        className={searchTerms && users ? "search-modal-container modal-result-container" : "search-modal-container"}
      >
        <div className="search-modal-header">
          <Input
            name="input_search"
            className="navbar-searchBox"
            type="text"
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchTerms}
            autoFocus
            onChange={(e) => handleInstantSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end" className="navbar-searchBoxIconContainer">
                  <SearchIcon className="navbar-searchBoxIcon" />
                </InputAdornment>
              ),
            }}
          />
          <CloseButton className="navbar-searchBox-close" onClick={handleCloseSearchModal} />
        </div>
        {searchModalLoader ? <div className="search-loading"> <CircularProgress size={30} /> </div> :
          users.count || companies.count && searchTerms ?
            <>
              <div className="devider"></div>
              <div className="search-modal-content">

                {users.count ?
                  <>
                    <div className="result-type-and-count">
                      <span className="result-type">Users</span>
                      <div className="result-count"> <span onClick={() => getAllResult("user")}> All users ({_.get(users, "count", 0)}+) </span> </div>
                    </div>
                    {(users.rows || []).map((row) => {
                      return getUserCard(row)
                    })}
                  </>
                  : ""}

                {companies.count ?
                  <>
                    <div className="result-type-and-count">
                      <span className="result-type">Companies</span>
                      <div className="result-count"> <span onClick={() => getAllResult("company")}> All companies ({_.get(companies, "count", 0)}+) </span> </div>
                    </div>
                    {(companies.rows || []).map((row) => {
                      return getCompanyCard(row)
                    })}
                  </>
                  : ""}
              </div>

              <div className="search-modal-footer">
                <Button onClick={() => getAllResult("user")} className="all-result-button">
                  ALL RESULTS ({_.get(users, "count", 0) + _.get(companies, "count", 0)}+)
                </Button>
              </div>
            </>
            :
            <div className="search-modal-content">
              {searchTerms && !users.count ?
                <div className="result-not-found">No results found</div>
                : ""}

              {!searchTerms ?
                <div className="search-result-note">Try searching for company or candidate</div>
                : ""}
            </div>
        }

      </Modal>
    );
  };

  return (

    <div className="navbar-search-redesign">
      <Input
        name="input_search"
        className="navbar-searchBox"
        type="text"
        variant="outlined"
        size="small"
        placeholder="Search"
        value={searchTerms}
        onClick={() => handleOpenSearchModal()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end" className="navbar-searchBoxIconContainer">
              <SearchIcon className="navbar-searchBoxIcon" />
            </InputAdornment>
          ),
        }}
      />
      {getSearchModal()}
    </div>

  )
}


export default HeaderSearchBar;
