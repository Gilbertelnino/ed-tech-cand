import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./components/NotificationItem";
import { notificationListRequest } from "../../reducers/ConnectionNotification/connectionNotification.reducer";
import NoNotificationFound from "../../components/Candidates/noNotificationFound";
import _ from "lodash";
import NotificationBoxSkeleton from "../../components/Candidates/NotificationBoxSkeleton";
import PaginationComponent from "../../components/common/Pagination";

const ConnectionNotification = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {
    list: { notificationData, loading, pagination },
  } = useSelector(({ notification }: any) => notification);

  useEffect(() => {
    dispatch(notificationListRequest({ page, pageSize: 10 }));
  }, [dispatch, page]);

  const _handlePaginationChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className="connection-notification-wrapper">
      <div className="title">
        <h1>Notifications</h1>
      </div>
      <div className="connections-card-wrapper">
        <div className="content">
          {loading ? (
            <NotificationBoxSkeleton />
          ) : _.isEmpty(notificationData) ? (
            <NoNotificationFound label="notifications" />
          ) : (
            <>
              {notificationData.map((notification) => (
                <NotificationItem notification={notification} />
              ))}
            </>
          )}
        </div>
        <div className="pagination">
          <PaginationComponent
            count={_.get(pagination, "total", 0)}
            page={page}
            variant="outlined"
            color="secondary"
            onChange={(value) => _handlePaginationChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectionNotification;
