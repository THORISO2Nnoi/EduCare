const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  time: String,
  done: { type: Boolean, default: false },
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  createdAt: { type: Date, default: Date.now }
});

TaskSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); 
// ⏳ auto-delete after 24h

module.exports = mongoose.model("Task", TaskSchema);
