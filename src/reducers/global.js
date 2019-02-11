const global = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_USER':
    state = action.payload.user.uid
    return state;

    default:
      return state;
  }
}

export default global;
