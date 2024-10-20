import React, { useState } from 'react';
import ResumeBuilder from './components/resumeBuilder';
import { generatePDF } from './utils/pdfGenerator';
import './App.css';

const App = () => {
  const [summary, setSummary] = useState('');
  const [careerObjective, setCareerObjective] = useState('');
  const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
  const [experience, setExperience] = useState([{ position: '', company: '', duration: '' }]);
  const [skills, setSkills] = useState(['']);
  const [achievements, setAchievements] = useState(['']);

  const addEducation = () => {
    setEducation([...education, { degree: '', institution: '', year: '' }]);
  };

  const addExperience = () => {
    setExperience([...experience, { position: '', company: '', duration: '' }]);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const addAchievement = () => {
    setAchievements([...achievements, '']);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 text-white">
      <div className="w-full max-w-2xl">
        <ResumeBuilder 
          summary={summary} setSummary={setSummary} 
          careerObjective={careerObjective} setCareerObjective={setCareerObjective} 
          education={education} setEducation={setEducation} addEducation={addEducation} 
          experience={experience} setExperience={setExperience} addExperience={addExperience} 
          skills={skills} setSkills={setSkills} addSkill={addSkill} 
          achievements={achievements} setAchievements={setAchievements} addAchievement={addAchievement} 
        />
      </div>
    </div>
  );
};

export default App;
