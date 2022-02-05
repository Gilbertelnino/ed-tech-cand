import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminListRequest, deleteAdminRequest, adminAddFilter, getAdminRequest, adminReset, adminDetailReset, adminHistoryReset, adminAllListRequest, reSendInvitationRequest } from "../../../reducers/company/companyAdmins.reducer";
import { Scrollbars } from "react-custom-scrollbars";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { isEmpty, get } from "lodash";
import FlashMessage from "../../../components/common/FlashMessage";
import AdminDeleteModal from "./Remove";
import History from "./History";
import Cards from "./Cards";
import View from "./View";
import Form from "./Form";

const _ = { isEmpty, get };

const List = (props) => {

  const { open, setOpen, page, setPage, showHistory, showDetail, handleButtonClick, handleAdminHistoryModal, handleAdminDetailModal } = props;
  const dispatch = useDispatch();
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
  } = useSelector(({ company }:any) => company);

  useEffect(() => {
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

  const handleDeleteModalOpen = (_id) => {
    setDeleteAdminId(_id);
    setDeleteModalShow(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalShow(false);
  };

  const sendInvitation = (id: number) => {
    setInvitationId(id);
    dispatch(reSendInvitationRequest(id));
  }

  return (
    <>
      { showHistory ? <History handleClose={() => handleAdminHistoryModal()} /> :
      showDetail ? <View handleClose={() => handleAdminDetailModal()} /> :
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
          {/* <View showModal={showDetail} handleClose={() => handleAdminDetailModal()} /> */}
          {/* <History showModal={showHistory} handleClose={() => handleAdminHistoryModal()} /> */}
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
      }
    </>
  );
};

export default List;
