import React, { Component } from 'react';
import Header from './header';


export default class StatsContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      <Header path="/" right="add" title="Leaderboards" />
      stats
      </div>
    );
  }
}
