import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const [allResumes, setAllResumes] = useState([]);

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
      const response = await axios.post('http://localhost:5000/api/resume/save', resumeData);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    }
  };

  const handleGeneratePDF = () => {
    const resumeData = {
      summary,
      careerObjective,
      education,
      experience,
      skills,
      achievements
    };

    generatePDF(resumeData);
  };

  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resume');
      const resumes = response.data;
      setAllResumes(resumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const loadResume = (resume) => {
    setSummary(resume.summary || '');
    setCareerObjective(resume.careerObjective || '');
    setEducation(resume.education || [{ degree: '', institution: '', year: '' }]);
    setExperience(resume.experience || [{ position: '', company: '', duration: '' }]);
    setSkills(resume.skills || ['']);
    setAchievements(resume.achievements || ['']);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-semibold text-gray-700 mb-2 text-center text-decoration-line: underline">Resume Builder</h1>
      <ProfessionalSummary summary={summary} setSummary={setSummary} />
      <CareerObjective careerObjective={careerObjective} setCareerObjective={setCareerObjective} />
      <Education education={education} setEducation={setEducation} addEducation={addEducation} />
      <Experience experience={experience} setExperience={setExperience} addExperience={addExperience} />
      <Skills skills={skills} setSkills={setSkills} addSkill={addSkill} />
      <Achievements achievements={achievements} setAchievements={setAchievements} addAchievement={addAchievement} />

      <div className="flex flex-col items-center space-y-4 mt-6">
        <button onClick={handleGeneratePDF} className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow hover:bg-pink-600">
          Generate PDF
        </button>
        <button onClick={handleSaveResume} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600">
          Save Resume
        </button>
        <button onClick={fetchResumes} className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600">
          Fetch All Resumes
        </button>
      </div>

      {allResumes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Saved Resumes</h2>
          <ul>
            {allResumes.map((resume, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg bg-gray-200">
                <p className="text-black"><strong>Summary:</strong> {resume.summary || 'No Summary'}</p>
                <p className="text-black"><strong>Career Objective:</strong> {resume.careerObjective || 'No Career Objective'}</p>
                <button
                  onClick={() => loadResume(resume)}
                  className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg shadow hover:bg-blue-600"
                >
                  Load Resume
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
