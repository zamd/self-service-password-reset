/* eslint global-require: 0 */

import nock from 'nock';
import { AuthenticationClient } from 'auth0';
import { getAuthenticationClient } from '../../../src/lib/utils/auth0';
import {
  startPasswordlessSms,
  verifyPasswordlessSms
} from '../../../src/lib/requests/passwordlessSMS';

jest.mock('../../../src/lib/utils/auth0', () => ({
  getAuthenticationClient: jest.fn()
}));

describe('verifyPasswordlessSms', () => {
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
    verifyPasswordlessSms('000000', '+32484788474')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe('ENOTFOUND');
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .post('/oauth/ro')
      .reply(401, 'Unauthorized');

    verifyPasswordlessSms('000000', '+32484788474')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBe(401);
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

    verifyPasswordlessSms('000000', '+32484788474')
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
        connection: 'sms',
        username: '+32484788474',
        password: '000000',
        grant_type: 'password',
        scope: 'openid'
      })
      .reply(200);

    verifyPasswordlessSms('000000', '+32484788474')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});

describe('startPasswordlessSMS', () => {
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
    startPasswordlessSms('+32484788474')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.statusCode).toBeDefined();
        expect(err.statusCode).toBe('ENOTFOUND');
        done();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('https://test.com')
      .post('/passwordless/start')
      .reply(401, 'Unauthorized');

    startPasswordlessSms('+32484788474')
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

    startPasswordlessSms('+32484788474')
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
        connection: 'sms',
        phone_number: '+32484788474',
        send: 'code'
      })
      .reply(200);

    startPasswordlessSms('+32484788474')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});
