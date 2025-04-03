const { authenticator } = require("otplib");
const express = require("express");
const router = express.Router();

/**
 * Generates a random secret key for TOTP
 * @returns {string} The generated secret
 */
const generateSecret = () => {
  return authenticator.generateSecret();
};

/**
 * Generates a one-time password based on the secret
 * @param {string} secret - The user's secret key
 * @returns {string} The generated OTP
 */
const generateOTP = (secret) => {
  return authenticator.generate(secret);
};

/**
 * Verifies if the provided OTP is valid for the given secret
 * @param {string} token - The OTP to verify
 * @param {string} secret - The user's secret key
 * @returns {boolean} True if the OTP is valid, false otherwise
 */
const verifyOTP = (token, secret) => {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    console.error("OTP verification error:", error);
    return false;
  }
};

// Example route to generate QR code
router.post("/generate-qrcode", (req, res) => {
    try {
      const secret = generateSecret();
      const qrCode = `otpauth://totp/CypherSleuth?secret=${secret}&issuer=CypherSleuth`;
      res.json({ qrCode, secret });
    } catch (error) {
      console.error("Error generating QR code:", error);
      res.status(500).json({ error: "Failed to generate QR code. Please try again." });
    }
  });

// Example route to verify OTP
router.post("/verify-otp", (req, res) => {
    const { otp, secret } = req.body;
  
    if (!otp || !secret) {
      return res.status(400).json({ valid: false, error: "OTP and secret are required" });
    }
  
    const isValid = verifyOTP(otp, secret); // Use the verifyOTP function
    res.json({ valid: isValid });
  });

// Export only the router
module.exports = router;