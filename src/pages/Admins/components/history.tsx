import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, isUndefined, get } from "lodash";
import { useForm } from "react-hook-form";
import { pluckFromArray } from "../../../utils/helper";
import { getAdminRequest, getAdminAuditLogRequest } from "../../../reducers/company/companyAdmins.reducer";
import { Modal, Spinner, SelectNew } from "../../../components/common";
import moment from "moment";

interface HistoryElementProp {
  action: string; created_at: string;
}

const _ = { isEmpty, isUndefined, get };

const getHistory = (auditLog: Array<HistoryElementProp>) => {
  const option = [];
  if (_.isEmpty(auditLog)) {
    option.push(
      <li className="no-history">
        No history available for this admin
      </li>
    )
  } else {
    for (let index = 0; index < 3; index++) {
      !_.isUndefined(auditLog[index]) && (
        option.push(
          <li>
            {_.get(auditLog[index], 'action', "")}
            <span className="time-ago">{moment(_.get(auditLog[index], 'created_at', "")).fromNow()}</span>
          </li>
        )
      )
    }
  }
  return option;
}

const History = (props) => {

  const dispatch = useDispatch();
  const { showModal, handleClose } = props;
  const { companyAdmins: { list, detail, history, detailLoading, auditLogLoading } } = useSelector(({ company }) => company);
  const { control, watch, getValues } = useForm();
  const setOption = pluckFromArray(list, 'id', 'name', 'value', 'label');
  const selectedAdmin = setOption.find(admin => admin.value === _.get(detail, "id", 0)) || "";
  const loading = detailLoading || auditLogLoading;
  const watchAdminChange = watch("admin_name"); // Watch admin change to reset the detail.

  // Admin change Hook.
  useEffect(() => {
    const adminData = getValues("admin_name");
    const adminId = _.get(adminData, 'value', 0);
    if (adminId !== 0) {
      dispatch(getAdminRequest(adminId));
    }
  }, [watchAdminChange]);

  // Admin Detail Change Hook.
  useEffect(() => {
    if (!_.isEmpty(detail)) {
      const adminId = _.get(detail, 'id', 0);
      dispatch(getAdminAuditLogRequest(adminId));
    }
  }, [detail]);

  return (
    <Modal
      visible={showModal}
      size="x-large"
      title={`Action History`}
      loading={loading}
      className="admin-profile-view-modal admin-action-history"
      closeButton={showModal}
      onClose={handleClose}
    >
      <Spinner visible={loading} >
        <div className="admin-profile-header-dd">
          <SelectNew
            name="admin_name"
            className="select-box admin-profile-dropdown"
            options={setOption}
            defaultValue={selectedAdmin}
            isSearchable={true}
            control={control}
          />
        </div>
        <div className="profile-modal-header">
          <div className="admin-modal-body">
            <div className="admin-history-wrapper">
              <ul className="slim-scrollbar">
                {getHistory(history)}
              </ul>
            </div>
          </div>
        </div>
      </Spinner>
    </Modal>
  );
};

export default History;