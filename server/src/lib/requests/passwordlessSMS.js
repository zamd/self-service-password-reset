import { getAuthenticationClient } from '../utils/auth0';

export const startPasswordlessSms = (phoneNumber) => {
  const authenticationClient = getAuthenticationClient();
  const payload = {
    phone_number: phoneNumber,
    send: 'code'
  };
  return authenticationClient.passwordless.sendSMS(payload);
};

export const verifyPasswordlessSms = (otp, phoneNumber) => {
  const authenticationClient = getAuthenticationClient();
  const payload = {
    username: phoneNumber,
    password: otp,
    scope: 'openid'
  };
  return authenticationClient.passwordless.signIn(payload);
};
