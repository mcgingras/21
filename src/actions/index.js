let playerId = 0;

// used to add player to the game and to keep track of who is in game
export const addPlayerToGame = (username) => {
  console.log('adding', username);
  return {
    type: "ADD_PLAYER_TO_GAME",
    payload: {
      id: playerId++,
      username: username,
    }
  }
}

export const updateScore = (player, score) => {
  console.log("player "+player+"just hit "+score);
  return {
    type: "UPDATE_SCORE",
    payload: {
      player: player,
      score: score
    }
  }
}

// action creator to load a user on first load. Need this
// because I want to store the user in global state.
export const loadUser = (user) => {
  console.log("adding user to global");
  return {
    type: "LOAD_USER",
    payload: {
      user: user
    }
  }
}


export const acceptInvite = (user) => {
  return {
    type: "ACCEPT_INVITE",
    payload: {
      user: user
    }
  }
}

export const cancelInvite = (user) => {
  return {
    type: "CANCEL_INVITE",
    payload: {
      user: user
    }
  }
}

export const declineInvite = (user) => {
  return {
    type: "DECLINE_INVITE",
    payload: {
      user: user
    }
  }
}
