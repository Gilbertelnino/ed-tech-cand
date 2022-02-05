import React, { useRef } from "react";
import PeopleList from "./PeopleList";
import Actions from "./Actions"
import { useSelector } from "react-redux";
import appRoutes from "../../routes/app.routes";
import { openUrlInNewTab } from '../../utils/helper'

const People = (props) => {
  
  const { companyProfile: { data: { slug } } } = useSelector(({ company }: any) => company);
  const handleButtonClick = (type) => {
		switch (type) {
			case "Preview":
				setProfilePreview()
				break;
			default:
				break;
		}
	};
	const setProfilePreview = () => {
		if (slug) {
      openUrlInNewTab(appRoutes.companyPublicPagePeople.generatePath(slug))
		}
	}
  return(
  <>
  <Actions handleClick={handleButtonClick}/>
  <div className="page-people shadow-box">
    <div className="people-wrapper">
      <div className="people-content">
        <div className="people-list">
          <PeopleList {...props} />
        </div>
      </div>
    </div>
  </div>
  </>
  )
}
export default People;
