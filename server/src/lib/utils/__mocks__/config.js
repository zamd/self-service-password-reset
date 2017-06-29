let domain = 'test.com';
let clientId = 'client_id';
let clientSecret = 'client_secret';

export const get = (key) => {
  switch (key) {
    case 'DOMAIN':
      return domain;
    case 'NON_INTERACTIVE_CLIENT_ID':
      return clientId;
    case 'NON_INTERACTIVE_CLIENT_SECRET':
      return clientSecret;
    default:
      console.log(`Could not find the setting ${key}`);
      return undefined;
  }
};

export const setMockConfig = (_domain, _clientId, _clientSecret) => {
  domain = _domain;
  clientId = _clientId;
  clientSecret = _clientSecret;
};

