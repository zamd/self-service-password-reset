import Promise from 'bluebird';
import request from 'superagent';
import getManagementToken from './getManagementToken';


const deleteUser = (accessToken, provider, userId) => {
  const url = `https://${process.env.DOMAIN}/api/v2/users/${encodeURIComponent(`${provider}|${userId}`)}`;
  return request('DELETE', url)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`);
};

const unlinkUser = (accessToken, primaryUserId, linkedUserId, provider) => {
  const url = `https://${process.env.DOMAIN}/api/v2/users/${encodeURIComponent(primaryUserId)}/identities/${provider}/${linkedUserId}`;
  return request('DELETE', url)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`);
};

export default (primaryUserId, linkedUserId, provider) => new Promise((resolve, reject) => {
  getManagementToken().then((accessToken) => {
    unlinkUser(accessToken, primaryUserId, linkedUserId, provider).end((err) => {
      if (err) {
        return reject(err);
      }

      return deleteUser(accessToken, linkedUserId, provider)
        .end((deleteErr) => {
          if (deleteErr) {
            return reject(deleteErr);
          }

          return resolve();
        });
    });
  }).catch((err) => {
    reject(err);
  });
});
