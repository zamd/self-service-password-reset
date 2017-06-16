import createRequest from './createRequestHelper';

let accessToken;
let expiresAt;

export default () => {
  const payload = {
    grant_type: 'client_credentials',
    client_id: process.env.NON_INTERACTIVE_CLIENT_ID,
    client_secret: process.env.NON_INTERACTIVE_CLIENT_SECRET,
    audience: `https://${process.env.DOMAIN}/api/v2/`
  };

  return new Promise((resolve, reject) => {
    if (expiresAt && Date.now() < expiresAt && accessToken) {
      resolve(accessToken);
    }

    createRequest(`https://${process.env.DOMAIN}/oauth/token`, payload)
      .then((data) => {
        expiresAt = (data.expires_in * 1000) + Date.now();
        accessToken = data.access_token;
        resolve(accessToken);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
