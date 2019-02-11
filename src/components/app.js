import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions';



class App extends Component {
  constructor(props){
    super(props);

  }

  Header = {
    textAlign: "center",
    fontSize: "22px",
    padding: "50px 0",
    backgroundColor: '#EEE4D3'
  }

  Button = {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    textAlign: "center"
  }

  Body = {
    backgroundColor: "#BBB",
    height: "100%"
  }

  render() {
    return (
      <div style={this.Body}>
        <div style={this.Header}>21</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (name, username) => {
      dispatch(addPlayer(name,username))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
