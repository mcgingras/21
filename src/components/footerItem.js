import React, { Component } from 'react';
import scoreboard from '../static/scoreboard.svg';
import basketball from '../static/basketball.svg'

const footerItem = (props) => {

  const logo = {
    height: "30px",
    width: "30px",
    margin: "10px auto"
  }

  return (
    <a href={"/"+props.title}>
      <img src={props.logo} style={logo}></img>
    </a>
  )
}

export default footerItem;
