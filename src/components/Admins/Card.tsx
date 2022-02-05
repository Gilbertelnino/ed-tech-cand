import React, { useState } from "react";
import MuiCard from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";

import Button from "./../common/Button";
import Modal from "./../common/Modal";

interface AdminCard {
  children: React.ReactNode;
  className?: string;

  adminName?: string;
  adminJobTitle?: string;
  adminImage?: string;
  adminActivityHistory?: any;

  loading?: Boolean;
  loaderSize?: number;
  [key: string]: any;
}

const Card = ({ children, className, adminName, adminJobTitle, adminImage, adminActivityHistory, adminEmail, adminCompanyDepartment, adminPhone, adminRegisteredDate, ...props }) => {
  const [openActivityHistoryModal, setOpenActivityHistoryModal] = useState(false);
  //const [onCloseActivityHistoryModal, setOnCloseActivityHistoryModal] = useState(false);

  const [openAdminProfileModal, setOpenAdminProfileModal] = useState(false);

  const [currentAdmin, setAdmin] = useState("");


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAdmin(event.target.value as string);
  };

  const displayActivityHistory = (activity) => {
    return (
      <li>

        {
          activity.type === "referred candidate" ? (
            <div>
              referred the following candidate(s) {" "}
              {
                activity.candidates.map(candidate => {
                  if (activity.candidates.indexOf(candidate) !== activity.candidates.length - 1) {
                    return candidate + ", ";
                  } else {
                    return candidate;
                  }
                })
              }
              {" "} for {" "} {activity.jobs ? activity.jobs[0] : ""}
            </div>
          ) : (
            <div>
              created the following job(s): {" "}
              {
                activity.jobs.map(job => {
                  if (activity.jobs.indexOf(job) !== activity.jobs.length - 1) {
                    return job + ", ";
                  } else {
                    return job;
                  }
                })

              }

            </div>
          )
        }
        {activity.date}
      </li>
    )


  }

  return (
    <MuiCard
      className={className}
    >
      <div className="admin-info">
        <div className="admin-img">
          <img src={adminImage} alt={adminName} />
        </div>

        <div className="admin-basic-info">
          <div className="admin-name">{adminName}</div>
          <div className="admin-job">{adminJobTitle}</div>
        </div>

        <div className="admin-buttons">
          <div className="admin-profile-button">
            <Button
              color="dark-pink"
              className="profile-button"
              onClick={() => setOpenAdminProfileModal(true)}
            >
              Profile
            </Button>

          </div>
          <div className="admin-message-button">
            <Button
              color="dark-pink"
              className="message-button"
            >
              Message
            </Button>
          </div>
        </div>
      </div>


      <div className="admin-activity-history">
        {
          adminActivityHistory.length > 0 ? (
            <ul>
              {
                adminActivityHistory.map(activity => {
                  return displayActivityHistory(activity);
                })
              }
            </ul>
          ) : (
            <div>No activity history</div>
          )
        }
      </div>

      <div className="manage-buttons">
        <div className="activity-history-button">
          <Link
            className="activity-history-link"
            onClick={() => {
              setOpenActivityHistoryModal(true)
              setAdmin(adminName)
            }}
          >
            View Activity History
          </Link>

        </div>

        <div className="remove-admin-button">
          <Link
            className="remove-admin-link"
          >
            Remove Admin
          </Link>
        </div>
      </div>

      <Modal
        className="admin-profile-modal"
        visible={openAdminProfileModal}
        closeOnBackDrop={true}
        closeButton={true}
        size="medium"
        loading={false}
        onClose={() => setOpenAdminProfileModal(false)}

      >
        <div className="admin-profile-modal-header">
          <div className="title">
            Admin Profile
          </div>

          <div className="admins-list">
            {/* focusing on main funcationality, then will add select form */}
          </div>
        </div>

        <div className="admin-profile-info">
          <div className="admin-img">
            <img src={adminImage} alt={adminName} />
          </div>

          <div className="admin-info">
            <div className="admin-name">{adminName}</div>
            <div className="admin-registered-date" style={{ color: "#767676" }}>Registered on {" "} {adminRegisteredDate}</div>
            <div className="admin-id"><b>Employee ID:</b> {" "} 12341</div>
            <div className="admin-email"><b>Company Email:</b> {" "} {adminEmail}</div>
            <div className="admin-job-title"><b>Company Role:</b> {" "} {adminJobTitle}</div>
            <div className="admin-company-dept"><b>Company Department:</b> {" "} {adminCompanyDepartment}</div>
            <div className="admin-phone"><b>Contact Info:</b> {" "} {adminPhone}</div>
          </div>
        </div>
      </Modal>
      <Modal
        className="admin-history-modal"
        visible={openActivityHistoryModal}
        closeOnBackDrop={true}
        closeButton={true}
        size="x-large"
        loading={false}
        onClose={() => setOpenActivityHistoryModal(false)}
      >
        <div className="admin-activity-history-modal">

          <div className="activity-history-basic-info">
            <div className="title">Activity History</div>

            <div className="admins-list">
              {/* focusing on main funcationality, then will add select form */}
            </div>
          </div>

          <div className="activity-history">
            {
              adminActivityHistory.length > 0 ? (
                <ul>
                  {
                    adminActivityHistory.map(activity => {
                      return displayActivityHistory(activity);
                    })
                  }
                </ul>
              ) : (
                <div>No activity history</div>
              )
            }
          </div>

          <div className="export-csv-button">

          </div>
        </div>
      </Modal>

    </MuiCard>


  )
}

export default Card;
