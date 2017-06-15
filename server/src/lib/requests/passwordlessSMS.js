import createRequest from './createRequestHelper';

export const startPasswordlessSMS = (phoneNumber) => {
  const payload = {
    client_id: `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    connection: 'sms',
    phone_number: phoneNumber,
    send: 'code'
  };

  return createRequest(`https://${process.env.DOMAIN}/passwordless/start`, payload);
};

export const verifyPasswordlessSMS = (otp, phoneNumber) => {
  const payload = {
    client_id: `${process.env.NON_INTERACTIVE_CLIENT_ID}`,
    connection: 'sms',
    username: phoneNumber,
    password: otp,
    grant_type: 'password',
    scope: 'openid'
  };

  return createRequest(`https://${process.env.DOMAIN}/oauth/ro`, payload);
};
