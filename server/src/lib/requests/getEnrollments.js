import _ from 'lodash';
import { getManagementClient } from '../utils/auth0';

const getEnrollments = (userId) => {
  const managementClient = getManagementClient();

  return managementClient.getUser({
    id: userId
  }).then((user) => {
    const passwordlessIdentities = _.filter(user.identities, (identity) => {
      const filter = (identity.provider === 'sms' || identity.provider === 'email') && typeof identity.profileData !== 'undefined';
      return filter;
    });

    const enrollments = _.map(passwordlessIdentities, (identity) => {
      const enrollment = {
        user_id: identity.user_id,
        provider: identity.provider
      };
      switch (identity.provider) {
        case 'sms':
          enrollment.verified = identity.profileData.phone_verified;
          enrollment.phone_number = identity.profileData.phone_number;
          break;
        case 'email':
          enrollment.verified = identity.profileData.email_verified;
          enrollment.email = identity.profileData.email;
          break;
        default:
          throw new Error('the profileData is missing'); // will never reach here, because of previous validation.
      }

      return enrollment;
    });

    return enrollments;
  });
};

export default getEnrollments;
