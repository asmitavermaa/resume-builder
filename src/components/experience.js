import React from 'react';

const Experience = ({ experience, setExperience, addExperience }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Experience and Internships</h2>
      {experience.map((exp, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].position = e.target.value;
              setExperience(newExperience);
            }}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].company = e.target.value;
              setExperience(newExperience);
            }}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].duration = e.target.value;
              setExperience(newExperience);
            }}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
      <button onClick={addExperience} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
        Add Experience
      </button>
    </div>
  );
};

export default Experience;
