/* eslint global-require: 0 */

import {
  getHS256Token
} from '../../mocks/tokens';
import extractUserIdsHelper from '../../../src/lib/requests/extractUserIdsHelper';

jest.mock('../../../src/lib/utils/config');

describe('ExtractUserIdsHelper', () => {
  beforeEach(() => {
    require('../../../src/lib/utils/config').setMockConfig('test.com', 'client_id', 'client_secret');
  });

  test('should handle network errors correctly', () => {
    const authorizationToken = getHS256Token('client_secret', 'test.com', 'read:enrolment', 'user_1');
    const req = {
      headers: {
        authorization: `Bearer ${authorizationToken}`
      }
    };

    const sub = 'user_2';
    const aud = 'client_id';
    const idToken = getHS256Token('client_secret', 'test.com', 'read:enrolment', sub, aud);

    const body = {
      id_token: idToken
    };
    const userIds = extractUserIdsHelper(req, body);
    expect(userIds).toBeDefined();
    expect(userIds.primary_user_id).toBe('user_1');
    expect(userIds.secondary_user_id).toBe('user_2');
  });
});
