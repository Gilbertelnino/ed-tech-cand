import _ from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "../../../components/common";
import { connectionRequestsListRequest, updateCandidateConnectionRequest } from "../../../reducers/SearchAndConnect/searchAndConnect.reducer";

const CancelRequestModal = (props) => {
  const dispatch = useDispatch();
  const _handleCancel = () => {
    dispatch(
      updateCandidateConnectionRequest({
        id: _.get(props, "data.id"),
        type: "cancelled",
      })
    );
    setTimeout(
      function () {
        dispatch(connectionRequestsListRequest({ type: "sent", page: 1, pageSize: 10 }));
        props.handleOnClose();
      }.bind(this),
      1000
    );
  };
  return (
    <Modal
      visible={props.status}
      size="large"
      title={`Cancel sent request`}
      className="decline-modal"
      closeButton={props.status}
      onClose={props.handleOnClose}
    >
      <p>If you cancel the previously sent conection request now, You wonn’t be able to resend it to the same person for up to the next 72 hours.</p>
      <div className="decline-modal-footer">
        <Button onClick={_handleCancel} color="primary">
          Okay
        </Button>
        <Button onClick={props.handleOnClose} color="secondary">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CancelRequestModal;
