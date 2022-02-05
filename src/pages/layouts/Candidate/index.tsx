import React, { ReactNode } from 'react';

import Header from './Header';
import Footer from '../Default/Footer';

interface CandidateLayoutProps {
  children?: ReactNode;
}

const CandidateLayout = (props: CandidateLayoutProps) => {
  const { children } = props;
  return (
    <div className="candidate-layout">
      <Header children={children} />
      <div className={'candidate-wrapper'}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
export default CandidateLayout;
