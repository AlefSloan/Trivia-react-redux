import getGravatarImgApi from '../../services';

const actions = {
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'FAILED_REQUEST',
  SET_GRAVATAR_IMG: 'GET_GRAVATAR_IMG',
  LOGIN_SUBMIT: 'LOGIN_SUBMIT',
  GET_TOKEN: 'GET_TOKEN',
};

export const loginSubmit = (payload1, payload2) => ({
  type: actions.LOGIN_SUBMIT, payload1, payload2,
});

export const requestApi = () => ({
  type: actions.REQUEST_API,
});

export const failedRequest = (error) => ({
  type: actions.FAILED_REQUEST, payload: error,
});

export const requestGravatarImg = (payload) => ({
  type: actions.SET_GRAVATAR_IMG, payload,
});

export const getToken = (payload) => ({
  type: actions.GET_TOKEN, payload,
});

export const fetchGravatarIgm = (payload) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const email = await getGravatarImgApi(payload);
    const { url } = email;
    dispatch(requestGravatarImg(url));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const fetchToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api';
  const requestResult = (await (await fetch(`${URL}_token.php?command=request`)).json());
  console.log(requestResult);
  localStorage.setItem('token', JSON.stringify(requestResult.token));
  dispatch(getToken(requestResult.token));
};

export default actions;
