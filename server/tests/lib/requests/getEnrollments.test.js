import nock from 'nock';
import getEnrollments from '../../../src/lib/requests/getEnrollments';

jest.mock('../../../src/lib/utils/config');
jest.mock('../../../src/lib/requests/getManagementToken', () => {
  return jest.fn(() => Promise.resolve('access_token'));
});


describe('GetEnrollments', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', (done) => {
    require('../../../src/lib/utils/config').setMockConfig('fake-domain', 'client_id', 'client_secret');
    getEnrollments('foo-domain', 'userid')
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
      .get('/api/v2/users/userid')
      .reply(401, 'Unauthorized');

    getEnrollments('userid')
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should only return enrollments for passwordless (sms / email) identities', (done) => {
    nock('https://test.com')
      .get('/api/v2/users/userid')
      .reply(200, {
        identities: [{
          profileData: {
            email: 'test@auth0.com',
            email_verified: true
          },
          provider: 'email'
        }, {
          profileData: {
            phone_number: '0000',
            phone_verified: true
          },
          provider: 'sms'
        }, {
          provider: 'google'
        }]
      });

    getEnrollments('userid')
      .then((enrollments) => {
        expect(enrollments).toBeDefined();
        expect(enrollments.length).toBe(2);
        expect(enrollments[0].verified).toBe(true);
        expect(enrollments[0].email).toBe('test@auth0.com');
        expect(enrollments[1].verified).toBe(true);
        expect(enrollments[1].phone_number).toBe('0000');
        done();
        nock.cleanAll();
      });
  });

  test('should return empty array if user has no passwordless identities', (done) => {
    nock('https://test.com')
      .get('/api/v2/users/userid')
      .reply(200, {
        identities: [{
          provider: 'google'
        }]
      });

    getEnrollments('userid')
      .then((enrollments) => {
        expect(enrollments).toBeDefined();
        expect(enrollments.length).toBe(0);
        done();
        nock.cleanAll();
      });
  });
});
