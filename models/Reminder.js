const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  text: String,
  read: { type: Boolean, default: false },
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reminder", ReminderSchema);
