/* eslint global-require: 0 */

import request from 'supertest';
import nconf from 'nconf';
import app from '../../src';
import {
  getToken
} from '../mocks/tokens';

jest.mock('express-jwt');

jest.mock('../../src/lib/utils/config');

jest.mock('../../src/lib/requests/resetPassword', () => jest.fn()
  .mockReturnValueOnce(Promise.resolve())
  .mockReturnValueOnce(Promise.reject(new Error()))
);

describe('PasswordReset', () => {
  beforeEach(() => {
    require('../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should return status code 401 when no Authorization Header is passed', (done) => {
    request(app)
      .post('/api/password/reset')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 400 when no user is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'reset:password');
    request(app)
      .post('/api/password/reset')
      .send({
        password: 'password'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });

  test('should return status code 400 when no password is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'reset:password');
    request(app)
      .post('/api/password/reset')
      .send({
        userId: 'userid'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });


  test('should return status code 200 is password reset is successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'reset:password');

    request(app)
      .post('/api/password/reset')
      .send({
        userId: 'userid',
        password: 'password'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        done();
      });
  });

  test('should return status code 500 is password reset is not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'reset:password');

    request(app)
      .post('/api/password/reset')
      .send({
        userId: 'userid',
        password: 'password'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });
});
