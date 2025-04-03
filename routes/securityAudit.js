const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Security Audit API - Check if an email is compromised
router.post("/security-audit", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Using HaveIBeenPwned API to check breaches
    const response = await axios.get(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
      { headers: { "hibp-api-key": process.env.HIBP_API_KEY } }
    );

    if (response.data.length > 0) {
      res.json({ breached: true, breaches: response.data });
    } else {
      res.json({ breached: false, message: "No breaches found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking security audit" });
  }
});

module.exports = router;
