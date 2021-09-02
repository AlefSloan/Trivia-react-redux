import { combineReducers } from 'redux';
import userImg from './feedbackReduce';

const rootReducer = combineReducers({
  user: userImg,
});

export default rootReducer;
