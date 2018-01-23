import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import changePassword from '../lib/requests/changePassword';

export default () => {
  const api = express.Router();

  api.post('/api/password/change', jwtAuthz(['change:password']), (req, res, next) => {
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;
    const userId = req.body.userId;
    const username = req.body.username;
    const connection = req.body.connection;

    if (typeof userId !== 'string' || userId.trim().length === 0) {
      return res.send(400, {
        err: 'UserId is required'
      });
    }

    if (typeof username !== 'string' || username.trim().length === 0) {
      return res.send(400, {
        err: 'Username is required'
      });
    }

    if (typeof oldPassword !== 'string' || oldPassword.trim().length === 0) {
      return res.send(400, {
        err: 'Old Password is required'
      });
    }

    if (typeof newPassword !== 'string' || newPassword.trim().length === 0) {
      return res.send(400, {
        err: 'New Password is required'
      });
    }

    if (typeof connection !== 'string' || connection.trim().length === 0) {
      return res.send(400, {
        err: 'Connection is required'
      });
    }

    return changePassword(userId, username, oldPassword, newPassword, connection)
      .then(() => res.send(200))
      .catch((err) => {
        next(err);
      });
  });

  return api;
};
