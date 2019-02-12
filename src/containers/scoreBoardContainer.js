import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { connect } from 'react-redux';


import { updateScore } from '../actions'

class ScoreBoardContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentPlayer: 0,
      winner: null
    }

    this.nextPlayer = this.nextPlayer.bind(this);
    this.updateRecords = this.updateRecords.bind(this);

  }

  nextPlayer(){
    const l = this.props.playersInGame.length;
    const next = (this.state.currentPlayer + 1) % l;
    this.setState({currentPlayer: next});
        // Score: {this.props.score[this.state.currentPlayer]['total']}
  }

  updateRecords(){
    var context = this;
    var database = firebase.database();


    if ('winner' in this.props.score) {
      const winner = this.props.playersInGame[context.props.score.winner];
      const players = context.props.playersInGame;
      players.map((player) => {
        if (player == winner){
          database.ref('/record/'+player+'/wins').once('value').then((snap) =>{
            var wins = snap.val();
            wins = wins + 1;
            console.log(wins);
            database.ref('/record/'+player+'/wins').set(wins);
          })
        }
        else {
          database.ref('/record/'+player+'/losses').once('value').then((snap) =>{
            var losses = snap.val();
            losses = losses + 1;
            database.ref('/record/'+player+'/losses').set(losses);
          })
        }
      })
    }


    else return;
  }

  render(){
    return(
      <div style={{height: "100%", position: "relative"}}>
        <Header
          title="Game Time"
        />

        <div className="body-container">
          <h6>Now Up: {this.props.playersInGame[this.state.currentPlayer]}</h6>
          <div className="player--item">
            {(this.state.currentPlayer in this.props.score)
              ? <div>Score: {this.props.score[this.state.currentPlayer]['total']}</div>
              : <div>Score: 0</div>
            }
          </div>

          <div
             className="score--button"
             onClick={() => { this.props.updateScore(this.state.currentPlayer, 2)}}
             >
             Hoop
          </div>
           <div
              className="score--button"
              onClick={() => { this.props.updateScore(this.state.currentPlayer, 1)}}
              >
              Layup
           </div>
            <div
               className="score--button"
               onClick={() => {this.props.updateScore(this.state.currentPlayer, 0); this.nextPlayer()}}
               >
               Miss
            </div>
            <h6>Scoreboard</h6>
            <p className="player--item">Coming Soon...</p>

            {('winner' in this.props.score)
              ? <div>{this.props.playersInGame[this.props.score.winner]} wins!</div>
              : <div></div>
            }

          </div>
          <button className="start--button" onClick={() => {this.updateRecords(); window.location.replace('/')} }>End Game</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playersInGame: state.players,
    score: state.score
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateScore: (player,score) => dispatch(updateScore(player,score))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoardContainer);
