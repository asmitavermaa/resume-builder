import React from 'react';

const Education = ({ education, setEducation, addEducation }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].degree = e.target.value;
              setEducation(newEducation);
            }}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].institution = e.target.value;
              setEducation(newEducation);
            }}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].year = e.target.value;
              setEducation(newEducation);
            }}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
      <button onClick={addEducation} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
        Add Education
      </button>
    </div>
  );
};

export default Education;
