import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPlayerToGame } from '../actions';
import Header from './header';

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
      <Header
        title="Add Players"
      />
        <div style={{padding: "20px"}}>

          <input
            type="text"
            className="playerSearch"
            onChange={this.onInputChange}
            ref={ this.player }
          />
          <div>
          <h6>Players</h6>
          {
            playersFound
            ? this.state.results.map((player) => {
                return (<p className="player--item" onClick={() => {this.setState({query: ""}); this.player.current.value = ""; this.runQuery(""); this.props.addPlayerToGame(player)}}>{player}</p>)
              })
            : <p className="player--item player--highlight" onClick={this.addPlayer}>{this.state.query.length > 0 ? 'Add ' +this.state.query : '' }</p>
          }
          </div>

          <h6>Players in Next Game</h6>
          <div>
            { this.props.playersInGame.length > 0
              ? this.props.playersInGame.map((player) => {
                return (
                  <p className="player--item">{player}</p>
                )
              })
              : <div className="player--item">No one in game yet.</div>
            }
          </div>

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
