import Promise from 'bluebird';
import request from 'superagent';
import getManagementToken from './getManagementToken';
import {
  get as config
} from '../utils/config';

const resetPassword = (accessToken, userId, password) => {
  const url = `https://${config('DOMAIN')}/api/v2/users/${encodeURIComponent(userId)}`;
  const payload = {
    password
  };

  return request('PATCH', url)
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`);
};

export default (userId, password) => new Promise((resolve, reject) => {
  getManagementToken().then((accessToken) => {
    resetPassword(accessToken, userId, password)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.body);
      });
  }).catch((err) => {
    reject(err);
  });
});
