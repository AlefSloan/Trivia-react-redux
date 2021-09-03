import actions from '../actions';

const INITIAL_STATE = {
  token: '',
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.GET_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
}

export default game;
