import createRequest from './createRequestHelper';
import { get as config } from '../utils/config';

export const startPasswordlessSms = (phoneNumber) => {
  const payload = {
    client_id: `${config('NON_INTERACTIVE_CLIENT_ID')}`,
    connection: 'sms',
    phone_number: phoneNumber,
    send: 'code'
  };

  return createRequest(`https://${config('DOMAIN')}/passwordless/start`, payload);
};

export const verifyPasswordlessSms = (otp, phoneNumber) => {
  const payload = {
    client_id: `${config('NON_INTERACTIVE_CLIENT_ID')}`,
    connection: 'sms',
    username: phoneNumber,
    password: otp,
    grant_type: 'password',
    scope: 'openid'
  };

  return createRequest(`https://${config('DOMAIN')}/oauth/ro`, payload);
};
