import actions from '../actions';

const INICIAL_STATE = {
  email: 'guilherme.lmoreno23@gmail.com',
  img: '',
  loading: false,
  teste: 'xablau',
};

const userImg = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case actions.REQUEST_API:
    return { ...state, loading: true };
  case actions.SET_GRAVATAR_IMG:
    return { ...state, loading: false, img: action.payload };
  case actions.FAILED_REQUEST:
    return { ...state, loading: false, error: action.payload };
  default:
    return state;
  }
};

export default userImg;
