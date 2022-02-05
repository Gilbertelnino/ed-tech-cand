import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { isEmpty, get, isUndefined } from "lodash";
import unknownProfile from "../../../assets/images/unknownProfile.jpeg";
import { Button } from "../../../components/common";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import NoAdminsFound from "./noAdminsFound";
import SendIcon from '@material-ui/icons/Send';

const _ = { isEmpty, get, isUndefined };

const getHistory = (auditLog: Array) => {
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


const Cards = (props) => {

  const { data, handleOpen, viewHistory, handleAdd, handleRemove, loading, handleSendInvite, reInviteLoading, invitationId } = props;

  let cards = [];
  if (loading) {
    cards = [1, 2, 3].map((i) => {
      return (
        <Grid item xs={12} sm={6} lg={4} spacing={2} className="admin-card-wrapper">
          <Skeleton className="admin-card-skeleton" />
        </Grid>
      )
    });
  } else if (_.isEmpty(data)) {
    return <NoAdminsFound handleClick={() => handleAdd()} />
  } else {

    cards = (data || []).map((admin) => {
      const imagePath = _.isEmpty(admin.profile_image) ? unknownProfile : admin.profile_image;
      const auditLog = _.get(admin, "auditLog", []);
      const adminName = `${_.get(admin, "first_name", "")} ${_.get(admin, "last_name", "")}`;
      const adminTitle = _.get(admin, "jobTitle.title", "");
      const adminId = _.get(admin, "id", 0);
      const isInactive = _.get(admin, "status", 0) === 2;
      return (
        <Grid item xs={12} sm={6} lg={4} spacing={2} className="admin-card-wrapper">
          <div className={`admin-card ${isInactive && "inactive"}`}>
            <div className="admin-card-header">
              <div className="admin-card-header-iner-wrap">
                <div className="admin-card-profile">
                  <img className="profile-image" src={imagePath} />
                </div>
                <div className="admin-card-intro">
                  <div className="admin-name">
                    <Typography className="heading-title">
                      {adminName}
                    </Typography>
                  </div>
                  <div className="admin-position">
                    <Typography className="heading-position">
                      {adminTitle}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="admin-card-profile-msg-btn">
                <Button className="btn-small pink-btn" onClick={() => handleOpen(adminId)} disabled={isInactive}>Profile</Button>
                <Button variant="outlined" className="btn-small btn-transparent btn-small-transparant" disabled={isInactive}>Message</Button>
              </div>
            </div>
            <div className="admin-card-body">
              <ul>
                {
                  isInactive ? (
                    <li className="no-history"> 
                        <Button className="re-send-invite" variant="contained" loading={reInviteLoading && invitationId === adminId} startIcon={<SendIcon />} onClick={(e: any) => handleSendInvite(adminId)}> 
                            Re-Send Invite
                        </Button> 
                    </li>
                    ) : (
                      getHistory(auditLog)
                    )
                }
              </ul>
            </div>
            <div className="admin-card-footer">
              <Button className="btn-link-btn pink-btn" onClick={() => viewHistory(adminId)} disabled={isInactive}>View Action History</Button>
              <Button variant="outlined" className="btn-link-btn remove-admin" onClick={() => handleRemove(adminId)} disabled={isInactive}>Remove Admin</Button>
            </div>
          </div>
        </Grid>
      );
    });
  }
  return cards;
};

export default Cards;