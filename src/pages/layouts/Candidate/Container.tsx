import React, { ReactNode, ChangeEvent } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { tabChangeRequest } from "../../../reducers/companyPortal/tabChange.reducer";
import { companyPrefix } from "../../../routes/app.routes";
import { getCurrentTab } from "../../../utils/helper";
import Content from './Content';
import isUndefined from "lodash/isUndefined";
const _ = { isUndefined };
interface ContainerProps {
  children?: ReactNode;
}

const Container = (props: ContainerProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { children } = props;
  const { tab, loading } = useSelector(({ company }) => company.tab);
  const value = _.isUndefined(tab) ? getCurrentTab(children) : tab;
  const onHandleChange = (event: ChangeEvent<{}>, value: string) => {
    dispatch(tabChangeRequest({ tab: value }));
    history.push(`/${companyPrefix}/${value}`);
  };
  return (
    <Content value={value} loading={loading} children={children} />
  );
}
export default Container;
