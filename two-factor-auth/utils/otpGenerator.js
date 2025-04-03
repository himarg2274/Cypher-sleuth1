const { authenticator } = require("otplib");

const generateSecret = () => {
  return authenticator.generateSecret();
};

const generateOTP = (secret) => {
  return authenticator.generate(secret);
};

const verifyOTP = (token, secret) => {
  return authenticator.check(token, secret);
};

module.exports = { generateSecret, generateOTP, verifyOTP };
