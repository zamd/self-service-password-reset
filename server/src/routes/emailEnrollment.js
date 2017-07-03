import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import {
  startPasswordlessEmail,
  verifyPasswordlessEmail
} from '../lib/requests/passwordlessEmail';
import linkAccounts from '../lib/requests/linkAccounts';
import getUserIds from '../lib/requests/extractUserIdsHelper';


export default () => {
  const api = express.Router();

  api.post('/api/enrollment/email', jwtAuthz(['create:enrolment']), (req, res) => {
    const email = req.body.email;

    if (typeof email !== 'string' || email.trim().length === 0) {
      return res.send(400, {
        err: 'Email is required'
      });
    }

    return startPasswordlessEmail(email)
      .then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        res.sendStatus(500);
      });
  });

  api.post('/api/enrollment/verify/email', jwtAuthz(['create:enrolment']), (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    if (typeof email !== 'string' || email.trim().length === 0) {
      return res.send(400, {
        err: 'Email is required'
      });
    }

    return verifyPasswordlessEmail(otp, email)
      .then((body) => {
        const userIds = getUserIds(req, body);

        linkAccounts(userIds.primary_user_id, userIds.secondary_user_id, 'email')
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.sendStatus(500);
          });
      }).catch((err) => {
        res.sendStatus(500);
      });
  });

  return api;
};
