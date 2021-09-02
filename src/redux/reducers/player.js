import actions from '../actions';

const INITIAL_STATE = {
  nome: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return { ...state, nome: action.payload };
  default:
    return state;
  }
}

export default player;
