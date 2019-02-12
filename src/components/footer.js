import React, { Component } from 'react';

import scoreboard from '../static/scoreboard.svg';
import basketball from '../static/basketball.svg'

const footer = () => {

  const logo = {
    height: "30px",
    width: "30px",
    margin: "10px auto"
  }

  return (
    <div className="footer">
      <a href={"/Stats"}>
        <img src={scoreboard} style={logo}></img>
      </a>
      <a href={"/Play"}>
        <img src={basketball} style={logo}></img>
      </a>
      <a href={"/Stats"}>
        <img src={scoreboard} style={logo}></img>
      </a>

    </div>
  )
}


export default footer;
