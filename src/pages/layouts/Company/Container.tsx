import React, { ChangeEvent, useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { tabChangeRequest } from "../../../reducers/company/tabChange.reducer";
import { getCompanyDetailRequest } from "../../../reducers/company/companyProfile.reducer";
import appRoutes, { companyPrefix } from "../../../routes/app.routes";
import { getCurrentTab } from "../../../utils/helper";
import SideBar from './SideBar';
import Content from './Content';
import { isEmpty, isUndefined, get } from "lodash";
import { rootReducersState } from '../../../reducers';

const _ = { isEmpty, isUndefined, get };
interface ContainerProps {
  children?: any;
}

const Container = (prop: ContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { children } = prop;
  const { props } = children;
  const { isPublic } = props;
  const { tab, loading } = useSelector(({ company }: any) => company.tab);
  const { companyProfile: { data } } = useSelector(({ company }: any) => company);
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const currentTab = getCurrentTab(children);
  const value = isPublic === true ? "page" : _.isUndefined(tab) ? currentTab : tab;
  const userData = _.get(sessionReducer, "currentUser", {});
  let existingImage = _.get(userData, "profile_image", "");
  const { companyProfile: { data: { profile_image, slug } } } = useSelector(({ company }: any) => company);
  const imagePath = profile_image ? profile_image : existingImage ? existingImage : "";

  useEffect(() => {
    if (_.isEmpty(data)) {
      if (currentTab !== "profile") {
        dispatch(getCompanyDetailRequest())
      }
    }
  }, [data]);

  if (currentTab !== value && isPublic !== true) {
    history.push(`/${companyPrefix}/${value}`);
  }
  const setProfilePreview = () => {
    if (!_.isUndefined(slug)) {
      const win = window.open(appRoutes.companyPublicPageHome.generatePath(slug), "_blank");
      win.focus();
    }
  }
  const onHandleChange = (event: ChangeEvent<{}>, value: string) => {
    if (value === 'preview') {
      return setProfilePreview();
    }
    dispatch(tabChangeRequest({ tab: value }));
    history.push(`/${companyPrefix}/${value}`);
  };
  return (
    <>
      {_.isUndefined(isPublic) && <SideBar profile={imagePath} value={value} handleChange={onHandleChange} />}
      <Content profile={imagePath} value={value} loading={loading} children={children} handleChange={onHandleChange} />
    </>
  );
}
export default Container;
