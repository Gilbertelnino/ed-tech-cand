import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { get, isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { pluckFromArray } from "../../../utils/helper";
import { getAdminRequest } from "../../../reducers/company/companyAdmins.reducer";
import unknownProfile from "../../../assets/images/unknownProfile.jpeg";
import { Modal, Spinner, SelectNew } from "../../../components/common";
import moment from "moment";

const _ = { isEmpty, get };

const View = (props) => {

  const dispatch = useDispatch();

  const { showModal, handleClose } = props;

  const { companyAdmins: { list, detail, detailLoading } } = useSelector(({ company }) => company);

  const imagePath = _.isEmpty(detail.profile_image) ? unknownProfile : detail.profile_image;
  const { control, watch, getValues } = useForm();

  const watchAdminChange = watch("admin_name"); // Watch admin change to reset the detail.

  // Admin change Hook.
  useEffect(() => {
    const adminData = getValues("admin_name");
    const adminId = _.get(adminData, 'value', 0);
    if (adminId !== 0) {
      dispatch(getAdminRequest(adminId));
    }
  }, [watchAdminChange]);

  const setOption = pluckFromArray(list, 'id', 'name', 'value', 'label');
  const selectedAdmin = setOption.find(admin => admin.value === _.get(detail, "id", 0)) || "";
  const adminName = `${_.get(detail, 'first_name', '')} ${_.get(detail, 'last_name', '')}`;
  const registeredOn = moment(_.get(detail, 'adminInvite.updated_at', '')).format("MMM D, YYYY");
  const companyEmail = _.get(detail, 'email', '');
  const employeeId = _.get(detail, 'employee_id', 'N/A');
  const companyRole = _.get(detail, 'jobTitle.title', '');
  const contactInfo = _.get(detail, 'contact_info', '');

  return (
    <Modal
      visible={showModal}
      size="x-large"
      title={`Admin Profile`}
      loading={detailLoading}
      className="admin-profile-view-modal"
      closeButton={showModal}
      onClose={handleClose}
    >
      <Spinner visible={detailLoading} >
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
          <div className="admin-profile-intro">
            <div className="admin-card-profile">
              <img className="profile-image" src={imagePath} />
            </div>

            <div className="admin-card-detail">
              <div className="admin-card-intro">
                <div className="admin-name">
                  <Typography className="admin-profile-title">
                    {adminName}
                  </Typography>
                </div>
                <div className="admin-registered-on">
                  <Typography className="heading-registered-date">
                    Registered on {registeredOn}
                  </Typography>
                </div>
              </div>
              <div className="admin-modal-body">
                <p> <b>Employee ID:</b>  <span>{employeeId}</span> </p>
                <p> <b>Company Email:</b>  <span>{companyEmail}</span> </p>
                <p> <b>Company Role:</b>  <span>{companyRole}</span> </p>
                <p> <b>Company Department:</b>  <span>Human Resources</span> </p>
                <p> <b>Contact Info:</b>  <span>{contactInfo}</span> </p>
              </div>
            </div>
          </div>
        </div>
      </Spinner>
    </Modal>
  );
};

export default View;