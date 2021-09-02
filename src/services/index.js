import md5 from 'crypto-js/md5';

const URL = 'https://www.gravatar.com/avatar/';

async function getGravatarImgApi(email) {
  const convertedEmail = md5(email).toString();
  const endpoint = `${URL}${convertedEmail}`;
  const data = await fetch(endpoint);
  return data;
}

export default getGravatarImgApi;
