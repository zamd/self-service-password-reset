import { getManagementClient } from '../utils/auth0';

const deleteUser = (userId, provider) => {
  const managementClient = getManagementClient();
  const params = {
    id: `${provider}|${userId}` // TODO review if this is future proof.
  };
  return managementClient.deleteUser(params);
};

const unlinkUser = (primaryUserId, linkedUserId, provider) => {
  const managementClient = getManagementClient();
  const params = {
    id: primaryUserId,
    user_id: linkedUserId,
    provider
  };
  return managementClient.unlinkUsers(params);
};

export default (primaryUserId, linkedUserId, provider) =>
  unlinkUser(primaryUserId, linkedUserId, provider)
    .then(() => deleteUser(linkedUserId, provider));
