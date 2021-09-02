export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const GET_TOKEN = 'GET_TOKEN';

export const loginSubmit = (payload) => ({
  type: LOGIN_SUBMIT, payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN, payload,
});

export const fetchToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api';
  const requestResult = (await (await fetch(`${URL}_token.php?command=request`)).json());
  console.log(requestResult);
  localStorage.setItem('token', JSON.stringify(requestResult.token));
  dispatch(getToken(requestResult.token));
};
