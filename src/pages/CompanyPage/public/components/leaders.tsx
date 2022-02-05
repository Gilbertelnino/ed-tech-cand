import React from "react";
import { useSelector } from "react-redux";
import { get, isEmpty } from "lodash";
import { Avatar } from '@material-ui/core';
import { getInitialLetter } from '../../../../utils/helper';

const _ = { get, isEmpty };

const Leaders = () => {

  const { companyPublicProfile: { data } } = useSelector(({ company }) => company);
  const companyPeople = _.get(data, 'companyPeople', []);
  return (
    <div className="public-leaders-section">
      {!_.isEmpty(companyPeople) && (<h4 className="title">Our HER Leaders</h4>)}
      <br />
      <div className="leaders">
        {
          (companyPeople || []).map((leader) => {
            return (
              <div className="public-leaders">
                <div className="public-leaders-avatar">
                  <Avatar
                    color="light-gray-color"
                    className="icon"
                    src={_.get(leader, "image", "")}
                    alt={_.get(leader, "leader_name", "")}
                    variant="circle"
                  >
                    {getInitialLetter(`${_.get(leader, "leader_name", "")}`)}
                  </Avatar>
                </div>
                <div className="leader">
                  <p>
                    {_.get(leader, "leader_name", "")}
                  </p>
                  <p>
                    {_.get(leader, "job_title", "")}
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Leaders;