import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';


export default class StatsContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      records: {},
    }
  }

  componentDidMount(){
    var database = firebase.database();
    database.ref('Record').once('value').then((recs) => {
      const records = recs.val();
      console.log(records);
      this.setState({records});
    })
  }


  // displays the rankings (win loss percent) of each player
  // sorts by win percentage...
  // better way to sort? most wins? Do UX testing on that
  displayRankings(){

    const sorted = Object.keys(this.state.records).sort((p1, p2) => {
      const w1 = this.state.records[p1].wins;
      const l1 = this.state.records[p1].losses;
      const pr1 = parseFloat(w1/(w1+l1)).toFixed(2);

      const w2 = this.state.records[p2].wins;
      const l2 = this.state.records[p2].losses;
      const pr2 = parseFloat(w2/(w2+l2)).toFixed(2);

      return pr2 - pr1;
    })

    console.log(sorted);

    return(
      sorted.map((player) => {
        const wins = this.state.records[player].wins;
        const losses = this.state.records[player].losses
        const percent = parseFloat(wins/(wins+losses)).toFixed(2);
        return (
          <p className="player--item">
          {player}
          <span className="player-stats">{wins} - {losses}</span>
          <span className="player-stats-record">{percent}</span>
          </p>
        )
      })
    )
  }

  render() {
    return (
      <div>
      <Header path="/" right="add" title="Stats" />

        <div className="body-container">
          <h6>Overall Record</h6>
          {this.displayRankings()}

          <h6>ELO Rank</h6>
          <p className="player--item">Coming Soon...</p>

          <h6>Graphs</h6>
          <p className="player--item">Coming Soon...</p>
        </div>

        <Footer />
      </div>
    );
  }
}
