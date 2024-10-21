import React, { useState, useEffect } from 'react';
import { FaRocket, FaClock } from 'react-icons/fa';

interface QuickMission {
  id: string;
  name: string;
  duration: number;
  reward: number;
}

interface QuickMissionsProps {
  availableMissions: QuickMission[];
  startMission: (missionId: string) => void;
  completeMission: (missionId: string) => void;
  activeMissions: { [key: string]: number };
}

const QuickMissions: React.FC<QuickMissionsProps> = ({
  availableMissions,
  startMission,
  completeMission,
  activeMissions
}) => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const updatedTimeLeft: { [key: string]: number } = {};

      Object.entries(activeMissions).forEach(([missionId, endTime]) => {
        const remaining = Math.max(0, endTime - now);
        updatedTimeLeft[missionId] = remaining;

        if (remaining === 0) {
          completeMission(missionId);
        }
      });

      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeMissions, completeMission]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-bold mb-4">Misiones Rápidas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableMissions.map(mission => (
          <div key={mission.id} className="bg-gray-700 p-3 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">{mission.name}</h4>
            <p>Duración: {mission.duration} minutos</p>
            <p>Recompensa: {mission.reward} tokens</p>
            {activeMissions[mission.id] ? (
              <p className="text-yellow-400">
                <FaClock className="inline-block mr-1" />
                Tiempo restante: {formatTime(timeLeft[mission.id] || 0)}
              </p>
            ) : (
              <button
                onClick={() => startMission(mission.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >
                Iniciar Misión <FaRocket className="inline-block ml-1" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickMissions;