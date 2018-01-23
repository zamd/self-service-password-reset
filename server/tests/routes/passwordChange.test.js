/* eslint global-require: 0 */

import request from 'supertest';
import nconf from 'nconf';
import app from '../../src';
import {
  getToken
} from '../mocks/tokens';

jest.mock('express-jwt');

jest.mock('../../src/lib/utils/config');

jest.mock('../../src/lib/requests/changePassword', () => jest.fn()
  .mockReturnValueOnce(Promise.resolve())
  .mockReturnValueOnce(Promise.reject(new Error()))
);

describe('PasswordChange', () => {
  beforeEach(() => {
    require('../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should return status code 401 when no Authorization Header is passed', (done) => {
    request(app)
      .post('/api/password/change')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 400 when no userId is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');
    request(app)
      .post('/api/password/change')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });

  test('should return status code 400 when no username is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');
    request(app)
      .post('/api/password/change')
      .send({
        userId: 'user_id'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });

  test('should return status code 400 when no new password is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');
    request(app)
      .post('/api/password/change')
      .send({
        userId: 'userId',
        username: 'username',
        old_password: 'password'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });

  test('should return status code 400 when no old password is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');
    request(app)
      .post('/api/password/change')
      .send({
        userId: 'userId',
        username: 'username',
        new_password: 'password'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });

  test('should return status code 400 when no connection is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');
    request(app)
      .post('/api/password/change')
      .send({
        userId: 'userId',
        username: 'username',
        new_password: 'password',
        old_password: 'password'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        done();
      });
  });

  test('should return status code 200 is password change is successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');

    request(app)
      .post('/api/password/change')
      .send({
        userId: 'userId',
        username: 'username',
        old_password: 'password',
        new_password: 'newpassword',
        connection: 'connection'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        done();
      });
  });

  test('should return status code 500 is password change is not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'change:password');

    request(app)
      .post('/api/password/change')
      .send({
        userId: 'userId',
        username: 'username',
        old_password: 'password',
        new_password: 'mm',
        connection: 'connection'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });
});
