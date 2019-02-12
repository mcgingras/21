import React, { Component } from 'react';
import Header from '../components/header';
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

    console.log(this.props.score);

  }

  nextPlayer(){
    const l = this.props.playersInGame.length;
    const next = (this.state.currentPlayer + 1) % l;
    console.log(next);
    this.setState({currentPlayer: next});
        // Score: {this.props.score[this.state.currentPlayer]['total']}
  }

  render(){
    return(
      <div style={{height: "100%", position: "relative"}}>
        <Header
          title="Game Time"
        />

        <div style={{padding: "20px", height: "100%"}}>
          <h6>Now Up: {this.props.playersInGame[this.state.currentPlayer]}</h6>
          <p className="player--item">
            {(this.state.currentPlayer in this.props.score)
              ? <div>Score: {this.props.score[this.state.currentPlayer]['total']}</div>
              : <div>Score: 0</div>
            }
          </p>
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

          </div>
          <button className="start--button">End Game</button>
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
