import request from 'supertest';
import nconf from 'nconf';
import app from '../../src';
import {
  getToken
} from '../mocks/tokens';

jest.mock('express-jwt');

jest.mock('../../src/lib/requests/getEnrollments', () =>
  jest.fn()
    .mockReturnValueOnce(Promise.resolve({
      data: 'value'
    }))
    .mockReturnValueOnce(Promise.reject(Error())));

jest.mock('../../src/lib/requests/deleteEnrollment', () =>
  jest.fn()
    .mockReturnValueOnce(Promise.resolve({
      data: 'value'
    }))
    .mockReturnValueOnce(Promise.reject(Error())));

describe('Get enrollment route', () => {
  test('should return status code 401 when no Authorization Header is passed', (done) => {
    request(app)
      .get('/api/enrollments')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return enrollments', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'read:enrolment');
    request(app)
      .get('/api/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.body.data).toBe('value');
        done();
      });
  });

  test('should return status code 500 when getEnrollments is not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'read:enrolment');
    request(app)
      .get('/api/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });
});

describe('Delete enrollment route', () => {
  test('should return status code 401 when no Authorization Header is passed', (done) => {
    request(app)
      .delete('/api/enrollments/sms/user_id')
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.text).toBe('Insufficient scope');
        done();
      });
  });

  test('should return status code 404 when provider is not specified', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'delete:enrolment');
    request(app)
      .delete('/api/enrollments/')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(404);
        done();
      });
  });

  test('should return status code 404 when user_id is not specified', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'delete:enrolment');
    request(app)
      .delete('/api/enrollments/sms')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(404);
        done();
      });
  });

  test('should return status code 400 when invalid provide is passed', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'delete:enrolment');
    request(app)
      .delete('/api/enrollments/invalid_provider/user_id')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.err).toBe('Provider value should be sms or email');
        done();
      });
  });

  test('should return status code 200 when delete enrollment is successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'delete:enrolment');
    request(app)
      .delete('/api/enrollments/sms/user_id')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        done();
      });
  });

  test('should return status code 500 when delete enrollment is not successful', (done) => {
    const token = getToken(nconf.get('DOMAIN'), 'delete:enrolment');
    request(app)
      .delete('/api/enrollments/sms/user_id')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(500);
        done();
      });
  });
});
