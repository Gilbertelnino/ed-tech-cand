import React, { ReactNode } from 'react';

import Header from './Header';
import Container from './Container';
interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = (props: AdminLayoutProps) => {
  const { children } = props;
  return (
    <div className="admin-layout">
      <Header />
      <div className={'admin-wrapper'}>
        <Container children={children} />
      </div>
    </div>
  )
}
export default AdminLayout;