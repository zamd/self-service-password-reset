import { get, set } from '../../../src/lib/utils/config';

jest.mock('nconf', () => ({
  get: jest.fn((key) => {
    switch (key) {
      case 'NON_INTERACTIVE_CLIENT_ID':
        return 'client_id_value';
      default:
        return 'not_found';
    }
  }),
  set: jest.fn((key, value) => value)
}));

describe('config', () => {
  test('should get value', () => {
    const configValue = get('NON_INTERACTIVE_CLIENT_ID');
    expect(configValue).toBe('client_id_value');
  });

  test('should set value', () => {
    const configValue = set('NON_INTERACTIVE_CLIENT_ID', 'VALUE');
    expect(configValue).toBe('VALUE');
  });
});
