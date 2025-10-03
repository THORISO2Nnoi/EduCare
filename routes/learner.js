const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Reminder = require("../models/Reminder");

// 📥 Get learner dashboard
router.get("/:childId", async (req, res) => {
  try {
    const { childId } = req.params;
    const tasks = await Task.find({ child: childId }).sort({ createdAt: -1 });
    const reminders = await Reminder.find({ child: childId }).sort({ createdAt: -1 });
    res.json({ success: true, tasks, reminders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Toggle task done/undone
router.put("/toggle-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    task.done = !task.done;
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ➕ Learner adds own task (still max 5/day)
router.post("/add-task", async (req, res) => {
  try {
    const { childId, title, time } = req.body;

    const today = new Date();
    today.setHours(0,0,0,0);
    const taskCount = await Task.countDocuments({
      child: childId,
      createdAt: { $gte: today }
    });

    if (taskCount >= 5) {
      return res.status(400).json({ success: false, message: "Max 5 tasks per day" });
    }

    const task = new Task({ title, time, child: childId });
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔔 Mark reminders as read
router.put("/read-reminders/:childId", async (req, res) => {
  try {
    const { childId } = req.params;
    await Reminder.updateMany({ child: childId, read: false }, { $set: { read: true } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
