const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("./models/User");
const axios = require("axios");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const PORT = process.env.PORT || 5002;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ **Register Route**
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body; // ✅ Include username
    console.log("Received Data:", username, email, password);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    console.log("User registered successfully");

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// ✅ **Login Route**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
const breachSchema = new mongoose.Schema({
  name: String,
  email: String,
  breachType: String,
  description: String,
  reportedAt: { type: Date, default: Date.now },
});

// Create model
const BreachReport = mongoose.model("BreachReport", breachSchema);

// Route to store breach report
app.post("/report-breach", async (req, res) => {
  try {
    const { name, email, breachType, description } = req.body;

    if (!name || !email || !breachType || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReport = new BreachReport({ name, email, breachType, description });
    await newReport.save();

    res.json({ message: "Report submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving report" });
  }
});

// ✅ **Test Route**
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ **Start the Server**
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
