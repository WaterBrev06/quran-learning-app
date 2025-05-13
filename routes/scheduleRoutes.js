const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const protect = require('../middleware/authMiddleware');

// 🔸 POST /api/schedule — Submit weekly schedule
router.post('/', protect(['mother', 'teacher']), async (req, res) => {
  try {
    const schedule = new Schedule({ ...req.body });
    await schedule.save();
    res.status(201).json({ message: 'Schedule saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 GET /api/schedule/:studentId — View student’s schedule
router.get('/:studentId', protect(['student', 'mother', 'admin']), async (req, res) => {
  try {
    const schedules = await Schedule.find({ student: req.params.studentId });
    res.json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
