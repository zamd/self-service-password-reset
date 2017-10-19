import { getManagementClient } from '../utils/auth0';

export default (userId, passwordLessUserId, provider) => {
  const data = {
    provider,
    user_id: passwordLessUserId
  };
  const managementClient = getManagementClient();
  return managementClient.linkUsers(userId, data);
};
