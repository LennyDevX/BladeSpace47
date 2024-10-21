import React from 'react';
import { FaRocket } from 'react-icons/fa';

interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <FaRocket className="text-blue-500 text-6xl animate-bounce mb-4" />
      <div className="w-64 bg-gray-700 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white text-xl font-bold">Loading Space.NFT...</p>
    </div>
  );
};

export default LoadingScreen;