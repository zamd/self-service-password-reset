import nock from 'nock';
import jwt from 'jsonwebtoken';
import certs from './certs.json';

module.exports.wellKnownEndpoint = (domain, cert, kid) =>
  nock(`https://${domain}`)
    .get('/.well-known/jwks.json')
    .times(3)
    .reply(200, {
      keys: [{
        alg: 'RS256',
        use: 'sig',
        kty: 'RSA',
        x5c: [cert.match(/-----BEGIN CERTIFICATE-----([\s\S]*)-----END CERTIFICATE-----/i)[1].replace('\n', '')],
        kid
      }]
    });

module.exports.sign = (cert, kid, payload) =>
  jwt.sign(payload, cert, {
    header: {
      kid
    },
    algorithm: 'RS256'
  });

module.exports.getToken = (domain, scope) => {
  const data = {
    iss: `https://${domain}/`,
    aud: 'urn:self-service-portal-api',
    sub: 'foo',
    scope
  };

  return module.exports.sign(certs.bar.private, 'key2', data);
};
