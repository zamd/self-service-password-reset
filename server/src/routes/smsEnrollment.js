import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import {
  startPasswordlessSms,
  verifyPasswordlessSms
} from '../lib/requests/passwordlessSMS';
import linkAccounts from '../lib/requests/linkAccounts';
import getUserIds from '../lib/requests/extractUserIdsHelper';


export default () => {
  const api = express.Router();

  api.post('/api/enrollment/sms', jwtAuthz(['create:enrolment']), (req, res) => {
    const phoneNumber = req.body.phone_number;

    if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0) {
      return res.send(400, {
        err: 'Phone number is required'
      });
    }

    if (!phoneNumber.match(/^\+?[0-9]{1,15}$/)) {
      return res.send(400, {
        err: 'Phone number format is not correct'
      });
    }

    return startPasswordlessSms(phoneNumber)
      .then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        res.sendStatus(500);
      });
  });

  api.post('/api/enrollment/verify/sms', jwtAuthz(['create:enrolment']), (req, res) => {
    const phoneNumber = req.body.phone_number;
    const otp = req.body.otp;

    if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0) {
      return res.send(400, {
        err: 'Phone number is required'
      });
    }

    if (!phoneNumber.match(/^\+?[0-9]{1,15}$/)) {
      return res.send(400, {
        err: 'Phone number format is not correct'
      });
    }

    return verifyPasswordlessSms(otp, phoneNumber)
      .then((body) => {
        const userIds = getUserIds(req, body);
        linkAccounts(userIds.primary_user_id, userIds.secondary_user_id, 'sms')
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
