/* eslint global-require: 0 */

import nock from 'nock';
import { ManagementClient } from 'auth0';
import { getManagementClient } from '../../../src/lib/utils/auth0';

import changePassword from '../../../src/lib/requests/changePassword';

jest.mock('../../../src/lib/utils/auth0', () => ({
  getManagementClient: jest.fn()
}));

jest.mock('../../../src/lib/utils/config');

describe('ChangePassword', () => {
  beforeEach(() => {
    getManagementClient.mockImplementation(() => new ManagementClient({
      domain: 'test.com',
      clientId: 'client_id',
      clientSecret: 'client_secret'
    }));

    require('../../../src/lib/utils/config')
      .setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle oauth/token network errors correctly', (done) => {
    require('../../../src/lib/utils/config')
      .setMockConfig('fake-domain', 'client_id', 'client_secret');
    changePassword('userid', 'username', 'passw0rd', 'newPassword')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle ManagementClient network errors correctly', (done) => {
    getManagementClient.mockImplementation(() => new ManagementClient({
      domain: 'fake-domain',
      clientId: 'client_id',
      clientSecret: 'client_secret'
    }));

    nock('https://test.com')
      .post('/oauth/token')
      .reply(200);

    changePassword('userid', 'username', 'passw0rd', 'newPassword')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe('ENOTFOUND');
        done();
        nock.cleanAll();
      });
  });


  test('should handle oauth/token endpoint errors correctly', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(401, {
        error: 'access_denied',
        error_description: 'Unauthorized'
      });

    changePassword('userid', 'username', 'passw0rd', 'newPassword')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized PATCH user endpoint errors correctly', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .twice()
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid')
      .reply(401, 'Unauthorized');

    changePassword('userid', 'username', 'passw0rd', 'newPassword')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should send correct payload to validate current password', (done) => {
    nock('https://test.com')
      .post('/oauth/token', {
        username: 'userid',
        password: 'passw0rd'
      }) // call to validate password
      .once()
      .reply(200)
      .post('/oauth/token') // call to fetch management API token
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid')
      .reply(200);

    changePassword('userid', 'username', 'passw0rd', 'newPassword')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });

  test('should send correct payload to change password', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .twice()
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid', {
        password: 'newPassword'
      })
      .reply(200);

    changePassword('userid', 'username', 'passw0rd', 'newPassword')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });

  test('should call /oauth/token twice with grant_type client_credentials and password', (done) => {
    nock('https://test.com')
      .post('/oauth/token', {
        username: 'userid',
        password: 'passw0rd',
        grant_type: 'password',
        client_id: 'client_id',
        client_secret: 'client_secret',
        realm: 'conn'
      }) // call to validate password
      .once()
      .reply(200)
      .post('/oauth/token', {
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        client_id: 'client_id',
        client_secret: 'client_secret'
      }) // call to fetch management API token
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .patch('/api/v2/users/userid')
      .reply(200);

    changePassword('userid', 'username', 'passw0rd', 'newPassword', 'conn')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});
