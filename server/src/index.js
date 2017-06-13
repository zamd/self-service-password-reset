import morgan from 'morgan';
import Express from 'express';
import bodyParser from 'body-parser';
import logger from './lib/logger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';
import jwtExpress from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import {
  startPasswordlessSMS,
  startPasswordlessEMail,
  verifyPasswordlessEmail,
  verifyPasswordlessSMS,
  linkAccounts
} from './lib/requests';

dotenv.config({
  path: __dirname + '/.env'
})

const app = new Express();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: logger.stream
}));

app.use(helmet());

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

app.post('/api/enrollment/sms', function (req, res) {

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

app.post('/api/enrollment/email', function (req, res) {

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


app.post('/api/enrollment/verify/email', function (req, res) {
  const email = req.body.email;
  const otp = req.body.otp;

  if (typeof email !== 'string' || email.trim().length === 0) {
    return res.send(400, {
      err: 'Email is required'
    });
  }

  verifyPasswordlessEmail(otp, email)
    .then(body => {
      // Verify the id_token, currently the token algorithm is HS, we should aim for RS so we can validate it with the public cert.

      const decoded_id_token = jwt.decode(body.id_token);
      const access_token = req.headers.authorization.split(' ')[1];
      const decoded_access_token = jwt.decode(access_token);

      // link account
      linkAccounts(decoded_access_token.sub, decoded_id_token.sub, 'email')
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

app.post('/api/enrollment/verify/sms', function (req, res) {
  const phone_number = req.body.phone_number;
  const otp = req.body.otp;

  if (!phone_number.match(/^\+?[0-9]{1,15}$/)) {
    return res.send(400, {
      err: 'Phone number format is not correct'
    });
  }

  verifyPasswordlessSMS(otp, phone_number)
    .then(body => {
      // Verify the id_token, currently the token type is HS, we should aim for RS so we can validate it with the public cert.

      const decoded_id_token = jwt.decode(body.id_token);
      const access_token = req.headers.authorization.split(' ')[1];
      const decoded_access_token = jwt.decode(access_token);

      // link account
      linkAccounts(decoded_access_token.sub, decoded_id_token.sub, 'sms')
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

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
})