import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Videos from "./components/Videos";
import About from "./components/About";
import Leaders from "./components/Leaders";
import Recommendations from "./components/Recommendations";
import { getCompanyProfileDetailRequest } from "../../../reducers/company/companyPublicProfile.reducer";

const PublicHome = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyProfileDetailRequest({ slug: 'eh-company' }))
  }, []);

  return (
    <div>
      <br /><br />
      <About />
      <br /><br />
      <Leaders />
      <br /><br />
      <Videos />
      <br /><br />
      <Recommendations />
    </div>
  )
}

export default PublicHome;