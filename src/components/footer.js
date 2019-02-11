import React, { Component } from 'react';
import FooterItem from './footerItem';

const footer = () => {

  return (
    <div className="footer">
      <FooterItem title="Stats" />
      <FooterItem title="Play" />
      <FooterItem title="Profile" />
    </div>
  )
}


export default footer;
