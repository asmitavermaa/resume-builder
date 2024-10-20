import React from 'react';

const ProfessionalSummary = ({ summary, setSummary }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Professional Summary</h2>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write your professional summary here..."
        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default ProfessionalSummary;
