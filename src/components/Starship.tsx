import React, { useState } from 'react';
import { FaRocket, FaBolt, FaCoins, FaTools, FaChartLine, FaExclamationTriangle, FaWrench } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { starterShips, shipImages } from '../shipData';

export interface Starship {
  id: string;
  name: string;
  description: string;
  abilities: string[];
  cost: number;
  maintenance: number;
  production: number;
  roi: number;
  image: string;
  usageCount: number;
  rarity: 'Common' | 'Uncommon' | 'Rare';
  missionsCompleted?: number;
  totalRewards?: number;
  performance?: number;
  maintenanceCost?: number;
}

interface StarshipProps {
  ownedShips: Starship[];
  points: number;
  purchaseShip: (ship: Starship) => void;
  maintainShip: (shipId: string, cost: number) => void;
}

const Starship: React.FC<StarshipProps> = ({ ownedShips, points, purchaseShip, maintainShip }) => {
  const [selectedShip, setSelectedShip] = useState<Starship | null>(null);

  const getMaintenanceCost = (ship: Starship) => {
    const baseCost = ship.maintenance;
    const rarityMultiplier = ship.rarity === 'Common' ? 1 : ship.rarity === 'Uncommon' ? 1.5 : 2;
    return Math.round(baseCost * rarityMultiplier);
  };

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
      <h3 className="text-2xl font-bold mb-4 text-center">Starship Hangar</h3>
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4">Your Fleet</h4>
        {ownedShips.length === 0 ? (
          <p className="text-center text-gray-400">You don't own any starships yet. Purchase one to get started!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedShips.map((ship) => (
              <motion.div 
                key={ship.id} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={ship.image} alt={ship.name} className="w-full h-full object-cover" />
                  <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-bl-lg">
                    <span className={`font-bold ${getRarityColor(ship.rarity)}`}>{ship.rarity}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="text-lg font-bold mb-2">{ship.name}</h5>
                  <p className="text-sm text-gray-400 mb-3">{ship.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-400">Usage:</span> {ship.usageCount}/5
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">ROI:</span> {ship.roi}%
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Production:</span> {ship.production}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Missions:</span> {ship.missionsCompleted || 0}
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-400 mb-1">Performance:</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${calculatePerformance(ship)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1">{calculatePerformance(ship).toFixed(2)}%</p>
                  </div>
                  {ship.usageCount >= 5 && (
                    <motion.button
                      onClick={() => maintainShip(ship.id, getMaintenanceCost(ship))}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaWrench className="inline-block mr-2" /> Maintain ({getMaintenanceCost(ship)} points)
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Starship Marketplace</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {starterShips.map((ship) => (
            <motion.div 
              key={ship.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={ship.image} alt={ship.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-bl-lg">
                  <span className={`font-bold ${getRarityColor(ship.rarity)}`}>{ship.rarity}</span>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-lg font-bold mb-2">{ship.name}</h5>
                <p className="text-sm text-gray-400 mb-3">{ship.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-400">Cost:</span> {ship.cost} points
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">ROI:</span> {ship.roi}%
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Production:</span> {ship.production}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Maintenance:</span> {ship.maintenance}
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-semibold mb-1">Abilities:</p>
                  <ul className="text-sm space-y-1">
                    {ship.abilities.map((ability, index) => (
                      <li key={index} className="flex items-center">
                        <FaBolt className="text-yellow-500 mr-2" /> {ability}
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.button
                  onClick={() => purchaseShip(ship)}
                  disabled={points < ship.cost}
                  className={`w-full ${
                    points >= ship.cost ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'
                  } text-white font-bold py-2 px-4 rounded transition-colors`}
                  whileHover={points >= ship.cost ? { scale: 1.05 } : {}}
                  whileTap={points >= ship.cost ? { scale: 0.95 } : {}}
                >
                  <FaCoins className="inline-block mr-2" /> Purchase
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Starship;