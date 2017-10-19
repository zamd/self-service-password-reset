/* eslint global-require: 0 */

import nock from 'nock';
import { ManagementClient } from 'auth0';
import { getManagementClient } from '../../../src/lib/utils/auth0';

import deleteEnrollment from '../../../src/lib/requests/deleteEnrollment';

jest.mock('../../../src/lib/utils/auth0', () => ({
  getManagementClient: jest.fn()
}));

describe('DeleteEnrollment', () => {
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
    deleteEnrollment('primaryuserid', 'linkeduserid', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle unauthorized errors correctly for unlink user', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .delete('/api/v2/users/primaryuserid/identities/provider/linkeduserid')
      .reply(401, 'Unauthorized');

    deleteEnrollment('primaryuserid', 'linkeduserid', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized errors correctly for delete user', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .delete('/api/v2/users/primaryuserid/identities/provider/linkeduserid')
      .reply(200)
      .delete(`/api/v2/users/${encodeURIComponent('provider|linkeduserid')}`)
      .reply(401);

    deleteEnrollment('primaryuserid', 'linkeduserid', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should unlink and delete user', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600
      })
      .delete('/api/v2/users/primaryuserid/identities/provider/linkeduserid')
      .reply(200)
      .delete(`/api/v2/users/${encodeURIComponent('provider|linkeduserid')}`)
      .reply(200);

    deleteEnrollment('primaryuserid', 'linkeduserid', 'provider')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});
