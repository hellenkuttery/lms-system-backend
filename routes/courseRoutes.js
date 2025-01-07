const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Tüm kursları getir
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni kurs ekle
router.post('/', async (req, res) => {
  const { title, description, teacher, videos } = req.body;

  const course = new Course({ title, description, teacher, videos });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
