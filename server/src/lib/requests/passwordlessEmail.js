import createRequest from './createRequestHelper';
import { get as config } from '../utils/config';
import { getAuthenticationClient } from '../utils/auth0';

export const startPasswordlessEmail = (email) => {
  const authenticationClient = getAuthenticationClient();
  const payload = {
    send: 'code',
    email,
    authParams: {
      scope: 'openid'
    }
  };

  return authenticationClient.passwordless.sendEmail(payload);
};

export const verifyPasswordlessEmail = (otp, email) => {
  // Looks like there is a bug in node-auth0 sdk where the
  // `authenticationClient.passwordless.signIn` is sending
  // the always `sms` as the `connection` parameter
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
