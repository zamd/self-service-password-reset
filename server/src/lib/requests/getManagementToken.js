import memoizer from 'lru-memoizer';
import Promise from 'bluebird';
import createRequest from './createRequestHelper';
import { get as config } from '../utils/config';

const getCachedAccessToken = Promise.promisify(memoizer({
  load: (domain, clientId, clientSecret, callback) => {
    const payload = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`
    };
    createRequest(`https://${domain}/oauth/token`, payload)
      .then(data => callback(null, data))
      .catch(err => callback(err));
  },
  hash: (domain, clientId) => `${domain}-${clientId}`,
  itemMaxAge: (domain, clientId, clientSecret, data) => {
    const expiresAt = data.expires_in * 1000;
    return expiresAt;
  },
  max: 100,
  maxAge: 3600
}));

export default () => new Promise((resolve, reject) => {
  const clientId = config('NON_INTERACTIVE_CLIENT_ID');
  const clientSecret = config('NON_INTERACTIVE_CLIENT_SECRET');
  getCachedAccessToken(config('DOMAIN'), clientId, clientSecret)
    .then(data => resolve(data.access_token))
    .catch(err => reject(err));
});
