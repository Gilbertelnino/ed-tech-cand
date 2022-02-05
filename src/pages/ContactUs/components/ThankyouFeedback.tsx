import React from "react";
import { Button } from "../../../components/common";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

interface IThankyouFeedback {
  setShowForm: (formType: string) => void
}


const ThankyouFeedback = (props: IThankyouFeedback) => {

  return (
    <div className="text-center">
      <CheckCircleOutlineOutlinedIcon className="circle-success" />
      <h3>Thank you</h3>
      <p>We’ll use your feedback to improve the experience.</p>
      <Button
        size="small"
        color="transparent"
        onClick={() => props.setShowForm("index")}
      >Close</Button>
    </div>
  )
}

export default ThankyouFeedback;
