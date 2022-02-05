import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import List from "./components/List";
import Actions from './components/Actions';
import { adminAddFilter, getAdminRequest, adminDetailReset, adminHistoryReset } from "../../reducers/company/companyAdmins.reducer";

const Admins = (props) => {

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = (text: any) => {
    const param = { page: page, q: text };
    dispatch(adminAddFilter({ ...param }));
  };

  const handleButtonClick = (type: string, text: any) => {
    switch (type) {
      case "Add":
        setOpen(true);
        break;
      case "Search":
        handleSearch(text);
        break;
      default:
        break;
    }
  };

  const handleAdminDetailModal = (id = 0) => {
    if (id !== 0) {
      dispatch(getAdminRequest(id));
    } else {
      dispatch(adminDetailReset());
    }
    setShowDetail(!showDetail);
  }

  const handleAdminHistoryModal = (id = 0) => {
    if (id !== 0) {
      dispatch(getAdminRequest(id));
    } else {
      dispatch(adminDetailReset());
      dispatch(adminHistoryReset());
    }
    setShowHistory(!showHistory);
  }

  return (
    <>
    <Actions showDetail={showDetail} showHistory={showHistory} handleAdminHistoryModal={() => handleAdminHistoryModal()} handleAdminDetailModal={() => handleAdminDetailModal()} handleClick={handleButtonClick}/>
    <div className="shadow-box">
      <div className="page-admins">
        <div className="admin-list-wrapper">
          <List 
            {...props} 
            page={page} 
            open={open} 
            setPage={setPage} 
            setOpen={setOpen} 
            showDetail={showDetail}
            showHistory={showHistory}
            handleButtonClick={handleButtonClick} 
            handleAdminDetailModal={() => handleAdminDetailModal()}
            handleAdminHistoryModal={() => handleAdminHistoryModal()} 
          />
        </div>
      </div>
    </div>
    </>
  );
}
export default Admins;