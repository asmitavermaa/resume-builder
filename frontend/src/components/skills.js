import React from 'react';

const Skills = ({ skills, setSkills, addSkill }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Skills</h2>
      {skills.map((skill, index) => (
        <input
          key={index}
          type="text"
          placeholder="Skill"
          value={skill}
          onChange={(e) => {
            const newSkills = [...skills];
            newSkills[index] = e.target.value;
            setSkills(newSkills);
          }}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}
      <button onClick={addSkill} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
        Add Skill
      </button>
    </div>
  );
};

export default Skills;
