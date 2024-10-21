import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface MissionProgressProps {
  mission: any;
  progress: number;
}

const MissionProgress: React.FC<MissionProgressProps> = ({ mission, progress }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-bold mb-2">Mission in Progress: {mission.name}</h4>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-out"
          ></div>
        </div>
      </div>
      <div className="flex justify-center">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
      </div>
    </div>
  );
};

export default MissionProgress;