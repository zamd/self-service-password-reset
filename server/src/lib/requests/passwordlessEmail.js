import Promise from 'bluebird';
import createRequest from './createRequestHelper';

export const startPasswordlessEMail = (email) => { 
  const payload = {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "email",
    "email": email,
    "send": "code"
  };

  return createRequest(`https://${process.env.DOMAIN}/passwordless/start`, payload);
}

export const verifyPasswordlessEmail = (otp, email) => {
  const payload = {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "email",
    "username": email,
    "password": otp,
    "grant_type": "password",
    "scope": "openid"
  };

  return createRequest(`https://${process.env.DOMAIN}/oauth/ro`, payload);
}