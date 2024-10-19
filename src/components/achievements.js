import React from 'react';

const Achievements = ({ achievements, setAchievements, addAchievement }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Achievements</h2>
      {achievements.map((achievement, index) => (
        <input
          key={index}
          type="text"
          placeholder="Achievement"
          value={achievement}
          onChange={(e) => {
            const newAchievements = [...achievements];
            newAchievements[index] = e.target.value;
            setAchievements(newAchievements);
          }}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}
      <button onClick={addAchievement} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
        Add Achievement
      </button>
    </div>
  );
};

export default Achievements;
