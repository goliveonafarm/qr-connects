import crypto from 'crypto';

const generateUID = () => {
  return crypto.randomBytes(16).toString('hex');
};

export default generateUID;