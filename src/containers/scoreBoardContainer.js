import React, { Component } from 'react';
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

  }

  nextPlayer(){
    const l = this.props.playersInGame.length;
    const next = (this.state.currentPlayer + 1) % l;
    console.log(next);
    this.setState({currentPlayer: next});
  }

  render(){
    return(
      <div style={{height: "100%"}}>
        <header>Now Up: {this.props.playersInGame[this.state.currentPlayer]}</header>
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
           onClick={() => {this.nextPlayer()}}
           >
           Miss
           </div>
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
