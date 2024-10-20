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
  // State to store all fetched resumes
  const [allResumes, setAllResumes] = useState([]);

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

  // Function to fetch all resumes from the backend
  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resume'); // Adjust API URL if needed
      const resumes = response.data;
      setAllResumes(resumes); // Store all fetched resumes
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  // Function to load a specific resume into the form fields
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

      {/* Centered Buttons */}
      <div className="flex flex-col items-center space-y-4 mt-6">
        {/* Generate PDF Button - Pink */}
        <button onClick={handleGeneratePDF} className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow hover:bg-pink-600">
          Generate PDF
        </button>
        {/* Save Resume Button */}
        <button onClick={handleSaveResume} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600">
          Save Resume
        </button>
        {/* Fetch All Resumes Button */}
        <button onClick={fetchResumes} className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600">
          Fetch All Resumes
        </button>
      </div>

      {/* Display list of all fetched resumes */}
      {allResumes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Saved Resumes</h2>
          <ul>
            {allResumes.map((resume, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg bg-gray-200">
                <p className="text-black"><strong>Summary:</strong> {resume.summary || 'No Summary'}</p>
                <p className="text-black"><strong>Career Objective:</strong> {resume.careerObjective || 'No Career Objective'}</p>
                {/* Other fields can be shown similarly */}
                <button
                  onClick={() => loadResume(resume)} // Load this resume into the form
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
