import React, { useState, useCallback, useEffect } from 'react';
import { FaRocket, FaStar, FaBolt } from 'react-icons/fa';
import LoadingScreen from './LoadingScreen';
import Home from './Home';
import MissionControl from './MissionControl';
import Profile from './Profile';
import Starship from './Starship';
import Wallet from './Wallet';
import StakingSystem from './StakingSystem';
import QuickMissions from './QuickMissions';
import NFTMarketplace from './NFTMarketplace';
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Starship as StarshipType } from './Starship';
import { shipImages, starterShips } from '../shipData';

interface GameModeProps {
  currentView: 'home' | 'missions' | 'profile' | 'starship' | 'wallet' | 'staking' | 'quickMissions' | 'nftMarketplace';
  userData: any;
  setUserData: (data: any) => void;
}

const GameMode: React.FC<GameModeProps> = ({ currentView, userData, setUserData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateUserData = useCallback(async (newData: any) => {
    if (!userData || !userData.uid) {
      console.error('Los datos del usuario no están disponibles');
      setError('Los datos del usuario no están disponibles. Por favor, intenta iniciar sesión de nuevo.');
      return;
    }
    
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);

    try {
      const userDocRef = doc(db, 'users', userData.uid);
      await setDoc(userDocRef, updatedData, { merge: true });
      localStorage.setItem('userData', JSON.stringify(updatedData));
      console.log('Datos del usuario actualizados con éxito', updatedData);
    } catch (error: any) {
      console.error('Error al actualizar los datos del usuario:', error);
      setError(`Error al actualizar los datos del usuario: ${error.message}`);
    }
  }, [userData, setUserData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Ensure ownedShips have the correct image property
  const ownedShipsWithImages = userData.ownedShips?.map((ship: StarshipType) => ({
    ...ship,
    image: shipImages[ship.name as keyof typeof shipImages] || ship.image
  })) || [];

  if (loading) {
    return <LoadingScreen progress={100} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home userData={{...userData, ownedShips: ownedShipsWithImages}} />;
      case 'missions':
        return <MissionControl 
          ownedShips={ownedShipsWithImages}
          selectedShip={userData.selectedShip}
          setSelectedShip={(ship) => updateUserData({ selectedShip: ship })}
          points={userData.points}
          setPoints={(points) => updateUserData({ points })}
          artifacts={userData.artifacts}
          setArtifacts={(artifacts) => updateUserData({ artifacts })}
          experience={userData.experience}
          setExperience={(experience) => updateUserData({ experience })}
          playerLevel={userData.playerLevel}
          setPlayerLevel={(playerLevel) => updateUserData({ playerLevel })}
          updateUserData={updateUserData}
          userId={userData.uid}
        />;
      case 'profile':
        return <Profile 
          playerLevel={userData.playerLevel}
          experience={userData.experience}
          points={userData.points}
          artifacts={userData.artifacts}
          missionsCompleted={userData.missionsCompleted}
          ownedShips={ownedShipsWithImages}
        />;
      case 'starship':
        return <Starship 
          ownedShips={ownedShipsWithImages}
          points={userData.points}
          purchaseShip={(ship) => {
            const newPoints = userData.points - ship.cost;
            const newOwnedShips = [...(userData.ownedShips || []), ship];
            updateUserData({ points: newPoints, ownedShips: newOwnedShips });
          }}
          maintainShip={(shipId, cost) => {
            const newPoints = userData.points - cost;
            const updatedShips = (userData.ownedShips || []).map(ship => 
              ship.id === shipId ? { ...ship, usageCount: 0 } : ship
            );
            updateUserData({ points: newPoints, ownedShips: updatedShips });
          }}
        />;
      case 'wallet':
        return <Wallet userData={userData} updateUserData={updateUserData} />;
      case 'staking':
        return (
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-4">Sistema de Staking - Próximamente</h3>
            <p>El sistema de staking te permitirá ganar recompensas pasivas por mantener tus naves en el juego. Características futuras incluirán:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Gana tokens diarios basados en el poder de tus naves en staking</li>
              <li>Desbloquea mejoras exclusivas para naves en staking</li>
              <li>Participa en eventos especiales solo para stakers</li>
              <li>Obtén bonificaciones de recompensas por períodos de staking más largos</li>
            </ul>
            <p className="mt-4">Esta funcionalidad estará disponible en futuras actualizaciones con la integración de contratos inteligentes.</p>
          </div>
        );
      case 'quickMissions':
        return (
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-4">Misiones Rápidas - Próximamente</h3>
            <p>Las misiones rápidas te permitirán ganar recompensas en poco tiempo. Características futuras incluirán:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Misiones cortas de 5-15 minutos para recompensas rápidas</li>
              <li>Variedad de misiones con diferentes niveles de dificultad y recompensas</li>
              <li>Oportunidad de ganar recursos raros y tokens especiales</li>
              <li>Desafíos diarios y semanales con recompensas adicionales</li>
            </ul>
            <p className="mt-4">Esta funcionalidad estará disponible en futuras actualizaciones con la integración de contratos inteligentes.</p>
          </div>
        );
      case 'nftMarketplace':
        return (
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-4">Mercado NFT - Próximamente</h3>
            <p>El mercado NFT te permitirá comerciar con activos únicos del juego. Características futuras incluirán:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Compra y venta de naves espaciales únicas como NFTs</li>
              <li>Colecciona y comercia con artefactos espaciales raros</li>
              <li>Subasta tus NFTs más valiosos a otros jugadores</li>
              <li>Gana comisiones por crear y vender tus propios diseños de naves</li>
            </ul>
            <p className="mt-4">Esta funcionalidad estará disponible en futuras actualizaciones con la integración de contratos inteligentes en la blockchain.</p>
          </div>
        );
      default:
        return <Home userData={{...userData, ownedShips: ownedShipsWithImages}} />;
    }
  };

  return (
    <div className="game-mode">
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GameMode;