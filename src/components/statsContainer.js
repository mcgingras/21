import React, { Component } from 'react';
import Header from './header';


export default class StatsContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      records: {},
    }
  }

  componentDidMount(){
    var database = firebase.database();
    database.ref('record').once('value').then((recs) => {
      const records = recs.val();
      console.log(records);
      this.setState({records});
    })
  }

  render() {
    return (
      <div>
      <Header path="/" right="add" title="Stats" />
        <div style={{padding: "20px"}}>
          <h6>Overall Record</h6>

          {Object.keys(this.state.records).map((player) => {
            return (
              <p className="player--item">
              {player}
              <span className="player-stats">{this.state.records[player].wins} - {this.state.records[player].losses}</span>
              </p>
            )
          })}

        </div>
      </div>
    );
  }
}
