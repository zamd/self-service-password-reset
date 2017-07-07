/* eslint global-require: 0 */

import nock from 'nock';
import {
  startPasswordlessSms,
  verifyPasswordlessSms
} from '../../../src/lib/requests/passwordlessSMS';

jest.mock('../../../src/lib/utils/config');
jest.mock('../../../src/lib/requests/getManagementToken', () => jest.fn(() => Promise.resolve('access_token')));

describe('verifyPasswordlessSms', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    verifyPasswordlessSms()
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
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
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    startPasswordlessSms('+32484788474')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toBeDefined();
        expect(err.code).toBe('ENOTFOUND');
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
        expect(err.status).toBe(401);
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
