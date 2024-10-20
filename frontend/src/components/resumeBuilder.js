import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import ProfessionalSummary from './professionalSummary';
import CareerObjective from './careerObjective';
import Education from './education';
import Experience from './experience';
import Skills from './skills';
import Achievements from './achievements';
import { generatePDF } from '../utils/pdfGenerator';

const ResumeBuilder = ({
  summary, setSummary,
  careerObjective, setCareerObjective,
  education, setEducation, addEducation,
  experience, setExperience, addExperience,
  skills, setSkills, addSkill,
  achievements, setAchievements, addAchievement
}) => {

  // Function to handle saving the resume to the backend
  const handleSaveResume = async () => {
    const resumeData = {
      summary,
      careerObjective,
      education,
      experience,
      skills,
      achievements
    };

    try {
      const response = await axios.post('http://localhost:5000/api/resume/save', resumeData); // Adjust API URL if needed
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    }
  };

  // Function to generate PDF of the resume
  const handleGeneratePDF = () => {
    const resumeData = {
      summary,
      careerObjective,
      education,
      experience,
      skills,
      achievements
    };

    generatePDF(resumeData); // Pass the resumeData to the PDF generator
  };

  // Function to fetch resumes from the backend
  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resume'); // Adjust API URL if needed
      const resumes = response.data;
      if (resumes.length > 0) {
        const latestResume = resumes[resumes.length - 1]; // Get the most recent resume
        setSummary(latestResume.summary || '');
        setCareerObjective(latestResume.careerObjective || '');
        setEducation(latestResume.education || [{ degree: '', institution: '', year: '' }]);
        setExperience(latestResume.experience || [{ position: '', company: '', duration: '' }]);
        setSkills(latestResume.skills || ['']);
        setAchievements(latestResume.achievements || ['']);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  // UseEffect hook to fetch resumes on component mount
  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-gray-700 mb-2 text-center text-decoration-line: underline">Resume Builder</h1>
      <ProfessionalSummary summary={summary} setSummary={setSummary} />
      <CareerObjective careerObjective={careerObjective} setCareerObjective={setCareerObjective} />
      <Education education={education} setEducation={setEducation} addEducation={addEducation} />
      <Experience experience={experience} setExperience={setExperience} addExperience={addExperience} />
      <Skills skills={skills} setSkills={setSkills} addSkill={addSkill} />
      <Achievements achievements={achievements} setAchievements={setAchievements} addAchievement={addAchievement} />

      <div className="flex space-x-4 mt-4">
        <button onClick={handleGeneratePDF} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
          Generate PDF
        </button>
        <button onClick={handleSaveResume} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600">
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;
