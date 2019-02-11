import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header';
import PlayerPicker from './playerPicker';
import ScoreBoardContainer from '../containers/scoreBoardContainer';

import { addPlayerToGame } from '../actions';

// TODO:
// there is no check to make sure players are actually in the game before it starts
// you can just make the game live straight off the bat, which seems wrong.

class GameContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      gameId: null,           // the id of the game to reference in firebase
      live: false,            // if there is a game currently joined
    }

  }

  render() {
    return (
      <div>
        { !this.state.live
          ? <div>
              <PlayerPicker />
              <button onClick={() => {this.setState({live: true})}}>Start Game</button>
            </div>
          : <ScoreBoardContainer/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    global: state.global
  }
}


export default connect(mapStateToProps, null)(GameContainer);
