import actions from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
  img: '',
  loading: false,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.LOGIN_SUBMIT:
    return { ...state, nome: action.payload, email: action.payload };
  case actions.REQUEST_API:
    return { ...state, loading: true };
  case actions.SET_GRAVATAR_IMG:
    return { ...state, loading: false, img: action.payload };
  case actions.FAILED_REQUEST:
    return { ...state, loading: false, error: action.payload };
  default:
    return state;
  }
}

export default userReducer;
