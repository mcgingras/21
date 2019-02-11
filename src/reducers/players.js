const players = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYER_TO_GAME':
      console.log(state);
      if (state.includes(action.payload.username)) {
        return state;
      }
      return [...state, action.payload.username];

    default:
      return state;
  }
}

export default players;
