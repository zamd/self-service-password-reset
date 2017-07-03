import jwt from 'jsonwebtoken';
import { get as config } from '../utils/config';

export default (req, body) => {
  const validationOptions = {
    issuer: `https://${config('DOMAIN')}/`,
    audience: config('NON_INTERACTIVE_CLIENT_ID')
  };
  const clientSecret = config('NON_INTERACTIVE_CLIENT_SECRET');
  const decodedIdToken = jwt.verify(body.id_token, clientSecret, validationOptions);

  const accessToken = req.headers.authorization.split(' ')[1];
  const decodedAccessToken = jwt.decode(accessToken);
  return {
    primary_user_id: decodedAccessToken.sub,
    secondary_user_id: decodedIdToken.sub
  };
};
