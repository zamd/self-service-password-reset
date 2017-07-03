/* eslint global-require: 0 */

import nock from 'nock';
import resetPassword from '../../../src/lib/requests/resetPassword';

jest.mock('../../../src/lib/utils/config');
jest.mock('../../../src/lib/requests/getManagementToken', () => jest.fn()
  .mockReturnValueOnce(Promise.reject(Error()))
  .mockReturnValue(Promise.resolve('access_token')));

describe('ResetPassword', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle getManagementToken errors', (done) => {
    resetPassword('userid', 'passw0rd')
      .catch((err) => {
        expect(err).toBeDefined();
        done();
      });
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    resetPassword()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .patch('/api/v2/users/userid')
      .reply(401, 'Unauthorized');

    resetPassword('userid', 'passw0rd')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should link passwordless user to a regular user', (done) => {
    nock('https://test.com')
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
