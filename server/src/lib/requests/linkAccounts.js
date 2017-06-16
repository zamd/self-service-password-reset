import Promise from 'bluebird';
import request from 'superagent';
import getManagementToken from './getManagementToken';

export default (userId, passwordLessUserId, provider) => new Promise((resolve, reject) => {
  getManagementToken().then((accessToken) => {
    const url = `https://${process.env.DOMAIN}/api/v2/users/${userId}/identities`;
    const payload = {
      provider,
      user_id: passwordLessUserId
    };

    request('POST', url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
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
