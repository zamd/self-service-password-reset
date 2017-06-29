import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import resetPassword from '../lib/requests/resetPassword';

export default () => {
  const api = express.Router();

  api.post('/api/password/reset', jwtAuthz(['reset:password']), (req, res) => {
    const password = req.body.password;
    const userId = req.body.userId;

    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return res.send(400, {
        err: 'User id is required'
      });
    }

    if (typeof password !== 'string' || password.trim().length === 0) {
      return res.status(400).send({
        err: 'Password is required'
      });
    }

    return resetPassword(userId, password)
      .then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });

  return api;
};
