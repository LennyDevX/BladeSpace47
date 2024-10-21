import React from 'react';
import { FaRocket, FaStar, FaBolt, FaUser, FaChartLine, FaWrench, FaExclamationTriangle } from 'react-icons/fa';
import { Starship } from './GameMode';

interface HomeProps {
  userData: {
    points: number;
    artifacts: number;
    playerLevel: number;
    experience: number;
    ownedShips: Starship[];
    missionsCompleted: number;
  };
}

const Home: React.FC<HomeProps> = ({ userData }) => {
  const { points, artifacts, playerLevel, experience, ownedShips, missionsCompleted } = userData;
  const nextLevelExp = playerLevel * 1000;
  const progressPercentage = ((experience / nextLevelExp) * 100).toFixed(2);

  return (
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-4 text-center">Centro de Comando</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> Estadísticas del Jugador
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Nivel</p>
              <p className="text-2xl font-bold">{playerLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Experiencia</p>
              <p className="text-2xl font-bold">{experience} / {nextLevelExp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Puntos</p>
              <p className="text-2xl font-bold">{points}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Artefactos</p>
              <p className="text-2xl font-bold">{artifacts}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">Progreso de Nivel</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{progressPercentage}% para el siguiente nivel</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <FaRocket className="mr-2 text-blue-500" /> Resumen de la Flota
          </h4>
          <p className="mb-2">Naves en propiedad: {ownedShips.length}</p>
          <p className="mb-4">Misiones completadas: {missionsCompleted}</p>
          <h5 className="font-bold mb-2">Naves Destacadas:</h5>
          <ul className="space-y-2">
            {ownedShips.slice(0, 3).map((ship, index) => (
              <li key={index} className="flex items-center">
                <FaRocket className="mr-2 text-blue-500" />
                <span>{ship.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h4 className="text-lg font-bold mb-4 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Actividad Reciente
        </h4>
        <p>Implementa aquí un registro de actividades recientes del jugador.</p>
      </div>
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h4 className="text-lg font-bold mb-4 flex items-center">
          <FaBolt className="mr-2 text-yellow-500" /> Sugerencias
        </h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <FaWrench className="mr-2 mt-1 text-blue-500" />
            <span>Mejora tus naves para aumentar tus posibilidades en misiones más difíciles.</span>
          </li>
          <li className="flex items-start">
            <FaStar className="mr-2 mt-1 text-yellow-500" />
            <span>Completa misiones diarias para ganar recompensas adicionales.</span>
          </li>
          <li className="flex items-start">
            <FaExclamationTriangle className="mr-2 mt-1 text-red-500" />
            <span>¡No olvides realizar el mantenimiento de tus naves regularmente!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;