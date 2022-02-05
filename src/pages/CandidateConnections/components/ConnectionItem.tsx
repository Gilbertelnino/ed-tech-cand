import _ from "lodash";
import React, { useState } from "react";
import { Button, Input, UserAvatar } from "../../../components/common";
import DeclineRequestModal from "./DeclineRequestModal";
import { updateCandidateConnectionRequest } from "../../../reducers/SearchAndConnect/searchAndConnect.reducer";
import { useDispatch } from "react-redux";
import CancelRequestModal from "./CancelRequestModal";

interface ConnectionItemProps {
  connection: any | null;
  isRequester: boolean;
  setDeclineModal?: any;
}

const ConnectionItem = ({ connection, isRequester }: ConnectionItemProps) => {
  const requestOrSender = isRequester ? "requester" : "follower";
  const dispatch = useDispatch();
  const [description, setDescription] = useState(false);
  const [showDeclineModal, setDeclineModal] = useState(false);
  const [showCancelModal, setCancelModal] = useState(false);

  const _handleAccept = () => {
    dispatch(updateCandidateConnectionRequest({ id: connection.id, type: "accepted" }));
  };

  return (
    <div className="connection-item-wrapper">
      <div className="avatar">
        {_.isEmpty(_.get(connection, `${requestOrSender}.profile_image`, "")) ? (
          <UserAvatar>S</UserAvatar>
        ) : (
          <UserAvatar src={_.get(connection, `${requestOrSender}.profile_image`, "")} />
        )}
      </div>
      <div>
        <div className="details">
          <div onClick={() => setDescription(!description)}>
            <h2>{`${_.get(connection, `${requestOrSender}.first_name`, "")} ${_.get(connection, `${requestOrSender}.last_name`, "")}`}</h2>
            <p>Microsoft</p>
          </div>
          <div>
            {isRequester ? (
              <>
                <Button
                  onClick={(e) => {
                    setDeclineModal(true);
                  }}
                  color="secondary"
                >
                  DECLINE
                </Button>
                <Button onClick={_handleAccept} color="primary">
                  ACCEPT
                </Button>
              </>
            ) : (
              <Button
                onClick={(e) => {
                  setCancelModal(true);
                }}
                color="secondary"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
        {description && <Input value={_.get(connection, "note", "")} name="description" placeholder="Description..." rows={5} multiline={true} />}
      </div>
      <DeclineRequestModal data={connection} status={showDeclineModal} handleOnClose={() => setDeclineModal(false)} />
      <CancelRequestModal data={connection} status={showCancelModal} handleOnClose={() => setCancelModal(false)} />
    </div>
  );
};

export default ConnectionItem;
