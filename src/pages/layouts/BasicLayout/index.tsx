import React, { Component } from 'react';

import Header from './Header';

class BasicLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <>
        <Header />
        <div className="basic-layout-wrapper" >
          {children}
        </div>
      </>
    )
  }

}

export default BasicLayout;
