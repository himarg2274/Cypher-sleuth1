const { generateSecret, verifyOTP } = require("../utils/otpGenerator");
const qrcode = require("qrcode");

// In production, use a database to store user secrets
// This is just for demonstration purposes
let userSecrets = {}; 

exports.generateQRCode = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Generate a unique secret for the user
    const secret = generateSecret();
    
    // Store the secret (in production, use a database)
    userSecrets[userId] = secret;

    // Create the otpauth URL for the QR code - this format is recognized by authenticator apps
    const otpauth = `otpauth://totp/CypherSleuth:${userId}?secret=${secret}&issuer=CypherSleuth&algorithm=SHA1&digits=6&period=30`;
    
    // Generate the QR code as a data URL
    qrcode.toDataURL(otpauth, (err, dataUrl) => {
      if (err) {
        console.error('QR code generation error:', err);
        return res.status(500).json({ error: "QR Code generation failed" });
      }
      
      // Return the QR code and secret to the frontend
      res.json({ 
        qrCode: dataUrl,
        secret,
        message: "QR code generated successfully" 
      });
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verifyOTP = (req, res) => {
  try {
    const { userId, otp } = req.body;
    
    if (!userId || !otp) {
      return res.status(400).json({ error: "User ID and OTP are required" });
    }

    const secret = userSecrets[userId];

    if (!secret) {
      return res.status(400).json({ error: "No secret found for user" });
    }

    // Verify the OTP against the user's secret
    const isValid = verifyOTP(otp, secret);
    
    res.json({ 
      valid: isValid,
      message: isValid ? "OTP verified successfully" : "Invalid OTP" 
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: "Verification failed" });
  }
};