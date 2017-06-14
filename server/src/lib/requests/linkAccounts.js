import Promise from 'bluebird';
import createRequest from './createRequestHelper';
import request from 'superagent';
import getManagementToken from './getManagementToken'


export const linkAccounts = (userId, passwordLessUserId, provider) => {
  return new Promise((resolve, reject) => {

    getManagementToken().then((access_token) => {

      const url = `https://${process.env.DOMAIN}/api/v2/users/${userId}/identities`;
      const payload = {
        "provider": provider,
        "user_id": passwordLessUserId,
      }
      
      request('POST', url)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${access_token}`)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res.body);
        });

    }).catch(err => {
      reject(err);
    });
  });
}

