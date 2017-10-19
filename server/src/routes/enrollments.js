import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuthz from 'express-jwt-authz';
import getEnrollments from '../lib/requests/getEnrollments';
import deleteEnrollment from '../lib/requests/deleteEnrollment';

export default () => {
  const api = express.Router();

  api.get('/api/enrollments', jwtAuthz(['read:enrolment']), (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = jwt.decode(accessToken);

    getEnrollments(decodedAccessToken.sub)
      .then(enrollments => res.json(enrollments))
      .catch(err => next(err));
  });

  api.delete('/api/enrollments/:provider/:userId', jwtAuthz(['delete:enrolment']), (req, res, next) => {
    const userId = req.params.userId;
    const provider = req.params.provider;

    if (provider.toLowerCase().indexOf('sms') === -1 && provider.toLowerCase().indexOf('email') === -1) {
      return res.send(400, {
        err: 'Provider value should be sms or email'
      });
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = jwt.decode(accessToken);

    return deleteEnrollment(decodedAccessToken.sub, userId, provider)
      .then(() => res.send(200))
      .catch(err => next(err));
  });

  return api;
};
