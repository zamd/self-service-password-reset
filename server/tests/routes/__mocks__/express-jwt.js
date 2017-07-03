import jwt from 'jsonwebtoken';

const expressJwt = jest.genMockFromModule('express-jwt');

expressJwt.mockImplementation(() => (req, res, next) => {
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    const token = jwt.decode(parts[1], { complete: true }) || {};
    req.user = res.user || {};
    req.user.scope = token.payload.scope;
  }

  next();
});

module.exports = expressJwt;
