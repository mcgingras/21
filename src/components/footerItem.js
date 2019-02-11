import React, { Component } from 'react';

const footerItem = (props) => {

  const logo = {
    backgroundColor: "#444",
    borderRadius: "30px",
    height: "30px",
    width: "30px",
    margin: "10px auto"
  }

  return (
    <a href={"/"+props.title}>
      <div style={logo}>
      </div>

      <h6>{props.title}</h6>
    </a>
  )
}

export default footerItem;
