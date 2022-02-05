import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminListRequest, deleteAdminRequest, adminAddFilter, getAdminRequest, adminReset, adminDetailReset, adminHistoryReset, adminAllListRequest, reSendInvitationRequest } from "../../../reducers/company/companyAdmins.reducer";
import { Scrollbars } from "react-custom-scrollbars";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { isEmpty, get } from "lodash";
import FlashMessage from "../../../components/common/FlashMessage";
import AdminDeleteModal from "./remove";
import History from "./history";
import Cards from "./cards";
import View from "./view";
import Form from "./form";

const _ = { isEmpty, get };

const List = (props) => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isDeleteModalShow, setDeleteModalShow] = useState(false);
  const [isDeleteAdminId, setDeleteAdminId] = useState(0);
  const [invitationId, setInvitationId] = useState(0);
  const {
    companyAdmins: {
      data,
      list,
      loading,
      message,
      pagination,
      deleteflag,
      adminFilter,
      reInvitedFlag,
      reInviteLoading
    },
  } = useSelector(({ company }) => company);

  useEffect(() => {
    //props.setButtonClick(handleButtonClick);
    dispatch(adminListRequest({ page: 1 }));
    _.isEmpty(list) && dispatch(adminAllListRequest());
  }, []);

  // admin Filter Hook
  useEffect(() => {
    !_.isEmpty(adminFilter) && dispatch(adminListRequest({ ...adminFilter }));
  }, [adminFilter]);

  // Delete admin success Hook
  useEffect(() => {
    if (deleteflag === true) {
      dispatch(adminReset());
      handleDeleteModalClose();
      dispatch(adminListRequest({ ...adminFilter }));
    }
  }, [deleteflag]);

  // API error message Hook
  useEffect(() => {
    if (!_.isEmpty(message)) {
      FlashMessage(message, "error");
      dispatch(adminDetailReset());
    }
  }, [message]);

  // re-send invite API success message Hook
  useEffect(() => {
    if (reInvitedFlag === true) {
      FlashMessage("Invitation email sent successfully.");
      setInvitationId(0);
    }
  }, [reInvitedFlag]);

  const handleButtonClick = (type: string, text: any) => {
    switch (type) {
      case "Add":
        setOpen(true);
        break;
      case "search":
        handleSearch(text);
        break;
      default:
        break;
    }
  };

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    dispatch(adminAddFilter({ ...adminFilter, page: value }));
  };

  const handleAdminCreateModal = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteAdminRequest(id));
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

  const handleDeleteModalOpen = (_id) => {
    setDeleteAdminId(_id);
    setDeleteModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalShow(false);
  };

  const handleSearch = (text: any) => {
    const param = { page: page, q: text };
    dispatch(adminAddFilter({ ...param }));
  };

  const sendInvitation = (id: number) => {
    setInvitationId(id);
    dispatch(reSendInvitationRequest(id));
  }

  return (
    <>
      <Scrollbars
        renderThumbHorizontal={() => <div />}
        renderView={({ children }) => (
          <div className="admin-list">
            {children}
          </div>
        )}
        className="admin-list-scroller"
      >
        <Grid container xs={12} spacing={2} className="admin-block-wrap">
          <Cards
            data={data}
            loading={loading}
            handleOpen={(id) => handleAdminDetailModal(id)}
            handleRemove={(id) => handleDeleteModalOpen(id)}
            viewHistory={(id) => handleAdminHistoryModal(id)}
            handleAdd={() => handleButtonClick("Add", '')}
            handleSendInvite={(id) => sendInvitation(id)}
            invitationId={invitationId}
            reInviteLoading={reInviteLoading}
          />
          <Form showModal={open} handleClose={() => handleAdminCreateModal()} />
          <View showModal={showDetail} handleClose={() => handleAdminDetailModal()} />
          <History showModal={showHistory} handleClose={() => handleAdminHistoryModal()} />
          <AdminDeleteModal
            loading={loading}
            visible={isDeleteModalShow}
            handleClose={() => handleDeleteModalClose()}
            id={isDeleteAdminId}
            handleDelete={(id) => handleDelete(id)}
          />
        </Grid>
      </Scrollbars>
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
    </>
  );
};

export default List;
