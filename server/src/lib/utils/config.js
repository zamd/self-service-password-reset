import nconf from 'nconf';

export function get(key) {
  return nconf.get(key);
}

export function set(key, value) {
  return nconf.set(key, value);
}
