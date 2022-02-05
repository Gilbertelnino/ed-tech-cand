import React from "react";
import newEngen from "../../../../assets/images/newengen.png";
import facebook from "../../../../assets/images/facebook1.jpg";
import amazon from "../../../../assets/images/atoz_amazon.png";

const Recommendations = () => {
  return (
    <div className="company-recommendations-section">
      <h4 className="title">You May Also Be Interested In</h4>
      <div className="recommendations">
        <img src={newEngen} className="recommendation" /> {" "}
        <img src={amazon} className="recommendation" />
      </div>

    </div>
  )
}

export default Recommendations;