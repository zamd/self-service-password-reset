import createRequest from './createRequestHelper';
import { get as config } from '../utils/config';

export const startPasswordlessEMail = (email) => {
  const payload = {
    client_id: `${config('NON_INTERACTIVE_CLIENT_ID')}`,
    connection: 'email',
    send: 'code',
    email
  };

  return createRequest(`https://${config('DOMAIN')}/passwordless/start`, payload);
};

export const verifyPasswordlessEmail = (otp, email) => {
  const payload = {
    client_id: `${config('NON_INTERACTIVE_CLIENT_ID')}`,
    connection: 'email',
    username: email,
    password: otp,
    grant_type: 'password',
    scope: 'openid'
  };

  return createRequest(`https://${config('DOMAIN')}/oauth/ro`, payload);
};
