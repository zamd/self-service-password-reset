import Promise from 'bluebird';
import createRequest from './createRequestHelper';

export const startPasswordlessSMS = (phone_number) => {
  const payload = {
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "sms",
    "phone_number": phone_number,
    "send": "code"
  }

  return createRequest(`https://${process.env.DOMAIN}/passwordless/start`, payload);
}

export const verifyPasswordlessSMS = (otp, phone_number) => {
  const payload ={
    "client_id": `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    "connection": "sms",
    "username": phone_number,
    "password": otp,
    "grant_type": "password",
    "scope": "openid"
  };

  return createRequest(`https://${process.env.DOMAIN}/oauth/ro`, payload);
}