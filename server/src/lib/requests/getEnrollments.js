import Promise from 'bluebird';
import _ from 'lodash';
import request from 'superagent';
import getManagementToken from './getManagementToken'

export const getEnrollments = (userId) => {
  return new Promise((resolve, reject) => {

    getManagementToken().then((access_token) => {

      const url = `https://${process.env.DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`;

      request('GET', url)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${access_token}`)
        .end((err, res) => {
          if (err) {
            return reject(err);
          }

          const passwordlessIdentities = _.filter(res.body.identities, (identity) => {
            const filter = (identity.provider === 'sms' || identity.provider === 'email') && typeof identity.profileData !== 'undefined';
            return filter;
          });

          const enrollments = _.map(passwordlessIdentities, (identity) => {
            const enrollement = {
              user_id: identity.user_id,
              provider: identity.provider
            }

            switch (identity.provider) {
              case 'sms':
                enrollement.verified = identity.profileData.phone_verified;
                enrollement.phone_number = identity.profileData.phone_number;
                break;
              case 'email':
                enrollement.verified = identity.profileData.email_verified;
                enrollement.email = identity.profileData.email;
                break;
              default:
                reject(new Error('the profileData is missing'));
            }

            return enrollement;
          });

          return resolve(enrollments);
        });
    }).catch(err => {
      reject(err);
    });
  });
}