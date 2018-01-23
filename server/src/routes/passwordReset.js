import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import resetPassword from '../lib/requests/resetPassword';

export default () => {
  const api = express.Router();

  api.post('/password/reset', jwtAuthz(['reset:password']), (req, res, next) => {
    const password = req.body.password;
    const userId = req.body.userId;

    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return res.send(400, {
        err: 'User id is required'
      });
    }

    if (typeof password !== 'string' || password.trim().length === 0) {
      return res.send(400, {
        err: 'Password is required'
      });
    }

    return resetPassword(userId, password)
      .then(() => res.send(200))
      .catch(err => next(err));
  });

  return api;
};
