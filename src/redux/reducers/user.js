import { LOGIN_SUBMIT } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return { ...state, nome: action.payload, email: action.payload };
  default:
    return state;
  }
}

export default user;
