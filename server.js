const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

mongoose.set("strictQuery", true);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: "Educare_Learners" })
  .then(() => console.log("✅ MongoDB connected to Educare_Learners"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/parent", require("./routes/parent"));
app.use("/api/learner", require("./routes/learner"));

// Default route
app.get("/", (req, res) => res.send("Educare API is running 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
