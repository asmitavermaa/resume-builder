import React from 'react';
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

  // Create resumeData object
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

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-gray-700 mb-2 text-center text-decoration-line: underline">Resume Builder</h1>
      <ProfessionalSummary summary={summary} setSummary={setSummary} />
      <CareerObjective careerObjective={careerObjective} setCareerObjective={setCareerObjective} />
      <Education education={education} setEducation={setEducation} addEducation={addEducation} />
      <Experience experience={experience} setExperience={setExperience} addExperience={addExperience} />
      <Skills skills={skills} setSkills={setSkills} addSkill={addSkill} />
      <Achievements achievements={achievements} setAchievements={setAchievements} addAchievement={addAchievement} />
      <button onClick={handleGeneratePDF} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 mt-4">
        Generate PDF
      </button>
    </div>
  );
};

export default ResumeBuilder;
