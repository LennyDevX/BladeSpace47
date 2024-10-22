import React from 'react';
import { FaUser, FaStar, FaBolt, FaRocket, FaTrophy, FaMedal, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Starship } from './Starship';
import { shipImages } from '../shipData';

interface ProfileProps {
  playerLevel: number;
  experience: number;
  points: number;
  artifacts: number;
  missionsCompleted: number;
  ownedShips: Starship[];
}

const Profile: React.FC<ProfileProps> = ({ 
  playerLevel, 
  experience, 
  points, 
  artifacts, 
  missionsCompleted, 
  ownedShips 
}) => {
  const playerData = {
    name: "Space Explorer",
    description: "Intrépido aventurero del cosmos, buscando conocimiento y fortuna entre las estrellas.",
    achievements: [
      "Primer Vuelo",
      "Minero de Asteroides",
      "Pionero del Espacio Profundo"
    ],
    rewards: [
      "Insignia de Navegante de Nebulosas",
      "Medalla de Pacificador Galáctico",
      "Emblema de Viajero del Vacío"
    ]
  };

  const experienceToNextLevel = playerLevel * 1000;
  const experiencePercentage = ((experience / experienceToNextLevel) * 100).toFixed(2);

  const calculatePerformance = (ship: Starship) => {
    const totalIncome = ship.totalRewards || 0;
    const totalCost = ship.cost + (ship.maintenanceCost || 0) * (ship.missionsCompleted || 0);
    return totalIncome > 0 ? (totalIncome / totalCost) * 100 : 0;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Uncommon': return 'text-green-400';
      case 'Rare': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-white"
    >
      <h3 className="text-2xl font-bold mb-4 text-center">Perfil del Jugador</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-center mb-4">
            <FaUser className="text-6xl text-blue-500" />
          </div>
          <h4 className="text-xl font-bold text-center mb-2">{playerData.name}</h4>
          <p className="text-sm text-gray-400 text-center mb-4">{playerData.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-sm text-gray-400">Nivel</p>
              <p className="text-lg font-bold">{playerLevel}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-sm text-gray-400">Experiencia</p>
              <p className="text-lg font-bold">{experience} / {experienceToNextLevel}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-sm text-gray-400">Puntos</p>
              <p className="text-lg font-bold">{points}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-sm text-gray-400">Artefactos</p>
              <p className="text-lg font-bold">{artifacts}</p>
            </div>
          </div>
          <div className="bg-gray-700 p-2 rounded mb-4">
            <p className="text-sm text-gray-400">Misiones Completadas</p>
            <p className="text-lg font-bold">{missionsCompleted || 0}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Progreso de Nivel</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${experiencePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{experiencePercentage}% para el siguiente nivel</p>
          </div>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4 className="text-xl font-bold mb-4">Logros</h4>
          <ul className="space-y-2">
            {playerData.achievements.map((achievement, index) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaTrophy className="text-yellow-500 mr-2" />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
          <h4 className="text-xl font-bold mt-6 mb-4">Recompensas</h4>
          <ul className="space-y-2">
            {playerData.rewards.map((reward, index) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaMedal className="text-blue-500 mr-2" />
                <span>{reward}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.div 
        className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h4 className="text-xl font-bold mb-4">Naves en Propiedad</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownedShips.map((ship, index) => (
            <motion.div 
              key={ship.id} 
              className="bg-gray-700 p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-32 mb-2">
                <img src={ship.image} alt={ship.name} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-bl-lg">
                  <span className={`font-bold ${getRarityColor(ship.rarity)}`}>{ship.rarity}</span>
                </div>
              </div>
              <h5 className="font-bold text-lg mb-2">{ship.name}</h5>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div>
                  <span className="text-gray-400">Misiones:</span> {ship.missionsCompleted || 0}
                </div>
                <div>
                  <span className="text-gray-400">Recompensas:</span> {ship.totalRewards || 0}
                </div>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Rendimiento:</p>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${calculatePerformance(ship)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right mt-1">{calculatePerformance(ship).toFixed(2)}%</p>
              </div>
              <div className="flex justify-between items-center">
                <FaChartLine className={`${calculatePerformance(ship) > 100 ? 'text-green-500' : 'text-red-500'}`} />
                <FaLightbulb className={`${ship.usageCount < 5 ? 'text-yellow-500' : 'text-gray-500'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;