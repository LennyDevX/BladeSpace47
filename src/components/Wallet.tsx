import React, { useState } from 'react';
import { FaCoins, FaExchangeAlt, FaWallet, FaQuestionCircle } from 'react-icons/fa';
import { ethers } from 'ethers';

interface WalletProps {
  userData: any;
  updateUserData: (newData: any) => void;
}

const Wallet: React.FC<WalletProps> = ({ userData, updateUserData }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const exchangeRate = 1000; // 1000 points = 1 token

  const handleExchange = () => {
    if (userData.points >= exchangeRate) {
      const newPoints = userData.points - exchangeRate;
      const newTokens = (userData.tokens || 0) + 1;
      updateUserData({ points: newPoints, tokens: newTokens });
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log('Wallet connected:', address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-4 text-center">Wallet</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Available Points</p>
              <p className="text-2xl font-bold">{userData.points}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Tokens</p>
              <p className="text-2xl font-bold">{userData.tokens || 0}</p>
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <h4 className="text-lg font-bold mb-2">Exchange Points for Tokens</h4>
            <p className="text-sm mb-2">Exchange Rate: {exchangeRate} points = 1 token</p>
            <button 
              onClick={handleExchange}
              disabled={userData.points < exchangeRate}
              className={`w-full ${userData.points >= exchangeRate ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded transition-colors`}
            >
              <FaExchangeAlt className="inline-block mr-2" /> Exchange Points
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Note: Token exchange functionality is now available. You can exchange your points for tokens.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <FaWallet className="mr-2 text-blue-500" /> Connect Wallet
          </h4>
          <p className="text-sm mb-4">
            Connect your Web3 wallet to access advanced features and participate in the Space.NFT ecosystem.
          </p>
          {walletAddress ? (
            <div>
              <p className="text-sm mb-2">Connected Wallet:</p>
              <p className="text-xs bg-gray-700 p-2 rounded break-all">{walletAddress}</p>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors mb-4"
            >
              Connect Wallet
            </button>
          )}
          <div className="bg-gray-700 p-4 rounded-lg mt-4">
            <h5 className="text-md font-bold mb-2 flex items-center">
              <FaQuestionCircle className="mr-2 text-yellow-500" /> Future Web3 Features
            </h5>
            <ul className="text-sm space-y-2">
              <li>• Trade unique Space.NFT tokens</li>
              <li>• Participate in governance decisions</li>
              <li>• Access exclusive missions and rewards</li>
              <li>• Earn passive income from your starships</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;