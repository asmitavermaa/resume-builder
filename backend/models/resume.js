const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  summary: String,
  careerObjective: String,
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  experience: [
    {
      position: String,
      company: String,
      duration: String
    }
  ],
  skills: [String],
  achievements: [String]
});

module.exports = mongoose.model('Resume', resumeSchema);
