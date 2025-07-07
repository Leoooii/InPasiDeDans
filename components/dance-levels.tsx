import React from 'react';

const DanceLevels = () => {
  const classLevels = [
    {
      level: 'Începători',
      duration: 'Maxim 3 luni de dans',
      icon: 'fas fa-shoe-prints',
    }, // Basic steps for beginners
    {
      level: 'Intermediari 1',
      duration: 'Între 4 luni și 1 an de dans',
      icon: 'fas fa-walking',
    }, // Walking for slight progress
    {
      level: 'Intermediari 2',
      duration: 'Între 1 an și 2 ani de dans',
      icon: 'fas fa-running',
    }, // Running for more confidence
    {
      level: 'Intermediari 3',
      duration: 'Între 2 ani și 3 ani de dans',
      icon: 'fas fa-dancing',
    }, // Dancing figure for skill
    { level: 'Avansați', duration: 'Minim 3 ani de dans', icon: 'fas fa-star' }, // Star for mastery
  ];

  return (
    <div className=" bg-gradient-to-b from-red-500 to-orange-500 flex flex-col items-center py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl">
        {classLevels.map((danceClass, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-orange-500"
          >
            <i
              className={`${danceClass.icon} text-orange-500 text-3xl mb-4`}
            ></i>
            <h2 className="text-2xl font-semibold text-gray-800">
              {danceClass.level}
            </h2>
            <p className="text-gray-600 mt-2">{danceClass.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanceLevels;
