import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionItem from "./components/ConnectionItem";
import { connectionRequestsListRequest } from "../../reducers/SearchAndConnect/searchAndConnect.reducer";
import NotificationBoxSkeleton from "../../components/Candidates/NotificationBoxSkeleton";
import _ from "lodash";
import NoNotificationFound from "../../components/Candidates/noNotificationFound";
import PaginationComponent from "../../components/common/Pagination";
import { Tabs } from "../../components/common";

const TABS = [
  {
    id: 1,
    label: "Received",
    component: <p>Received</p>,
  },
  {
    id: 2,
    label: "Sent",
    component: <p>Sent</p>,
  },
];

const ConnectionNotification = () => {
  const dispatch = useDispatch();
  //   const [page, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<any>(TABS[0]);
  const {
    search: { connectionsData, loading, pagination },
  } = useSelector(({ search }: any) => search);
  useEffect(() => {
    dispatch(connectionRequestsListRequest({ type: TABS.find((tab) => tab.id === active.id).label.toLowerCase(), pageSize: 10 }));
  }, [dispatch, active, page]);

  const _handlePaginationChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className="connection-notification-wrapper">
      <div className="title">
        <h1>Connections</h1>
      </div>
      <div className="connections-card-wrapper">
        <div className="head">
          <Tabs tabs={TABS} active={active} setActive={setActive} />
        </div>
        <div className="content">
          {loading ? (
            <NotificationBoxSkeleton />
          ) : _.isEmpty(connectionsData) ? (
            <NoNotificationFound label="connections" />
          ) : (
            <>
              {connectionsData.map((connection) => (
                <ConnectionItem isRequester={active.id === 1} connection={connection} />
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
