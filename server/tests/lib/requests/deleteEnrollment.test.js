/* eslint global-require: 0 */

import nock from 'nock';
import deleteEnrollment from '../../../src/lib/requests/deleteEnrollment';

jest.mock('../../../src/lib/utils/config');
jest.mock('../../../src/lib/requests/getManagementToken', () => jest.fn(() => Promise.resolve('access_token')));

describe('DeleteEnrollment', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    deleteEnrollment('token', 'primaryuserid', 'linkeduserid', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle unauthorized errors correctly for unlink user', (done) => {
    nock('https://test.com')
      .delete('/api/v2/users/primaryuserid/identities/provider/linkeduserid')
      .reply(401, 'Unauthorized');

    deleteEnrollment('primaryuserid', 'linkeduserid', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized errors correctly for delete user', (done) => {
    nock('https://test.com')
      .delete('/api/v2/users/primaryuserid/identities/provider/linkeduserid')
      .reply(200)
      .delete(`/api/v2/users/${encodeURIComponent('provider|linkeduserid')}`)
      .reply(401);

    deleteEnrollment('primaryuserid', 'linkeduserid', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should unlink and delete user', (done) => {
    nock('https://test.com')
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
