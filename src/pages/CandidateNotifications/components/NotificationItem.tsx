import _ from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, UserAvatar } from "../../../components/common";
import { clearNotificationRequest, notificationListRequest } from "../../../reducers/ConnectionNotification/connectionNotification.reducer";

interface NotificationItemProps {
  notification: any | null;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const dispatch = useDispatch();
  const _handleClear = () => {
    dispatch(clearNotificationRequest(notification.id));
    setTimeout(() => {
      dispatch(notificationListRequest({ page: 1, pageSize: 10 }));
    }, 1000);
  };
  return (
    <div className="connection-item-wrapper">
      <div className="avatar">
        {_.isEmpty(_.get(notification, `connection.follower.profile_image`, "")) ? (
          <UserAvatar>S</UserAvatar>
        ) : (
          <UserAvatar src={_.get(notification, `connection.follower.profile_image`, "")} />
        )}
      </div>
      <div>
        <div className="details">
          <div>
            <h2>
              You and{" "}
              <strong>
                {_.get(notification, "connection.follower.first_name")} {_.get(notification, "connection.follower.last_name")}{" "}
              </strong>
              are now Connected
            </h2>
            <p>{_.get(notification, "connection.note")}</p>
          </div>
          <div>
            <Button onClick={_handleClear} color="secondary">
              clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
