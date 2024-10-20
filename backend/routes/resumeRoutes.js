const express = require('express');
const Resume = require('../models/resume');
const router = express.Router();

// POST request to save resume data
router.post('/save', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save resume data' });
  }
});

// GET request to fetch all resume data
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

module.exports = router;
