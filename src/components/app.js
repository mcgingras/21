import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions';



class App extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div>
        <h3>21 <br/> Fisher Edition</h3>
        <a href={"/play"}>Play</a>
        <a href={"/stats"}>Stats</a>
      </div>
    );
  }
}


export default connect(null, null)(App)
