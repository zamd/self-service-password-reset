/* eslint global-require: 0 */

import nock from 'nock';
import { ManagementClient } from 'auth0';
import { getManagementClient } from '../../../src/lib/utils/auth0';

import resetPassword from '../../../src/lib/requests/resetPassword';

jest.mock('../../../src/lib/utils/auth0', () => ({
  getManagementClient: jest.fn()
}));

describe('ResetPassword', () => {
  beforeEach(() => {
    getManagementClient.mockImplementation(() => new ManagementClient({
      domain: 'test.com',
      clientId: 'client_id',
      clientSecret: 'client_secret'
    }));
  });

  test('should handle network errors correctly', (done) => {
    getManagementClient.mockImplementation(() => new ManagementClient({
      domain: 'fake-domain',
      clientId: 'client_id',
      clientSecret: 'client_secret'
    }));

    resetPassword()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid')
      .reply(401, 'Unauthorized');

    resetPassword('userid', 'passw0rd')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should link passwordless user to a regular user', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid')
      .reply(200, {
        payload: 'value'
      });

    resetPassword('userid', 'passw0rd')
      .then((body) => {
        expect(body).toBeDefined();
        expect(body.payload).toBe('value');
        done();
        nock.cleanAll();
      });
  });

  test('should send correct payload', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid', {
        password: 'passw0rd'
      })
      .reply(200);

    resetPassword('userid', 'passw0rd')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});
