const mongoose = require("mongoose");

const BreachSchema = new mongoose.Schema({
  name: String,
  email: String,
  breachType: String,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Breach", BreachSchema);
