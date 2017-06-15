import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuthz from 'express-jwt-authz';

import { startPasswordlessSMS, verifyPasswordlessSMS } from '../lib/requests/passwordlessSMS';
import { startPasswordlessEMail, verifyPasswordlessEmail } from '../lib/requests/passwordlessEmail';
import linkAccounts from '../lib/requests/linkAccounts';
import getEnrollments from '../lib/requests/getEnrollments';

const getUserIds = (req, body) => {
  const validationOptions = {
    issuer: `https://${process.env.DOMAIN}/`,
    audience: process.env.NON_INTERACTIVE_CLIENT_ID
  };
  const decodedIdToken = jwt.verify(body.id_token,
    process.env.NON_INTERACTIVE_CLIENT_SECRET, validationOptions);

  const accessToken = req.headers.authorization.split(' ')[1];
  const decodedAccessToken = jwt.decode(accessToken);

  return {
    primary_user_id: decodedAccessToken.sub,
    secondary_user_id: decodedIdToken.sub
  };
};

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

    return startPasswordlessSMS(phoneNumber)
      .then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });

  api.post('/api/enrollment/email', jwtAuthz(['create:enrolment']), (req, res) => {
    const email = req.body.email;

    if (typeof email !== 'string' || email.trim().length === 0) {
      return res.send(400, {
        err: 'Email is required'
      });
    }

    return startPasswordlessEMail(email)
      .then(() => {
        res.sendStatus(200);
      }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
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
            console.log(err);
          });
      }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });

  api.post('/api/enrollment/verify/sms', jwtAuthz(['create:enrolment']), (req, res) => {
    const phoneNumber = req.body.phone_number;
    const otp = req.body.otp;

    if (!phoneNumber.match(/^\+?[0-9]{1,15}$/)) {
      return res.send(400, {
        err: 'Phone number format is not correct'
      });
    }

    return verifyPasswordlessSMS(otp, phoneNumber)
      .then((body) => {
        const userIds = getUserIds(req, body);
        linkAccounts(userIds.primary_user_id, userIds.secondary_user_id, 'sms')
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.sendStatus(500);
            console.log(err);
          });
      }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });

  api.get('/api/enrollments', jwtAuthz(['read:enrolment']), (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = jwt.decode(accessToken);

    getEnrollments(decodedAccessToken.sub)
      .then((enrollments) => {
        res.json(enrollments);
      }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });

  return api;
};
