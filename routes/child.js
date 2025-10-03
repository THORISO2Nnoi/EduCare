const express = require('express');
const router = express.Router();
const Child = require('../models/Child');

// Add Task
router.post('/task', async (req,res)=>{
    const { childId, title } = req.body;
    const child = await Child.findById(childId);
    child.tasks.push({ title });
    await child.save();
    res.json(child.tasks);
});

// Toggle Task
router.patch('/task/:childId/:taskId', async (req,res)=>{
    const child = await Child.findById(req.params.childId);
    const task = child.tasks.id(req.params.taskId);
    task.done = !task.done;
    task.doneAt = task.done ? new Date() : null;
    await child.save();
    res.json(task);
});

// Add Reminder
router.post('/reminder', async (req,res)=>{
    const { childId, text } = req.body;
    const child = await Child.findById(childId);
    child.reminders.push({ text });
    await child.save();
    res.json(child.reminders);
});

// Mark Reminder Read
router.patch('/reminder/:childId/:reminderId', async (req,res)=>{
    const child = await Child.findById(req.params.childId);
    const reminder = child.reminders.id(req.params.reminderId);
    reminder.read = true;
    await child.save();
    res.json(reminder);
});

module.exports = router;
