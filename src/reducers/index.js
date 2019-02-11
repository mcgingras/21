import { combineReducers } from 'redux';
import players from './players';
import score from './score';
import global from './global';

const rootReducer = combineReducers({
  players,
  score,
  global
});

export default rootReducer;
