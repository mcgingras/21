import { combineReducers } from 'redux';
import players from './players';
import score from './score';

const rootReducer = combineReducers({
  players,
  score
});

export default rootReducer;
