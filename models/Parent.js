const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }]
});

module.exports = mongoose.model("Parent", ParentSchema);
