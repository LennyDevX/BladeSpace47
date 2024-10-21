import React, { useState, useEffect } from 'react';
import { FaCoins, FaRocket } from 'react-icons/fa';

interface Ship {
  id: string;
  name: string;
  stakingPower: number;
}

interface StakingSystemProps {
  userShips: Ship[];
  stakedShips: Ship[];
  stakeShip: (shipId: string) => void;
  unstakeShip: (shipId: string) => void;
  claimRewards: () => void;
  stakingRewards: number;
}

const StakingSystem: React.FC<StakingSystemProps> = ({
  userShips,
  stakedShips,
  stakeShip,
  unstakeShip,
  claimRewards,
  stakingRewards
}) => {
  const [totalStakingPower, setTotalStakingPower] = useState(0);

  useEffect(() => {
    const power = stakedShips.reduce((total, ship) => total + ship.stakingPower, 0);
    setTotalStakingPower(power);
  }, [stakedShips]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-bold mb-4">Sistema de Staking</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">Naves Disponibles</h4>
          {userShips.map(ship => (
            <div key={ship.id} className="flex justify-between items-center mb-2">
              <span>{ship.name} (Poder: {ship.stakingPower})</span>
              <button
                onClick={() => stakeShip(ship.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              >
                Stake <FaRocket className="inline-block ml-1" />
              </button>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Naves en Staking</h4>
          {stakedShips.map(ship => (
            <div key={ship.id} className="flex justify-between items-center mb-2">
              <span>{ship.name} (Poder: {ship.stakingPower})</span>
              <button
                onClick={() => unstakeShip(ship.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Unstake
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="mb-2">Poder de Staking Total: {totalStakingPower}</p>
        <p className="mb-2">Recompensas acumuladas: {stakingRewards} tokens</p>
        <button
          onClick={claimRewards}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Reclamar Recompensas <FaCoins className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
};

export default StakingSystem;