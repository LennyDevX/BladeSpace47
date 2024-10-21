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
          className="bg-gray-800 p-6 rounded-lg"
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
          className="bg-gray-800 p-6 rounded-lg"
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
        className="mt-6 bg-gray-800 p-6 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h4 className="text-xl font-bold mb-4">Naves en Propiedad</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {ownedShips.map((ship, index) => (
            <motion.div 
              key={ship.id} 
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={ship.image} alt={ship.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h5 className="font-bold">{ship.name}</h5>
              <p className="text-sm mb-2">Rareza: {ship.rarity}</p>
              <p className="text-sm">Misiones completadas: {ship.missionsCompleted || 0}</p>
              <p className="text-sm">Recompensas totales: {ship.totalRewards || 0} puntos</p>
              <div className="mt-2 bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${ship.performance || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1">Rendimiento: {ship.performance || 0}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;