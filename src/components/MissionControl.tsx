import React, { useState, useCallback, useEffect } from 'react';
import { FaRocket, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import MissionList from './MissionList';
import MissionProgress from './MissionProgress';
import MissionResult from './MissionResult';
import { motion, AnimatePresence } from 'framer-motion';
import { Starship } from './Starship';
import { shipImages } from '../shipData';

interface MissionControlProps {
  ownedShips: Starship[];
  selectedShip: Starship | null;
  setSelectedShip: (ship: Starship | null) => void;
  points: number;
  setPoints: (points: number) => void;
  artifacts: number;
  setArtifacts: (artifacts: number) => void;
  experience: number;
  setExperience: (experience: number) => void;
  playerLevel: number;
  setPlayerLevel: (level: number) => void;
  updateUserData: (data: any) => void;
  userId: string;
}

const MissionControl: React.FC<MissionControlProps> = ({
  ownedShips,
  selectedShip,
  setSelectedShip,
  points,
  setPoints,
  artifacts,
  setArtifacts,
  experience,
  setExperience,
  playerLevel,
  setPlayerLevel,
  updateUserData,
  userId
}) => {
  const [availableMissions, setAvailableMissions] = useState<any[]>([]);
  const [currentMission, setCurrentMission] = useState<any | null>(null);
  const [missionProgress, setMissionProgress] = useState(0);
  const [missionResult, setMissionResult] = useState<string | null>(null);

  useEffect(() => {
    setAvailableMissions([
      { id: 1, name: 'Exploración Lunar', duration: 10, pointReward: 100, artifactChance: 0.2, experienceReward: 50, requiredLevel: 1 },
      { id: 2, name: 'Minería de Asteroides', duration: 20, pointReward: 200, artifactChance: 0.3, experienceReward: 100, requiredLevel: 2 },
      { id: 3, name: 'Rescate Espacial', duration: 30, pointReward: 300, artifactChance: 0.4, experienceReward: 150, requiredLevel: 3 },
    ]);
  }, []);

  const startMission = useCallback((mission: any) => {
    if (!selectedShip) {
      alert('Por favor, selecciona una nave antes de iniciar una misión.');
      return;
    }
    setCurrentMission(mission);
    setMissionProgress(0);
    setMissionResult(null);

    const interval = setInterval(() => {
      setMissionProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          completeMission(mission);
          return 100;
        }
        return prevProgress + 100 / mission.duration;
      });
    }, 1000);
  }, [selectedShip]);

  const completeMission = useCallback(async (mission: any) => {
    const earnedPoints = mission.pointReward;
    const earnedArtifact = Math.random() < mission.artifactChance ? 1 : 0;
    const earnedExperience = mission.experienceReward;

    const newPoints = points + earnedPoints;
    const newArtifacts = artifacts + earnedArtifact;
    let newExperience = experience + earnedExperience;
    let newPlayerLevel = playerLevel;

    const experienceToNextLevel = playerLevel * 1000;
    if (newExperience >= experienceToNextLevel) {
      newPlayerLevel++;
      newExperience -= experienceToNextLevel;
    }

    setMissionResult(`¡Misión completada! Ganaste ${earnedPoints} puntos, ${earnedExperience} XP y ${earnedArtifact} artefacto(s).`);

    const updatedShips = ownedShips.map(ship => 
      ship.id === selectedShip?.id ? { 
        ...ship, 
        usageCount: (ship.usageCount || 0) + 1,
        missionsCompleted: (ship.missionsCompleted || 0) + 1,
        totalRewards: (ship.totalRewards || 0) + earnedPoints
      } : ship
    );

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const currentUserData = userDoc.data() || {};

      const updatedUserData = {
        ...currentUserData,
        points: newPoints,
        artifacts: newArtifacts,
        experience: newExperience,
        playerLevel: newPlayerLevel,
        ownedShips: updatedShips,
        missionsCompleted: (currentUserData.missionsCompleted || 0) + 1
      };

      await updateDoc(userDocRef, updatedUserData);
      
      setPoints(newPoints);
      setArtifacts(newArtifacts);
      setExperience(newExperience);
      setPlayerLevel(newPlayerLevel);

      updateUserData(updatedUserData);

      const missionData = {
        userId,
        missionId: mission.id,
        completedAt: new Date(),
        earnedPoints,
        earnedArtifacts: earnedArtifact,
        earnedExperience
      };

      await addDoc(collection(db, 'missions'), missionData);

      console.log('Misión completada y datos actualizados con éxito', updatedUserData);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      setMissionResult('Error al completar la misión. Por favor, inténtalo de nuevo.');
    }

    setCurrentMission(null);
  }, [points, artifacts, experience, playerLevel, ownedShips, selectedShip, updateUserData, userId, setPoints, setArtifacts, setExperience, setPlayerLevel]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-white"
    >
      <h3 className="text-2xl font-bold mb-4">Control de Misiones</h3>
      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2">Seleccionar Nave</h4>
        {ownedShips.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ownedShips.map((ship) => (
              <motion.button
                key={ship.id}
                onClick={() => setSelectedShip(ship)}
                className={`p-2 rounded-lg ${
                  selectedShip && selectedShip.id === ship.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                } ${ship.usageCount >= 5 ? 'opacity-50 cursor-not-allowed' : ''} overflow-hidden`}
                whileHover={{ scale: ship.usageCount < 5 ? 1.05 : 1 }}
                whileTap={{ scale: ship.usageCount < 5 ? 0.95 : 1 }}
                disabled={ship.usageCount >= 5}
              >
                <div className="relative h-24 mb-2">
                  <img src={ship.image} alt={ship.name} className="w-full h-full object-cover rounded-t-lg" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2">
                    Usos: {ship.usageCount}/5
                  </div>
                </div>
                <div className="text-sm font-semibold">{ship.name}</div>
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-red-500">No tienes naves disponibles. Adquiere una en la sección de Starship.</p>
        )}
      </div>
      {selectedShip && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h5 className="font-bold mb-2">Nave seleccionada: {selectedShip.name}</h5>
          <p>Usos: {selectedShip.usageCount}/5</p>
          <p>Misiones completadas: {selectedShip.missionsCompleted || 0}</p>
          <p>Recompensas totales: {selectedShip.totalRewards || 0} puntos</p>
        </div>
      )}
      {!currentMission && (
        <MissionList
          availableMissions={availableMissions}
          startMission={startMission}
          playerLevel={playerLevel}
        />
      )}
      {currentMission && missionProgress < 100 && (
        <MissionProgress mission={currentMission} progress={missionProgress} />
      )}
      {missionResult && <MissionResult result={missionResult} />}
    </motion.div>
  );
};

export default MissionControl;