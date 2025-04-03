const express = require("express");
const cors = require("cors");
const twoFARoutes = require("./routes/twoFA");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/2fa", twoFARoutes);

app.listen(5001, () => console.log("2FA Server running on port 5001"));
