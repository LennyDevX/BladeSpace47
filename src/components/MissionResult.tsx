import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface MissionResultProps {
  result: string;
}

const MissionResult: React.FC<MissionResultProps> = ({ result }) => {
  return (
    <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
      <div className="flex items-center">
        <FaCheckCircle className="mr-2 text-2xl" />
        <p className="font-bold">{result}</p>
      </div>
    </div>
  );
};

export default MissionResult;