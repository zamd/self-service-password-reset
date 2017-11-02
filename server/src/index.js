import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import nconf from 'nconf';
import cors from 'cors';
import jwtExpress from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import logger from './lib/logger';
import routes from './routes';

dotenv.config({
  path: `${__dirname}/.env`
});

nconf
  .argv()
  .env();

const app = new Express();

app.use(helmet());
app.disable('X-Powered-By'); // Looks like helmet or this line doesn't remove the X-Powered-By :-(

app.use(cors({
  origin: process.env.VALID_CORS_ORIGINS ? process.env.VALID_CORS_ORIGINS.split(' ') : []
}));
// Enable pre-flight for all.
app.options('*', cors());

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: logger.stream
}));

const cookieSecret = '123'; // Some random secret.
app.use(cookieParser(cookieSecret));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(jwtExpress({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${nconf.get('DOMAIN')}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: `${nconf.get('AUDIENCE')}`,
  issuer: `https://${nconf.get('DOMAIN')}/`,
  algorithms: ['RS256']
}));

app.use('/', routes());

if (module.parent) {
  module.exports = app;
} else {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.info(`Example app listening on port ${port}!`);
  });
}
