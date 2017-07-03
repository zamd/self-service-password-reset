import request from 'supertest';
import nconf from 'nconf';
import app from '../../src';
import {
  getToken
} from '../mocks/tokens';

jest.mock('express-jwt');

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

jest.mock('../../src/lib/requests/passwordlessEmail', () => ({
  startPasswordlessEmail: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject(Error())),
  verifyPasswordlessEmail: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject(Error()))
    .mockReturnValueOnce(Promise.resolve())
}));


describe('Email enrollment routes', () => {
  test('should return status code 401 when no Authorization Header is passed to start enrollment', (done) => {
    request(app)
      .post('/api/enrollment/email')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 400 when no email is passed to start enrollment', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/email')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Email is required');
        done();
      });
  });

  test('should return status 200 if start enrollment successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/email')
      .send({
        email: 'test@auth0.com'
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
      .post('/api/enrollment/email')
      .send({
        email: 'test@auth0.com'
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
      .post('/api/enrollment/verify/email')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 400 when no email is passed to verify enrollment', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/email')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Email is required');
        done();
      });
  });

  test('should return status 200 if verify enrollment successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'create:enrolment');
    request(app)
      .post('/api/enrollment/verify/email')
      .send({
        email: 'test@auth0.com',
        otp: '000000'
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
      .post('/api/enrollment/verify/email')
      .send({
        email: 'test@auth0.com'
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
      .post('/api/enrollment/verify/email')
      .send({
        email: 'test@auth0.com'
      })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });
});
