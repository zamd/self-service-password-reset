/* eslint global-require: 0 */

import nock from 'nock';
import getManagementToken from '../../../src/lib/requests/getManagementToken';

jest.mock('../../../src/lib/utils/config');

describe('GetManagementToken', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    getManagementToken()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
        done();
        nock.cleanAll();
      });
  });

  test('should handle forbidden when non non-interactive client is used', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(403, {
        error: 'access_denied',
        error_description: ''
      });

    getManagementToken()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.response.body.error).toBeDefined();
        expect(err.response.body.error).toBe('access_denied');
        expect(err.status).toBe(403);
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized when incorrect client secret is used', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .reply(401, {
        error: 'access_denied',
        error_description: 'Unauthorized'
      });

    getManagementToken()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.response.body.error).toBeDefined();
        expect(err.response.body.error).toBe('access_denied');
        expect(err.response.body.error_description).toBe('Unauthorized');
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should return the access token form the cache the second time', (done) => {
    nock('https://test.com')
      .post('/oauth/token')
      .once()
      .reply(200, {
        access_token: 'access_token_value',
        expires_in: 1000
      });

    getManagementToken()
      .then((accessToken) => {
        expect(accessToken).toBeDefined();
        expect(accessToken).toBe('access_token_value');
        getManagementToken()
          .then((cachedAccessToken) => {
            expect(cachedAccessToken).toBeDefined();
            expect(cachedAccessToken).toBe('access_token_value');
            done();
            nock.cleanAll();
          });
      });
  });

  test('should get a new access_token when previous access_token is expired', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('test3.com', 'client_id', 'client_secret');

    nock('https://test3.com')
      .post('/oauth/token')
      .once()
      .reply(200, {
        access_token: 'access_token_value',
        expires_in: 0.001 // 1ms
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token_value',
        expires_in: 1000
      });

    getManagementToken()
      .then((accessToken) => {
        expect(accessToken).toBeDefined();
        expect(accessToken).toBe('access_token_value');

        setTimeout(() => {
          getManagementToken()
            .then((cachedAccessToken) => {
              expect(cachedAccessToken).toBeDefined();
              expect(cachedAccessToken).toBe('new_access_token_value');
              done();
              nock.cleanAll();
            });
        }, 10);
      });
  });

  test('should send correct payload', (done) => {
    nock('https://test4.com')
      .post('/oauth/token', {
        grant_type: 'client_credentials',
        client_id: 'client_id',
        client_secret: 'client_secret',
        audience: 'https://test4.com/api/v2/'
      })
      .reply(200, {
        access_token: 'access_token_value',
        expires_in: 0.001 // 1ms
      });

    getManagementToken()
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});
