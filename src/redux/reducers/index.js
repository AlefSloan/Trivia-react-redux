import { combineReducers } from 'redux';
import playerReducer from './player';
import game from './game';

const rootReducer = combineReducers({
  player: playerReducer,
  game,
});

export default rootReducer;
