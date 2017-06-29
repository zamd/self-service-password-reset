import nock from 'nock';
import {
  startPasswordlessEMail,
  verifyPasswordlessEmail
} from '../../../src/lib/requests/passwordlessEmail';

jest.mock('../../../src/lib/utils/config');
jest.mock('../../../src/lib/requests/getManagementToken', () => jest.fn(() => Promise.resolve('access_token')));

describe('verifyPasswordlessEmail', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    verifyPasswordlessEmail()
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

describe('startPasswordlessEMail', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    startPasswordlessEMail('test@auth.com')
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

    startPasswordlessEMail('test@auth.com')
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

    startPasswordlessEMail('test@auth.com')
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

    startPasswordlessEMail('test@auth.com')
      .then(() => {
        done();
        nock.cleanAll();
      });
  });
});