import nock from 'nock';
import requestHelper from '../../../src/lib/requests/createRequestHelper';

describe('CreateRequestHandler', () => {
  test('should handle network errors correctly', (done) => {
    requestHelper('foo', {})
      .catch((err) => {
        expect(err).toBeDefined();
        done();
        nock.cleanAll();
      });
  });

  test('should handle unauthorized errors correctly', (done) => {
    nock('http://test.com')
      .post('/token')
      .reply(401, 'Unauthorized');

    requestHelper('http://test.com/token', {})
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBeDefined();
        expect(err.status).toBe(401);
        done();
        nock.cleanAll();
      });
  });

  test('should handle forbidden errors correctly', (done) => {
    nock('http://test.com')
      .post('/token')
      .reply(403, 'Forbidden');

    requestHelper('http://test.com/token', {})
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.status).toBeDefined();
        expect(err.status).toBe(403);
        done();
        nock.cleanAll();
      });
  });

  test('should return body when request is successful', (done) => {
    nock('http://test.com')
      .post('/token')
      .reply(200, { value: 'foo' });

    requestHelper('http://test.com/token', {})
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.value).toBeDefined();
        expect(data.value).toBe('foo');
        done();
        nock.cleanAll();
      });
  });
});
