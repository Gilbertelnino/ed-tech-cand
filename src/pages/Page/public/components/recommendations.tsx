import React from "react";
import facebook from "../../../../assets/images/facebook1.jpg";
import newEngen from "../../../../assets/images/newengen.png";
// import amazon from "../../../../assets/images/atoz_amazon.png";
import amazon from "../../../../assets/images/clients/amazon.png";
import pge from "../../../../assets/images/clients/pge.png";
import extrahopn from "../../../../assets/images/clients/extrahop.png";
import picnic from "../../../../assets/images/clients/picnic.png";
import neu from "../../../../assets/images/clients/Neu.png";

import {Container} from "@material-ui/core";

const Recommendations = () => {
  return (
    <Container maxWidth="lg">
    <div className="company-recommendations-section">
      <h4 className="title">You May Also Be Interested In</h4>
      <div className="recommendations">
        <div className="company-logo"> 
          <img src={amazon}/>
        </div>
        <div className="company-logo">  
          <img src={newEngen} /> {" "}
        </div>
        
        <div className="company-logo"> 
          <img src={pge}  />
        </div>
        <div className="company-logo"> 
          <img src={picnic}  />
        </div>
        <div className="company-logo">  
          <img src={extrahopn} />
        </div>
        <div className="company-logo"> 
          <img src={neu}/>
        </div>
      </div>

    </div>
    </Container>
  )
}

export default Recommendations;