import crypto from 'crypto';

const generateState = () => crypto.randomBytes(16).toString('hex');

export default generateState;
