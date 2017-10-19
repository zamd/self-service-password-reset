import { getManagementClient } from '../utils/auth0';

const resetPassword = (userId, password) => {
  const params = {
    id: userId
  };
  const data = {
    password
  };
  const managementClient = getManagementClient();
  return managementClient.updateUser(params, data);
};

export default resetPassword;
