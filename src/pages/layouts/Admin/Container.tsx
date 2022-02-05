import React,{ ReactNode, ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import dropdownData from "./SampleData";
import Dropdown from './Dropdowns';
import Content from './Content';

interface ContainerProps {
  children?: ReactNode;
}

const ContentHolder = (props: ContainerProps) => {
  const { children } = props;
  const onHandleChange = (event: ChangeEvent<{}>, value: string) => {
    /*Do dropdown change action here..*/
   };  
  return (
    <>
      <Container maxWidth="lg">
        <div className="admin-content-wrapper">
          <Dropdown handleChange={onHandleChange} data={dropdownData} />
          <Content children={children}  />
        </div>
      </Container>
    </>
  );
}
export default ContentHolder;