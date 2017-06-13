import crypto from "crypto";

const generateState = () => {
  return crypto.randomBytes(16).toString('hex');
};

export default generateState;