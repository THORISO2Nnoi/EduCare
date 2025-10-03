const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  name: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" }
});

module.exports = mongoose.model("Child", ChildSchema);
