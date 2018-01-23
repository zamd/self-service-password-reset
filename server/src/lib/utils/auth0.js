import { ManagementClient, AuthenticationClient } from 'auth0';
import {
  get as config
} from './config';

let managementClient;
let authenticationClient;

export const getManagementClient = () => {
  if (managementClient) return managementClient;

  managementClient = new ManagementClient({
    domain: `${config('DOMAIN')}`,
    clientId: config('NON_INTERACTIVE_CLIENT_ID'),
    clientSecret: config('NON_INTERACTIVE_CLIENT_SECRET')
  });
  return managementClient;
};

export const getAuthenticationClient = () => {
  if (authenticationClient) return authenticationClient;

  authenticationClient = new AuthenticationClient({
    domain: `${config('DOMAIN')}`,
    clientId: config('NON_INTERACTIVE_CLIENT_ID')
  });
  return authenticationClient;
};
