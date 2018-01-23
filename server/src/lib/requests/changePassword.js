import createRequest from './createRequestHelper';
import { get as config } from '../utils/config';
import { getManagementClient } from '../utils/auth0';

const validateOldPassword = (username, oldPassword, connection) => {
  const payload = {
    client_id: `${config('NON_INTERACTIVE_CLIENT_ID')}`,
    client_secret: `${config('NON_INTERACTIVE_CLIENT_SECRET')}`,
    username,
    password: oldPassword,
    grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
    realm: connection
  };

  const request = createRequest(`https://${config('DOMAIN')}/oauth/token`, payload);
  return request;
};

const changePassword = (userId, username, oldPassword, newPassword, connection) =>
  validateOldPassword(username, oldPassword, connection)
    .then(() => {
      const managementClient = getManagementClient();

      const params = {
        id: userId
      };
      const data = {
        password: newPassword
      };
      return managementClient.updateUser(params, data);
    });

export default changePassword;
