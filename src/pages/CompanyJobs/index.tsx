import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import JobList from "./components/List";
import Actions from "./components/Actions";
import { tabChangeRequest } from "../../reducers/company/tabChange.reducer";
import { getJobRequest, jobAddFilter, jobDetailReset } from "../../reducers/job/jobs.reducer";
import appRoutes from '../../routes/app.routes';
import { isUndefined } from "lodash";

const _ = { isUndefined };

const Jobs = (props) => {

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyProfile: { data: { slug } } } = useSelector(({ company }: any) => company);
  const { jobs: { jobFilter: jobFilter } } = useSelector(({ job }: any) => job);
  
  const handleTabClick = (type: string) => {
    dispatch(tabChangeRequest({ tab: 'jobs', innerTab: type }));
    dispatch(jobAddFilter({ ...jobFilter, public: type === 'Drafts' ? "0" : "1" }));
    if(type === 'Archive'){
      history.push(appRoutes.companyJobsArchive.path);
    }else if(type === 'Drafts'){
      history.push(appRoutes.companyJobsDrafts.path);
    } else {
      history.push(appRoutes.companyJobs.path);
    }
  };

  const handleClose = () => {
		dispatch(jobDetailReset());
		setOpen(false);
	};

	const handleOpen = (_id = undefined) => {
		!_.isUndefined(_id) && dispatch(getJobRequest({ id: _id }));
		setOpen(true);
	};
  const handleSearch = (text: any) => {
    if (text.trim() === '') return false;
    dispatch(jobAddFilter({ ...jobFilter, page: page, q: text.trim() }));
  };

  const setProfilePreview = () => {
    if (!_.isUndefined(slug)) {
      const win = window.open(appRoutes.companyPublicPageJobs.generatePath(slug), "_blank");
      win.focus();
    }
  }

  const handleButtonClick = (type: string, text: any) => {
    switch (type) {
      case "Add":
        setOpen(true);
        break;
      case "Archive":
      case "Drafts":
      case "All":
        handleTabClick(type);
        break;
      case "Search":
        handleSearch(text);
        break;
      case "Preview":
        setProfilePreview()
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Actions handleClick={handleButtonClick} {...props} />
      <div className='company-body-content job-body-content shadow-box'>
        <div className="page-jobs">
          <div className="jobs-wrapper">
            <div className="job-content">
              <div className="job-list">
                <JobList 
                  open={open}
                  page={page}
                  setPage={setPage}
                  handleOpen={handleOpen}
                  handleClose={handleClose}                
                  {...props} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Jobs;
