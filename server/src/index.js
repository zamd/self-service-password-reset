import morgan from 'morgan';
import Express from 'express';
import bodyParser from 'body-parser';
import logger from './lib/logger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import jwt from 'jsonwebtoken';
import jwtExpress from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';

import { startPasswordlessSMS, verifyPasswordlessSMS } from './lib/requests/passwordlessSMS';
import { startPasswordlessEMail, verifyPasswordlessEmail } from './lib/requests/passwordlessEmail';
import { linkAccounts } from './lib/requests/linkAccounts';
import { getEnrollments } from './lib/requests/getEnrollments';

dotenv.config({
  path: __dirname + '/.env'
})

const app = new Express();
app.use(helmet());
app.disable('X-Powered-By'); // Looks like helmet or this line don't remove the X-Powered-By :-(

app.use(cors({
  "origin": process.env.VALID_CORS_ORIGINS.split(' '),
}));
// Enable pre-flight for all.
app.options('*', cors())

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: logger.stream
}));

const cookieSecret = '123'; // Some random secret.
app.use(cookieParser(cookieSecret))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(jwtExpress({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: `${process.env.AUDIENCE}`,
  issuer: `https://${process.env.DOMAIN}/`,
  algorithms: ['RS256']
}));

app.post('/api/enrollment/sms', jwtAuthz(['create:enrolment']), function (req, res) {

  const phone_number = req.body.phone_number;

  if (typeof phone_number !== 'string' || phone_number.trim().length === 0) {
    return res.send(400, {
      err: 'Phone number is required'
    });
  }

  if (!phone_number.match(/^\+?[0-9]{1,15}$/)) {
    return res.send(400, {
      err: 'Phone number format is not correct'
    });
  }

  startPasswordlessSMS(phone_number)
    .then(body => {
      res.sendStatus(200);
    }).catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});

app.post('/api/enrollment/email', jwtAuthz(['create:enrolment']), function (req, res) {

  const email = req.body.email;

  if (typeof email !== 'string' || email.trim().length === 0) {
    return res.send(400, {
      err: 'Email is required'
    });
  }

  startPasswordlessEMail(email)
    .then(body => {
      res.sendStatus(200);
    }).catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});

const getUserIds = (req, body) => {
  const validationOptions = {
    issuer: `https://${process.env.DOMAIN}/`,
    audience: process.env.NON_INTERACTIVE_CLIENT_ID
  }
  const decoded_id_token = jwt.verify(body.id_token, process.env.NON_INTERACTIVE_CLIENT_SECRET, validationOptions);

  const access_token = req.headers.authorization.split(' ')[1];
  const decoded_access_token = jwt.decode(access_token);

  return {
    primary_user_id: decoded_access_token.sub,
    secondary_user_id: decoded_id_token.sub
  }
}

app.post('/api/enrollment/verify/email', jwtAuthz(['create:enrolment']), function (req, res) {
  const email = req.body.email;
  const otp = req.body.otp;

  if (typeof email !== 'string' || email.trim().length === 0) {
    return res.send(400, {
      err: 'Email is required'
    });
  }

  verifyPasswordlessEmail(otp, email)
    .then(body => {

      var userIds = getUserIds(req, body);
      linkAccounts(userIds.primary_user_id, userIds.secondary_user_id, 'email')
        .then((data) => {
          res.sendStatus(200);
        })
        .catch(err => {
          res.sendStatus(500);
          console.log(err);
        });
    }).catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});

app.post('/api/enrollment/verify/sms', jwtAuthz(['create:enrolment']), function (req, res) {
  const phone_number = req.body.phone_number;
  const otp = req.body.otp;

  if (!phone_number.match(/^\+?[0-9]{1,15}$/)) {
    return res.send(400, {
      err: 'Phone number format is not correct'
    });
  }

  verifyPasswordlessSMS(otp, phone_number)
    .then(body => {

      var userIds = getUserIds(req, body);
      linkAccounts(userIds.primary_user_id, userIds.secondary_user_id, 'sms')
        .then((data) => {
          res.sendStatus(200);
        })
        .catch(err => {
          res.sendStatus(500);
          console.log(err);
        });
    }).catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});

app.get('/api/enrollments', jwtAuthz(['read:enrolment']), function (req, res) {
  const access_token = req.headers.authorization.split(' ')[1];
  const decoded_access_token = jwt.decode(access_token);

  getEnrollments(decoded_access_token.sub)
    .then(enrollments => {
      res.json(enrollments);
    }).catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
})