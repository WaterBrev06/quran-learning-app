const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.get('/student', protect(['student']), (req, res) => {
  res.json({ message: 'Student dashboard' });
});

router.get('/mother', protect(['mother']), (req, res) => {
  res.json({ message: 'Mother dashboard' });
});

router.get('/teacher', protect(['teacher']), (req, res) => {
  res.json({ message: 'Teacher dashboard' });
});

router.get('/admin', protect(['admin']), (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

module.exports = router;
