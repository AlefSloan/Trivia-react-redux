import actions from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  img: '',
  score: 0,
  assertions: 0,
  loading: false,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.LOGIN_SUBMIT:
    return { ...state, name: action.payload1, email: action.payload2 };
  case actions.SUBMIT_ANSWER:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
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

export default playerReducer;
