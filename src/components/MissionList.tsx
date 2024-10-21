import React from 'react';
import { FaRocket, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface MissionListProps {
  availableMissions: any[];
  startMission: (mission: any) => void;
  playerLevel: number;
}

const MissionList: React.FC<MissionListProps> = ({ availableMissions, startMission, playerLevel }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      {availableMissions.map((mission, index) => (
        <motion.div
          key={mission.id}
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h4 className="text-lg font-bold mb-2">{mission.name}</h4>
          <p className="text-sm text-gray-400 mb-2">{mission.description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Duración: {mission.duration}s</span>
            <span className="text-sm">Nivel requerido: {mission.requiredLevel}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Recompensa: {mission.pointReward} puntos</span>
            <span className="text-sm">XP: {mission.experienceReward}</span>
          </div>
          <motion.button
            onClick={() => startMission(mission)}
            disabled={playerLevel < mission.requiredLevel}
            className={`w-full ${
              playerLevel >= mission.requiredLevel
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-500 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded transition-colors`}
            whileHover={playerLevel >= mission.requiredLevel ? { scale: 1.05 } : {}}
            whileTap={playerLevel >= mission.requiredLevel ? { scale: 0.95 } : {}}
          >
            {playerLevel >= mission.requiredLevel ? (
              <>
                <FaRocket className="inline-block mr-2" /> Iniciar Misión
              </>
            ) : (
              <>
                <FaExclamationTriangle className="inline-block mr-2" /> Nivel insuficiente
              </>
            )}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default MissionList;