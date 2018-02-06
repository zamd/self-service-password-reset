/* eslint global-require: 0 */

import nock from 'nock';
import { AuthenticationClient } from 'auth0';
import { getAuthenticationClient } from '../../../src/lib/utils/auth0';
import {
  startPasswordlessEmail,
  verifyPasswordlessEmail
} from '../../../src/lib/requests/passwordlessEmail';

jest.mock('../../../src/lib/utils/auth0', () => ({
  getAuthenticationClient: jest.fn()
}));

jest.mock('../../../src/lib/utils/config');

describe('verifyPasswordlessEmail', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    verifyPasswordlessEmail('000000', 'test@auth.com')
      .catch((err) => {
        expect(err).toBeDefined();
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .post('/oauth/ro')
      .reply(401, 'Unauthorized');

    verifyPasswordlessEmail('000000', 'test@auth.com')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should return successful response', (done) => {
    nock('https://test.com')
      .post('/oauth/ro')
      .reply(200, {
        payload: 'value'
      });

    verifyPasswordlessEmail('000000', 'test@auth.com')
      .then((body) => {
        expect(body).toBeDefined();
        expect(body.payload).toBe('value');
        done();
        nock.cleanAll();
      });
  });

  test('should send correct payload', (done) => {
    nock('https://test.com')
      .post('/oauth/ro', {
        client_id: 'client_id',
        connection: 'email',
        username: 'test@auth.com',
        password: '000000',
        grant_type: 'password',
        scope: 'openid'
      })
      .reply(200);

    verifyPasswordlessEmail('000000', 'test@auth.com')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});

describe('startPasswordlessEmail', () => {
  beforeEach(() => {
    getAuthenticationClient.mockImplementation(() => new AuthenticationClient({
      domain: 'test.com',
      clientId: 'client_id'
    }));
  });

  test('should handle network errors correctly', (done) => {
    getAuthenticationClient.mockImplementation(() => new AuthenticationClient({
      domain: 'fake-domain',
      clientId: 'client_id'
    }));
    startPasswordlessEmail('test@auth.com')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeUndefined();
        expect(err.name).toBeDefined();
        expect(err.name).toBe('APIError');
        done();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .post('/passwordless/start')
      .reply(401, 'Unauthorized');

    startPasswordlessEmail('test@auth.com')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should return successful response', (done) => {
    nock('https://test.com')
      .post('/passwordless/start')
      .reply(200, {
        payload: 'value'
      });

    startPasswordlessEmail('test@auth.com')
      .then((body) => {
        expect(body).toBeDefined();
        expect(body.payload).toBe('value');
        done();
        nock.cleanAll();
      });
  });

  test('should send correct payload', (done) => {
    nock('https://test.com')
      .post('/passwordless/start', {
        client_id: 'client_id',
        connection: 'email',
        send: 'code',
        email: 'test@auth.com'
      })
      .reply(200);

    startPasswordlessEmail('test@auth.com')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});
