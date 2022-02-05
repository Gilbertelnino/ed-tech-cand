import React from "react";
import ProfileUser from "../../../../assets/svg/profile-user.svg";
import { get } from "lodash";

const _ = { get };

const testData = [

  {
    "name": "Preet Sohi",
    "role": "Chief Executive Officer"
  }, 
  {
    "name": "Zellie Macabata",
    "role": "Chief Technology Officer"
  },
  {
    "name": "Catherine Zang",
    "role": "Product Designer"
  }

  
];


const Leaders = () => {
  return (
    <div className="public-leaders-section">
      <h4 className="title">Our HER Leaders</h4>
      <br />
      <div className="leaders">
        {
          (testData || []).map((leader) => {
            return (
              <div className="public-leaders mr-25">
                <img src={ProfileUser} className="icon" />
                <div className="leader">

                  {_.get(leader, "name", "") || ""} 
                  <br />
                  {_.get(leader, "role", "") || ""}
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