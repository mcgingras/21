import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPlayerToGame } from '../actions';

class PlayerPicker extends Component {
  constructor(props){
    super(props);

    // local state
    this.state = {
      players: [], // array of all players?
      query: "",   // who is being searched
      results: [], // results of search
      playing: [], // currently in the game
    }

    this.player = React.createRef();
    this.onInputChange = this.onInputChange.bind(this);
    this.runQuery = this.runQuery.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.refreshState = this.refreshState.bind(this);
  }

  // need to load the players into the element.
  // debating if this should be done here or in redux store...
  // feels like a here thing.
  componentWillMount(){
    this.refreshState();
  }

  refreshState(){
    var context = this;
    var database = firebase.database();
    database.ref('/players/').once('value').then(function(snapshot) {
        var players = (snapshot.val()) || null;
        if(typeof players == 'object'){
          context.setState({players: Object.values(players)});
        }
        else{
          context.setState({players: players});
        }

    })
  }

  onInputChange(){
    this.setState({query: this.player.current.value});
    this.runQuery(this.player.current.value);
  }

  // incredible basic search... could flesh this out with a trie in the future
  runQuery(q){
    const players = this.state.players;
    const l = q.length;
    const results = players.filter(player => {
      if (player.length >= l && l != 0){
        if (player.substring(0,l) == q){
          return player;
        }
      }
    })
    this.setState({results});
  }

  addPlayer(){
    var context = this;
    var database = firebase.database();
    var index = this.state.players.length;
    database.ref('/players/'+index).set(this.state.query);
    this.refreshState();
  }


  render(){
    const playersFound = this.state.results.length > 0;
    return (
      <div>

        <input
          type="text"
          className="playerSearch"
          placeholder="search player"
          onChange={this.onInputChange}
          ref={ this.player }
        />
        <div>
        {
          playersFound
          ? this.state.results.map((player) => {
              return (<p onClick={() => {this.props.addPlayerToGame(player)}}>{player}</p>)
            })
          : <button onClick={this.addPlayer}>Add Player</button>
        }
        </div>

        <h5>Current players</h5>
        <div>
          { this.props.playersInGame.length > 0
            ? this.props.playersInGame.map((player) => {
              return (
                <p>{player}</p>
              )
            })
            : <div>No one in game yet.</div>
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playersInGame: state.players
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlayerToGame: (player) => dispatch(addPlayerToGame(player))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerPicker);
