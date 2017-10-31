
/* eslint global-require: 0 */

import { ManagementClient, AuthenticationClient } from 'auth0';
import { getManagementClient, getAuthenticationClient } from '../../../src/lib/utils/auth0';


jest.mock('../../../src/lib/utils/config');

describe('auth0 util', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should getManagementClient should return ManagementClient instance', () => {
    const client = getManagementClient();

    expect(client).toBeInstanceOf(ManagementClient);
  });

  test('should getAuthenticationClient should return AuthenticationClient instance', () => {
    const client = getAuthenticationClient();

    expect(client).toBeInstanceOf(AuthenticationClient);
  });

  test('should return the same AuthenticationClient instance on the second getAuthenticationClient call', () => {
    const client1 = getAuthenticationClient();
    const client2 = getAuthenticationClient();

    expect(client1).toBe(client2);
  });

  test('should return the same ManagementClient instance on the second getManagementClient call', () => {
    const client1 = getManagementClient();
    const client2 = getManagementClient();

    expect(client1).toBe(client2);
  });
});
