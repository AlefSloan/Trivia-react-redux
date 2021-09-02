import getGravatarImgApi from '../../services';

const actions = {
  REQUEST_API: 'REQUEST_API',
  FAILED_REQUEST: 'FAILED_REQUEST',
  SET_GRAVATAR_IMG: 'GET_GRAVATAR_IMG',
  LOGIN_SUBMIT: 'LOGIN_SUBMIT',
};

export const loginSubmit = (payload) => ({
  type: actions.REQUEST_APILOGIN_SUBMIT, payload,
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

export default actions;
