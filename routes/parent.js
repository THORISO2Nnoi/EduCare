const express = require("express");
const router = express.Router();
const Parent = require("../models/Parent");
const Child = require("../models/Child");
const Task = require("../models/Task");
const Reminder = require("../models/Reminder");

// POST /api/parent/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const parent = await Parent.create({ name, email, password: hashed });
    res.status(201).json({ message: "Parent registered", parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/parent/login
router.post("/login", async (req, res) => {
  // login logic
});
// ➕ Add child
router.post("/add-child", async (req, res) => {
  try {
    const { parentId, name } = req.body;
    const child = new Child({ name, parent: parentId });
    await child.save();
    await Parent.findByIdAndUpdate(parentId, { $push: { children: child._id } });
    res.json({ success: true, child });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ➕ Add task for child
router.post("/add-task", async (req, res) => {
  try {
    const { childId, title, time } = req.body;

    // Restrict max 5 tasks per child/day
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

// ➕ Add reminder
router.post("/add-reminder", async (req, res) => {
  try {
    const { childId, text } = req.body;
    const reminder = new Reminder({ text, child: childId });
    await reminder.save();
    res.json({ success: true, reminder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📊 Get child progress
router.get("/progress/:childId", async (req, res) => {
  try {
    const { childId } = req.params;
    const tasks = await Task.find({ child: childId });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
