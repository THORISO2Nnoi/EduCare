const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection 
mongoose.connect(
  "mongodb+srv://THORISO:BK8Jf46NaaJiwnZq@cluster0.src4n6y.mongodb.net/Educare_Learners?retryWrites=true&w=majority",
  {
    dbName: "Educare_Learners",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ MongoDB connected to Educare_Learners"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// Routes
const parentRoutes = require("./routes/parent");
const learnerRoutes = require("./routes/learner");

app.use("/api/parent", parentRoutes);
app.use("/api/learner", learnerRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Educare API is running 🚀");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
