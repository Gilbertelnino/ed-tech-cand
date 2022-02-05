import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class DefaultLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <>
        <Header />
        <div style={{ minHeight: "600px" }}>
          {children}
        </div>
        <Footer />
      </>
    )
  }

}

export default DefaultLayout;
