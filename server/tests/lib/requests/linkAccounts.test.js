/* eslint global-require: 0 */

import nock from 'nock';
import linkAccounts from '../../../src/lib/requests/linkAccounts';

jest.mock('../../../src/lib/utils/config');
jest.mock('../../../src/lib/requests/getManagementToken', () => jest.fn()
  .mockReturnValueOnce(Promise.reject(Error()))
  .mockReturnValue(Promise.resolve('access_token')));

describe('LinkAccount', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle getManagementToken errors', (done) => {
    linkAccounts()
      .catch((err) => {
        expect(err).toBeDefined();
        done();
      });
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    linkAccounts()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .post('/api/v2/users/userid/identities')
      .reply(401, 'Unauthorized');

    linkAccounts('userid', 'passwordLessUserId', 'provider')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should link passwordless user to a regular user', (done) => {
    nock('https://test.com')
      .post('/api/v2/users/userid/identities')
      .reply(200, {
        payload: 'value'
      });

    linkAccounts('userid', 'passwordLessUserId', 'provider')
      .then((body) => {
        expect(body).toBeDefined();
        expect(body.payload).toBe('value');
        done();
        nock.cleanAll();
      });
  });

  test('should send correct payload', (done) => {
    nock('https://test.com')
      .post('/api/v2/users/userid/identities', {
        provider: 'provider',
        user_id: 'passwordLessUserId'
      })
      .reply(200);

    linkAccounts('userid', 'passwordLessUserId', 'provider')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});