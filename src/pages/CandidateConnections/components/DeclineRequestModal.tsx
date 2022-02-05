import _ from "lodash";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal, Radio } from "../../../components/common";
import { connectionRequestsListRequest, updateCandidateConnectionRequest } from "../../../reducers/SearchAndConnect/searchAndConnect.reducer";

const DeclineRequestModal = (props) => {
  const [declineReason, setDeclineReason] = useState();
  const [declineText, setDeclineText] = useState("");
  const dispatch = useDispatch();
  const DECLINE_REASON_OPTIONS = useMemo(
    () => [
      {
        label: `I don’t know ${_.get(props, "data.requester.first_name")} ${_.get(props, "data.requester.last_name")}`,
        value: "1",
      },
      {
        label: `${_.get(props, "data.requester.first_name")} ${_.get(props, "data.requester.last_name")} profile is fake - Report`,
        value: "2",
      },
      {
        label: "Inappropriate approach or message - Report",
        value: "3",
      },
      {
        label: "Others",
        value: "4",
      },
    ],
    [props]
  );

  const _handleDeclineOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeclineReason(_.get(e, "target.value", ""));
  };

  const _handleDecline = () => {
    dispatch(
      updateCandidateConnectionRequest({
        id: _.get(props, "data.id"),
        type: "rejected",
        reject_reason: DECLINE_REASON_OPTIONS.find((reason) => reason.value === declineReason).label,
      })
    );
    setTimeout(
      function () {
        dispatch(connectionRequestsListRequest({ type: "received", page: 1, pageSize: 10 }));
        props.handleOnClose();
      }.bind(this),
      1000
    );
  };

  return (
    <>
      <Modal
        visible={props.status}
        size="large"
        title={`Reason to decline request`}
        className="decline-modal"
        closeButton={props.status}
        onClose={props.handleOnClose}
      >
        <p>Please select a reason from the following list for decline connection request.</p>
        <Radio
          name="decline-reason"
          wrapperClassName="decline-radio-wrapper w-100"
          externalLabel={{ label: "Reason to decline connection request" }}
          labelClassName="decline-radio"
          defaultValue={DECLINE_REASON_OPTIONS[0].value}
          onChange={_handleDeclineOption}
          options={DECLINE_REASON_OPTIONS}
        />
        {declineReason === "4" && (
          <Input
            value={declineText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeclineText(e.target.value)}
            className="decline-input"
            name="decline-input"
            placeholder="Add Your Reason for decline connection"
          />
        )}
        <div className="decline-modal-footer">
          <Button onClick={_handleDecline} color="primary">
            Save
          </Button>
          <Button onClick={props.handleOnClose} color="secondary">
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeclineRequestModal;
