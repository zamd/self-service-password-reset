import jwt from 'jsonwebtoken';
import certs from './certs.json';

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

module.exports.getHS256Token = (secret, domain, scope, sub, aud) => {
  const data = {
    iss: `https://${domain}/`,
    aud,
    sub,
    scope
  };
  return jwt.sign(data, secret, {
    algorithm: 'HS256'
  });
};
