import React, { useState, useRef, useEffect } from 'react';
import { FaRocket, FaBars, FaTimes, FaHome, FaSpaceShuttle, FaUser, FaWallet, FaCoins, FaBolt, FaStore, FaChevronDown } from 'react-icons/fa';
import Auth from './Auth';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  toggleGameMode: () => void;
  toggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
  isGameMode: boolean;
  setCurrentGameView: (view: 'home' | 'missions' | 'profile' | 'starship' | 'wallet' | 'staking' | 'quickMissions' | 'nftMarketplace') => void;
  user: any;
  setUser: (user: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  toggleGameMode, 
  toggleMobileMenu, 
  mobileMenuOpen, 
  isGameMode, 
  setCurrentGameView,
  user,
  setUser
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const mainNavItems = isGameMode
    ? [
        { name: 'Home', icon: FaHome, view: 'home' as const },
        { name: 'Missions', icon: FaRocket, view: 'missions' as const },
        { name: 'Profile', icon: FaUser, view: 'profile' as const },
        { name: 'Starship', icon: FaSpaceShuttle, view: 'starship' as const },
        { name: 'Wallet', icon: FaWallet, view: 'wallet' as const },
      ]
    : ['Overview', 'Economy', 'Marketplace'];

  const subNavItems = isGameMode
    ? [
        { name: 'Staking', icon: FaCoins, view: 'staking' as const, description: 'Stake your ships to earn passive rewards' },
        { name: 'Quick Missions', icon: FaBolt, view: 'quickMissions' as const, description: 'Complete short missions for quick rewards' },
        { name: 'NFT Market', icon: FaStore, view: 'nftMarketplace' as const, description: 'Trade unique space artifacts and ships' },
      ]
    : [];

  const handleNavClick = (item: string | { view: 'home' | 'missions' | 'profile' | 'starship' | 'wallet' | 'staking' | 'quickMissions' | 'nftMarketplace' }) => {
    if (isGameMode && typeof item !== 'string') {
      setCurrentGameView(item.view);
    }
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
    setShowSubMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
        setShowSubMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 bg-opacity-90 p-2 fixed w-full z-10 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaRocket className="text-blue-500 text-2xl" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            BladeSpace47
          </span>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {mainNavItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavClick(item)}
              className="text-gray-300 hover:text-white transition-colors duration-200 ease-in-out px-2 py-1 rounded-full hover:bg-gray-800 flex items-center text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {typeof item !== 'string' && <item.icon className="mr-1" />}
              {typeof item === 'string' ? item : item.name}
            </motion.button>
          ))}
          {isGameMode && subNavItems.length > 0 && (
            <div className="relative" ref={subMenuRef}>
              <motion.button
                onClick={() => setShowSubMenu(!showSubMenu)}
                className="text-gray-300 hover:text-white transition-colors duration-200 ease-in-out px-2 py-1 rounded-full hover:bg-gray-800 flex items-center text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More <FaChevronDown className="ml-1" />
              </motion.button>
              <AnimatePresence>
                {showSubMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl py-2"
                  >
                    {subNavItems.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleNavClick(item)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="inline-block mr-2" />
                        {item.name}
                        <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {!user && (
            <motion.button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In / Register
            </motion.button>
          )}
          {user && (
            <motion.button
              onClick={() => setUser(null)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          )}
          <motion.button
            onClick={toggleGameMode}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-1 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGameMode ? 'Web Mode' : 'Game'}
          </motion.button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 mt-2 rounded-lg p-2"
          >
            {mainNavItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 ease-in-out flex items-center text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {typeof item !== 'string' && <item.icon className="mr-2" />}
                {typeof item === 'string' ? item : item.name}
              </motion.button>
            ))}
            {isGameMode && subNavItems.length > 0 && (
              <>
                <motion.button
                  onClick={() => setShowSubMenu(!showSubMenu)}
                  className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 ease-in-out flex items-center text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  More <FaChevronDown className="ml-2" />
                </motion.button>
                <AnimatePresence>
                  {showSubMenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                    >
                      {subNavItems.map((item, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleNavClick(item)}
                          className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 ease-in-out flex items-center text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="mr-2" />
                          {item.name}
                          <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            {!user && (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 ease-in-out text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In / Register
              </motion.button>
            )}
            {user && (
              <motion.button
                onClick={() => setUser(null)}
                className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 ease-in-out text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            )}
            <motion.button
              onClick={() => {
                toggleGameMode();
                toggleMobileMenu();
              }}
              className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 ease-in-out text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGameMode ? 'Web Mode' : 'Game'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Auth setUser={setUser} onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;