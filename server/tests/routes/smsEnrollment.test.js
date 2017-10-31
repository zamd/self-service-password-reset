/* eslint global-require: 0 */

import request from 'supertest';
import nconf from 'nconf';
import app from '../../src';
import {
  getToken
} from '../mocks/tokens';

jest.mock('express-jwt');

jest.mock('../../src/lib/utils/config');

jest.mock('../../src/lib/requests/extractUserIdsHelper', () => jest.fn(() => {
  return {
    primary_user_id: 'primary_user_id',
    secondary_user_id: 'secondary_user_id'
  };
}));

jest.mock('../../src/lib/requests/linkAccounts', () =>
  jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject(Error())));

jest.mock('../../src/lib/requests/passwordlessSMS', () => ({
  startPasswordlessSms: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject(Error())),
  verifyPasswordlessSms: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject(Error()))
    .mockReturnValueOnce(Promise.resolve())
}));

describe('SMS enrollment routes', () => {
  beforeEach(() => {
    require('../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should return status code 401 when no Authorization Header is passed to start enrollment', (done) => {
    request(app)
      .post('/api/enrollment/sms')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 400 when no phone number is passed to start enrollment', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/sms')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Phone number is required');
        done();
      });
  });

  test('should return status code 400 when invalid phone number is passed to start enrollment', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/sms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        phone_number: 'invalid'
      })
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Phone number format is not correct');
        done();
      });
  });

  test('should return status 200 if start enrollment successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/sms')
      .send({
        phone_number: '+00000000000'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        done();
      });
  });

  test('should return status 500 if start enrollment not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/sms')
      .send({
        phone_number: '+00000000000'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });

  test('should return status code 401 when no Authorization Header is passed to verify enrollment', (done) => {
    request(app)
      .post('/api/enrollment/verify/sms')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 400 when no phone number is passed to verify enrollment', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/sms')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Phone number is required');
        done();
      });
  });

  test('should return status code 400 when invalid phone number is passed to verify enrollment', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/sms')
      .send({
        phone_number: 'invalid'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Phone number format is not correct');
        done();
      });
  });

  test('should return status 200 if verify enrollment successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/sms')
      .send({
        phone_number: '+00000000000'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        done();
      });
  });

  test('should return status 500 if verify enrollment not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/sms')
      .send({
        phone_number: '+00000000000'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });

  test('should return status 500 if link accounts not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/sms')
      .send({
        phone_number: '+00000000000'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });
});
