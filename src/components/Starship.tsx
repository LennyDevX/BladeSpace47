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
}

interface StarshipProps {
  ownedShips: Starship[];
  points: number;
  purchaseShip: (ship: Starship) => void;
  maintainShip: (shipId: string, cost: number) => void;
}

const Starship: React.FC<StarshipProps> = ({ ownedShips, points, purchaseShip, maintainShip }) => {
  const getMaintenanceCost = (ship: Starship) => {
    const baseCost = ship.maintenance;
    const rarityMultiplier = ship.rarity === 'Common' ? 1 : ship.rarity === 'Uncommon' ? 1.5 : 2;
    return Math.round(baseCost * rarityMultiplier);
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
          <div className="grid md:grid-cols-2 gap-6">
            {ownedShips.map((ship) => (
              <motion.div 
                key={ship.id} 
                className="bg-gray-800 p-4 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={ship.image} alt={ship.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <h5 className="text-lg font-bold mb-2">{ship.name}</h5>
                <p className="text-sm text-gray-400 mb-2">{ship.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Rarity: {ship.rarity}</span>
                  <span className="text-sm">Usage: {ship.usageCount}/5</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">ROI: {ship.roi}%</span>
                  <span className="text-sm">Production: {ship.production} points</span>
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Starship Marketplace</h4>
        <div className="grid md:grid-cols-3 gap-6">
          {starterShips.map((ship) => (
            <motion.div 
              key={ship.id} 
              className="bg-gray-800 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={ship.image} alt={ship.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h5 className="text-lg font-bold mb-2">{ship.name}</h5>
              <p className="text-sm text-gray-400 mb-2">{ship.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Rarity: {ship.rarity}</span>
                <span className="text-sm">ROI: {ship.roi}%</span>
              </div>
              <ul className="text-sm mb-4">
                {ship.abilities.map((ability, index) => (
                  <li key={index} className="flex items-center">
                    <FaBolt className="text-yellow-500 mr-2" /> {ability}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Cost: {ship.cost} points</span>
                <span className="text-sm">Maintenance: {ship.maintenance} points</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Starship;