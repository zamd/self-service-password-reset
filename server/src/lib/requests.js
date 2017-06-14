import stateGenerator from './state-generator';
import Promise from 'bluebird';
import request from 'superagent';


const defaultStartPasswordlessPayload = {
  "send": "code",
  "authParams": {
    "scope": "openid"
  }
}

const defaultVerifyPasswordlessEmailPayload = {
  "grant_type": "password",
  "scope": "openid"
}

export const startPasswordlessSMS = (phone_number) => {
  const payload = Object.assign({}, defaultStartPasswordlessPayload, {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "sms",
    "phone_number": phone_number,
  })

  return createRequest(`https://${process.env.DOMAIN}/passwordless/start`, payload);
}

export const startPasswordlessEMail = (email) => {
  const payload = Object.assign({}, defaultStartPasswordlessPayload, {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "email",
    "email": email,
  });

  return createRequest(`https://${process.env.DOMAIN}/passwordless/start`, payload);
}

export const verifyPasswordlessEmail = (otp, email) => {
  const payload = Object.assign({}, defaultVerifyPasswordlessEmailPayload, {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "email",
    "username": email,
    "password": otp
  });

  return createRequest(`https://${process.env.DOMAIN}/oauth/ro`, payload);
}

export const verifyPasswordlessSMS = (otp, phone_number) => {
  const payload = Object.assign({}, defaultVerifyPasswordlessEmailPayload, {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "sms",
    "username": phone_number,
    "password": otp
  });

  return createRequest(`https://${process.env.DOMAIN}/oauth/ro`, payload);
}


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

let access_token;
const getManagementToken = () => {
  const payload = {
    "grant_type": "client_credentials",
    "client_id": process.env.NON_INTERACTIVE_CLIENT_ID,
    "client_secret": process.env.NON_INTERACTIVE_CLIENT_SECRET,
    "audience": `https://${process.env.DOMAIN}/api/v2/`
  }

  return new Promise((resolve, reject) => {
    // Todo check token validity
    if (access_token) {
      resolve(access_token);
    }

    createRequest(`https://${process.env.DOMAIN}/oauth/token`, payload)
      .then(data => {
        access_token = data.access_token;
        resolve(access_token);
      })
      .catch(err => {
        reject(err);
      })
  });
}

const createRequest = (url, payload) => {
  return new Promise((resolve, reject) => {
    request('POST', url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.body);
      });
  });
}